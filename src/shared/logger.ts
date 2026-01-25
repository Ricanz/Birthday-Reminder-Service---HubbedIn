import pino from 'pino';
import { env } from '../config/env';

export const logger = pino({
    level: env.isTest
        ? 'silent'
        : env.isDev
            ? 'debug'
            : 'info',
    transport: env.isDev && !env.isTest
        ? {
            target: 'pino-pretty',
            options: {
                colorize: true,
                translateTime: 'SYS:standard',
                ignore: 'pid,hostname',
            },
        }
        : undefined,
});