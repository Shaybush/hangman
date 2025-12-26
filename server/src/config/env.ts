import dotenv from 'dotenv';
import logger from '../utils/logger';

// Load environment variables from .env file
dotenv.config();

// Export environment variables with types
export const env = {
    NODE_ENV: process.env.NODE_ENV || 'development',
    PORT: parseInt(process.env.PORT || '5001', 10),
};

// Log environment status (without showing actual API keys)
export const logEnvStatus = (): void => {
    logger.info('Environment variables loaded', {
        meta: {
            NODE_ENV: env.NODE_ENV,
            PORT: env.PORT,
        }
    });
}; 