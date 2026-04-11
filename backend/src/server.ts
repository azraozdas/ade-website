import 'dotenv/config';
import express, { Express } from 'express';
import { helmetConfig, corsConfig, requestLogger } from './middleware/security';
import { errorHandler, notFoundHandler } from './middleware/errorHandler';
import productsRouter from './routes/products';
import authRouter from './routes/auth';
import ordersRouter from './routes/orders';

const app: Express = express();
const PORT = process.env.PORT || 8080;

// Security middleware
app.use(helmetConfig);
app.use(corsConfig);

// Request parsing
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

// Request logging
if (process.env.NODE_ENV === 'development') {
  app.use(requestLogger);
}

// Health check
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API routes
app.use('/api/products', productsRouter);
app.use('/api/auth', authRouter);
app.use('/api/orders', ordersRouter);

// Error handlers (must be last)
app.use(notFoundHandler);
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

