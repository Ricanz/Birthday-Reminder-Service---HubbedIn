import { app } from './app';
import { connectDB } from './shared/database';
import { env } from './config/env';
import { scheduleBirthdayJob } from './worker/birthday.job';
import { logger } from './shared/logger';

async function bootstrap() {
    await connectDB();

    await scheduleBirthdayJob();

    app.listen(env.port, () => {
        logger.info(`Server running on port ${env.port}`);
    });
}

bootstrap().catch((err) => {
    logger.fatal({ err }, 'Failed to bootstrap application');
    process.exit(1);
});