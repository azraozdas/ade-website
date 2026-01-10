import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';

export interface ApiError {
  message: string;
  code?: string;
  details?: unknown;
}

export class AppError extends Error {
  constructor(
    public statusCode: number,
    public code: string,
    message: string,
    public details?: unknown,
  ) {
    super(message);
    this.name = 'AppError';
  }
}

// Error handler middleware - catches all errors from routes and returns appropriate responses
// This must be the last middleware in the chain so it catches all errors
export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  // Log the error to the console for debugging
  console.error('❌ Error:', err);

  // Check if this is a Zod validation error (from schema validation)
  // Zod errors happen when request data doesn't match our validation schemas
  if (err instanceof ZodError) {
    res.status(400).json({
      error: {
        message: 'Validation failed',
        code: 'VALIDATION_ERROR',
        details: err.errors, // Include the specific validation errors
      },
    });
    return;
  }

  // Check if this is a custom application error (AppError)
  // These are errors we explicitly throw with specific status codes and messages
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      error: {
        message: err.message,
        code: err.code,
        details: err.details, // Optional additional error details
      },
    });
    return;
  }

  // If it's not a known error type, return a generic 500 error
  // We don't expose internal error details to clients for security
  res.status(500).json({
    error: {
      message: 'Internal server error',
      code: 'INTERNAL_ERROR',
    },
  });
};

export const notFoundHandler = (_req: Request, res: Response): void => {
  res.status(404).json({
    error: {
      message: 'Route not found',
      code: 'NOT_FOUND',
    },
  });
};

