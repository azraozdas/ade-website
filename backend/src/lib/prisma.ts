import { PrismaClient } from '@prisma/client';

// Create a function that returns a new PrismaClient instance
// This pattern allows us to reuse the same database connection across our application
const prismaClientSingleton = () => {
  return new PrismaClient({
    // Log database queries in development mode for debugging
    // In production, only log errors
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });
};

// TypeScript declaration to add prisma to the global scope
// This is needed for the singleton pattern in development (hot reload)
declare global {
  // eslint-disable-next-line no-var
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

// Use the existing global prisma instance if it exists (in development)
// Otherwise, create a new instance
// This prevents multiple database connections during hot reloads in development
const prisma = globalThis.prisma ?? prismaClientSingleton();

export default prisma;

// In development mode, store the prisma instance globally
// This ensures we reuse the same connection during hot reloads
// In production, we don't need this since there's no hot reloading
if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma;

