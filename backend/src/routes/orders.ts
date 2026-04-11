import { Router, Request, Response, NextFunction } from 'express';
import prisma from '../lib/prisma';
import { createOrderSchema, CreateOrderInput } from '../lib/validators';
import { orderRateLimiter } from '../middleware/security';

const router = Router();

// Apply rate limiting to order creation
router.use(orderRateLimiter);

// POST /api/orders - Create new order
router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const input: CreateOrderInput = createOrderSchema.parse(req.body);

    // Calculate totals (server authority)
    const subtotalCents = input.items.reduce(
      (sum, item) => sum + item.priceCents * item.qty,
      0,
    );

    // Free shipping if subtotal >= €50 (5000 cents), else €4.90 (490 cents)
    const shippingCents = subtotalCents >= 5000 ? 0 : 490;

    const totalCents = subtotalCents + shippingCents;

    // Create order with items
    const order = await prisma.order.create({
      data: {
        email: input.email,
        fullName: input.fullName,
        phone: input.phone,
        addressCountry: input.addressCountry,
        addressCity: input.addressCity,
        postalCode: input.postalCode,
        addressLine: input.addressLine,
        subtotalCents,
        shippingCents,
        totalCents,
        items: {
          create: input.items.map((item) => ({
            productId: item.id,
            qty: item.qty,
            unitPriceCents: item.priceCents,
            shade: item.shade,
          })),
        },
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    res.status(201).json({
      orderNumber: order.id,
      summary: {
        subtotalCents,
        shippingCents,
        totalCents,
      },
    });
  } catch (error) {
    next(error);
  }
});

export default router;

