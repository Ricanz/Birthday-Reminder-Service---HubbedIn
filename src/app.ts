import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { userRoutes } from './modules/users/user.routes';
import { env } from './config/env';
import { swaggerSpec } from './config/swagger';
import { logger } from './shared/logger';

export const app = express();

app.use(express.json());

app.use('/users', userRoutes);

if (env.isDev) {
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    logger.info('Swagger running at /docs');
}

app.use((err: any, req: any, res: any, next: any) => {
    logger.error({ err }, 'Unhandled error');
    res.status(500).json({ message: 'Internal Server Error' });
});