import 'dotenv/config';
import moment from 'moment-timezone';
import mongoose from 'mongoose';
import { connectDB } from '../shared/database';
import { UserModel } from '../modules/users/user.model';

async function seedUsersTodayBirthday() {
    await connectDB();

    const TOTAL_USERS = 5;
    const TIMEZONE = 'Asia/Jakarta';

    const today = moment.tz(TIMEZONE);
    const day = today.date();
    const month = today.month() + 1;

    const users = Array.from({ length: TOTAL_USERS }).map((_, i) => {
        const year = 1990 + (i % 10);

        const birthdayUtc = moment
            .tz(
                {
                    year,
                    month: month - 1,
                    day,
                    hour: 0,
                    minute: 0,
                    second: 0,
                },
                TIMEZONE
            )
            .utc()
            .toDate();

        return {
            name: `Birthday User ${i + 1}`,
            email: `birthday-${i}-${Date.now()}@yopmail.com`,
            birthday: birthdayUtc,
            timezone: TIMEZONE,
        };
    });

    await UserModel.insertMany(users);

    console.log('Seed completed');
    console.log(`Date: ${day}-${month} (${TIMEZONE})`);
    console.log(`Inserted users: ${TOTAL_USERS}`);

    await mongoose.connection.close();
    process.exit(0);
}

seedUsersTodayBirthday().catch((err) => {
    console.error('Failed to seed birthday users', err);
    process.exit(1);
});