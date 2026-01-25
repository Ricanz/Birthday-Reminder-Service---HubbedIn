import Agenda from 'agenda';
import { env } from '../config/env';
import { logger } from '../shared/logger';

export const agenda = new Agenda({
    db: {
        address: env.mongoUri,
        collection: 'agendaJobs',
    },
});

agenda.on('ready', () => {
    logger.info('Agenda connected');
});

agenda.on('error', (err) => {
    logger.error({ err }, 'Agenda connection error');
});