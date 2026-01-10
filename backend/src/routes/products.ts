import { Router, Request, Response, NextFunction } from 'express';
import prisma from '../lib/prisma';
import { AppError } from '../middleware/errorHandler';

const router = Router();

// GET /api/products - List all products
// This endpoint returns all available products, ordered by creation date
router.get('/', async (_req: Request, res: Response, next: NextFunction) => {
  try {
    // Fetch all products from the database
    // We only select the fields we need (not all database columns)
    const products = await prisma.product.findMany({
      select: {
        id: true,
        name: true,
        category: true,
        priceCents: true,
        image: true,
        short: true, // Short description
        shades: true, // Available shade options (if any)
      },
      orderBy: {
        createdAt: 'asc', // Order by creation date, oldest first
      },
    });

    // Return the products as JSON
    res.json(products);
  } catch (error) {
    // Pass any errors to the error handling middleware
    next(error);
  }
});

// GET /api/products/:id - Get single product by ID
// This endpoint returns detailed information about a specific product
router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Extract the product ID from the URL parameters
    const productId = req.params.id;

    // Find the product in the database by its ID
    const product = await prisma.product.findUnique({
      where: { id: productId },
      select: {
        id: true,
        name: true,
        category: true,
        priceCents: true,
        image: true,
        short: true, // Short description
        shades: true, // Available shade options (if any)
      },
    });

    // If product not found, return a 404 error
    if (!product) {
      throw new AppError(404, 'PRODUCT_NOT_FOUND', 'Product not found');
    }

    // Return the product as JSON
    res.json(product);
  } catch (error) {
    // Pass any errors to the error handling middleware
    next(error);
  }
});

export default router;

