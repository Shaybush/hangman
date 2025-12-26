import express from 'express';
import cors from 'cors';
import healthRoutes from './routes/health';
import hangmanRoutes from './routes/hangman';
import logger, { logRequest } from './utils/logger';
import { errorHandler, notFoundHandler } from './middlewares/errorHandler';
import { env, logEnvStatus } from './config/env';
import helmet from 'helmet';

const app: express.Application = express();
const port = env.PORT;

// Middlewares
app.use(helmet()); // Security headers
app.use(cors({
  origin: env.NODE_ENV === 'production'
    ? process.env.FRONTEND_URL
    : [
      'http://localhost:3000', 'http://localhost:3001',
      'http://localhost:5173', 'http://localhost:5174', // Vite default ports
      'http://127.0.0.1:3000', 'http://127.0.0.1:3001',
      'http://127.0.0.1:5173', 'http://127.0.0.1:5174'
    ],
  credentials: true, // Allow cookies to be sent
}));
app.use(express.json());
app.use(logRequest); // Log all requests

// Health routes (public)
app.use('/api/health', healthRoutes);

// Hangman game routes (public)
app.use('/api/hangman', hangmanRoutes);

// Error handling
app.use(notFoundHandler); // Handle 404s
app.use(errorHandler); // Handle all other errors

// Start server
const startServer = async () => {
  try {

    const server = app.listen(port, () => {
      logger.info(`🚀 Server is running on port ${port}`, {
        meta: {
          port,
          environment: env.NODE_ENV,
        }
      });

      // Log environment status
      logEnvStatus();
    });

    // Graceful shutdown handlers
    const gracefulShutdown = async (signal: string) => {
      logger.info(`Received ${signal}. Starting graceful shutdown...`);

      server.close(async () => {
        logger.info('HTTP server closed.');

        logger.info('Graceful shutdown completed.');
        process.exit(0);
      });

      // Force close after 10 seconds
      setTimeout(() => {
        logger.error('Could not close connections in time, forcefully shutting down');
        process.exit(1);
      }, 10000);
    };

    // Listen for shutdown signals
    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
    process.on('SIGINT', () => gracefulShutdown('SIGINT'));

  } catch (error) {
    logger.error('Failed to start server', {
      error: error instanceof Error ? error.message : 'Unknown error'
    });
    process.exit(1);
  }
};

// Start the server
startServer();

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  logger.error('Uncaught Exception', {
    meta: {
      error: error.message,
      stack: error.stack
    }
  });

  // Exit with error
  process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Rejection', {
    meta: {
      reason,
      promise
    }
  });
});

export default app;
