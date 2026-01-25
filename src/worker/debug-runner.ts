import 'dotenv/config';
import { connectDB } from '../shared/database';
import { scheduleBirthdayJob } from './birthday.job';

async function debug() {
    await connectDB();
    await scheduleBirthdayJob();
    process.exit(0);
}

debug();