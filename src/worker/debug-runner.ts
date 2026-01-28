import 'dotenv/config';
import moment from 'moment-timezone';
import { connectDB } from '../shared/database';
import { UserModel } from '../modules/users/user.model';
import BirthdayService from '../worker/birthday.service';

async function debug() {
    await connectDB();

    const user = await UserModel.findOne({
        email: 'riyanti-now-test@mail.com',
    });

    if (!user) {
        console.error('User not found');
        process.exit(1);
    }

    console.log('Debugging birthday job for:', {
        name: user.name,
        birthday: user.birthday,
        timezone: user.timezone,
    });

    const runAt = moment().add(5, 'seconds').toDate();

    await BirthdayService.scheduleBirthdayJob(user);

    console.log('Birthday job scheduled at', runAt);

    process.exit(0);
}

debug().catch(err => {
    console.error(err);
    process.exit(1);
});