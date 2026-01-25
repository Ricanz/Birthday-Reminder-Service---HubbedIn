import moment from 'moment-timezone';
import { agenda } from './agenda';
import { UserModel } from '../modules/users/user.model';
import { logger } from '../shared/logger';
import { email } from 'zod';

const JOB_NAME = 'birthday-reminder';

agenda.define(JOB_NAME, async () => {
    const nowUtc = moment.utc();

    const users = await UserModel.find({
        birthday: { $exists: true },
        timezone: { $exists: true },
        birthdayNotifiedAt: { $exists: false },
    }).lean();

    for (const user of users) {
        const userNow = nowUtc.clone().tz(user.timezone);

        if (
            userNow.hour() === 9 &&
            userNow.date() === user.birthday.getDate() &&
            userNow.month() === user.birthday.getMonth()
        ) {
            logger.info(
                `Happy Birthday ${user.name}. A birthday message has been sent to ${user.email}.`
            );

            await UserModel.updateOne(
                { _id: user._id },
                { birthdayNotifiedAt: new Date() }
            );
        }
    }
});

export async function scheduleBirthdayJob() {
    await agenda.start();

    const existing = await agenda.jobs({ name: JOB_NAME });

    if (!existing.length) {
        agenda.every('0 * * * *', JOB_NAME);
        logger.info('Birthday reminder job scheduled');
    }

    if (process.env.NODE_ENV === 'development') {
        await agenda.now(JOB_NAME, {});
        logger.info('Birthday reminder job triggered (dev)');
    }
}