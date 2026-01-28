import { connectDB } from '../shared/database';
import { logger } from '../shared/logger';
import { agenda } from './agenda';

import './birthday.job';

async function startWorker() {
    logger.info('Starting birthday worker...');

    await connectDB();

    await agenda.start();

    logger.info('🎯 Birthday worker is running');
}

startWorker().catch((err) => {
    logger.fatal({ err }, 'Failed to start worker');
    process.exit(1);
});