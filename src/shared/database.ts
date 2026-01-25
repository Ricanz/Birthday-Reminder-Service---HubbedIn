import mongoose from 'mongoose';
import { env } from '../config/env';
import { logger } from './logger';

export async function connectDB() {
    if (env.isTest) {
        logger.warn('Running in TEST database');
    }

    if (
        env.nodeEnv === 'production' &&
        env.mongoUri.includes('localhost')
    ) {
        throw new Error('Refusing to connect DB');
    }

    await mongoose.connect(env.mongoUri);

    logger.info('MongoDB connected');
}