import swaggerJsdoc from 'swagger-jsdoc';
import { env } from './env';

export const swaggerSpec = swaggerJsdoc({
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Birthday Reminder API',
            version: '1.0.0',
            description: 'API for managing users and birthday reminders',
        },
        servers: [
            {
                url: env.appUrl,
            },
        ],
    },
    apis: ['src/modules/**/*.ts'],
});