import 'dotenv/config';
import express, { Express } from 'express';
import { helmetConfig, corsConfig, requestLogger } from './middleware/security';
import { errorHandler, notFoundHandler } from './middleware/errorHandler';
import productsRouter from './routes/products';
import authRouter from './routes/auth';
import ordersRouter from './routes/orders';

// Create the Express application instance
const app: Express = express();
// Get the port number from environment variables, or default to 8080
const PORT = process.env.PORT || 8080;

// Security middleware - these must be applied first to protect all routes
// Helmet helps secure HTTP headers to prevent common vulnerabilities
app.use(helmetConfig);
// CORS (Cross-Origin Resource Sharing) allows our frontend to make requests
app.use(corsConfig);

// Request parsing middleware
// Parse JSON request bodies with a 1MB size limit
app.use(express.json({ limit: '1mb' }));
// Parse URL-encoded form data (like from HTML forms)
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

// Request logging - only in development mode to avoid cluttering production logs
if (process.env.NODE_ENV === 'development') {
  app.use(requestLogger);
}

// Health check endpoint - useful for monitoring and deployment checks
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API routes - organize endpoints by resource type
app.use('/api/products', productsRouter);
app.use('/api/auth', authRouter);
app.use('/api/orders', ordersRouter);

// Error handlers - these MUST be last so they catch any errors from routes above
// 404 handler for routes that don't exist
app.use(notFoundHandler);
// General error handler for all other errors
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('🚀 ADE Backend API Server');
  console.log(`📡 Listening on port ${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔗 API URL: http://localhost:${PORT}/api`);
  console.log(`✅ Health: http://localhost:${PORT}/health`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
});

export default app;

