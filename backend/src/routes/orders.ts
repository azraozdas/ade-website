import { Router, Request, Response, NextFunction } from 'express';
import prisma from '../lib/prisma';
import { createOrderSchema, CreateOrderInput } from '../lib/validators';
import { orderRateLimiter } from '../middleware/security';

const router = Router();

// Apply rate limiting to order creation
router.use(orderRateLimiter);

// POST /api/orders - Create new order
// This endpoint creates a new order with all items and calculates shipping costs
router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Validate the order data against our schema
    const orderData: CreateOrderInput = createOrderSchema.parse(req.body);

    // Calculate the subtotal (total of all items before shipping)
    // We calculate this on the server to ensure it's correct (server authority)
    // Loop through all items and sum up: price × quantity for each item
    let subtotalCents = 0;
    for (const item of orderData.items) {
      const itemTotal = item.priceCents * item.qty;
      subtotalCents = subtotalCents + itemTotal;
    }

    // Calculate shipping cost based on the business rules:
    // - Free shipping if the subtotal is €50 or more (5000 cents)
    // - Otherwise, standard shipping is €4.90 (490 cents)
    let shippingCents: number;
    if (subtotalCents >= 5000) {
      shippingCents = 0; // Free shipping
    } else {
      shippingCents = 490; // Standard shipping: €4.90
    }

    // Calculate the final total: subtotal + shipping
    const totalCents = subtotalCents + shippingCents;

    // Prepare the order items data for database insertion
    // We need to map each cart item to the order item format
    const orderItemsData = orderData.items.map((item) => {
      return {
        productId: item.id,
        qty: item.qty,
        unitPriceCents: item.priceCents,
        shade: item.shade, // Optional shade selection for products that have shades
      };
    });

    // Create the order in the database with all its items
    // This uses Prisma's nested create to create the order and items in one transaction
    const newOrder = await prisma.order.create({
      data: {
        email: orderData.email,
        fullName: orderData.fullName,
        phone: orderData.phone,
        addressCountry: orderData.addressCountry,
        addressCity: orderData.addressCity,
        postalCode: orderData.postalCode,
        addressLine: orderData.addressLine,
        subtotalCents,
        shippingCents,
        totalCents,
        items: {
          create: orderItemsData,
        },
      },
      include: {
        items: {
          include: {
            product: true, // Include full product details for each order item
          },
        },
      },
    });

    // Return the order number and summary to the client
    // The order number is the database ID, which can be used for tracking
    res.status(201).json({
      orderNumber: newOrder.id,
      summary: {
        subtotalCents,
        shippingCents,
        totalCents,
      },
    });
  } catch (error) {
    // Pass any errors to the error handling middleware
    next(error);
  }
});

export default router;

