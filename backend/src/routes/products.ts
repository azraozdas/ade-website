import { Router, Request, Response, NextFunction } from 'express';
import prisma from '../lib/prisma';
import { AppError } from '../middleware/errorHandler';

const router = Router();

// GET /api/products - List all products
router.get('/', async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const products = await prisma.product.findMany({
      select: {
        id: true,
        name: true,
        category: true,
        priceCents: true,
        image: true,
        short: true,
        shades: true,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    res.json(products);
  } catch (error) {
    next(error);
  }
});

// GET /api/products/:id - Get single product
router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const product = await prisma.product.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        category: true,
        priceCents: true,
        image: true,
        short: true,
        shades: true,
      },
    });

    if (!product) {
      throw new AppError(404, 'PRODUCT_NOT_FOUND', 'Product not found');
    }

    res.json(product);
  } catch (error) {
    next(error);
  }
});

export default router;

