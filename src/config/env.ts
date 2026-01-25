import dotenv from 'dotenv';
dotenv.config();

export const env = {
    port: process.env.PORT || 3000,
    appUrl: process.env.APP_URL || 'http://localhost:3000',
    mongoUri: process.env.MONGO_URI!,
    nodeEnv: process.env.NODE_ENV || 'development',
    isDev: process.env.NODE_ENV === 'development',
    isTest: process.env.NODE_ENV === 'test',
};