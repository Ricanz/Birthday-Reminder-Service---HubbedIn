import moment, { Moment } from 'moment-timezone';
import { agenda } from './agenda';
import { env } from '../config/env';

class BirthdayService {
    static getNextBirthdayJobDate(user: any): Date {
        const now = moment().tz(user.timezone);

        let birthday = moment(user.birthday)
            .year(now.year())
            .hour(9)
            .minute(0)
            .second(0)
            .millisecond(0)
            .tz(user.timezone);

        if (birthday.isBefore(now)) {
            birthday = birthday.add(1, 'year');
        }

        return birthday.toDate();
    }

    static async scheduleBirthdayJob(user: any) {

        const runAt = env.isTest
            ? moment().add(5, 'seconds').toDate()
            : this.getNextBirthdayJobDate(user);

        console.log('runAt:', runAt);
        await agenda.schedule(runAt, 'send birthday message', {
            userId: user._id,
        });
    }

    static async rescheduleBirthdayJob(user: any) {
        await agenda.cancel({ 'data.userId': user._id });

        await this.scheduleBirthdayJob(user);
    }
}

export default BirthdayService;