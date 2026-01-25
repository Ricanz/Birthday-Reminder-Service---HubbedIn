import 'dotenv/config';
import { connectDB } from '../shared/database';
import { agenda } from './agenda';
import { logger } from '../shared/logger';

async function clearAgenda() {
    await connectDB();
    await agenda.start();

    const result = await agenda.cancel({});
    logger.info({ cancelledJobs: result }, 'Agenda jobs cleared');

    process.exit(0);
}

clearAgenda().catch((err) => {
    logger.error({ err }, 'Failed to clear agenda jobs');
    process.exit(1);
});