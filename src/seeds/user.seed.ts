import { faker } from '@faker-js/faker';
import mongoose from 'mongoose';
import moment from 'moment-timezone';
import { UserModel } from '../modules/users/user.model';
import { env } from '../config/env';

const timezones = moment.tz.names();

async function seed() {
    await mongoose.connect(env.mongoUri);
    await UserModel.deleteMany({});

    const users = Array.from({ length: 100 }).map(() => {
        const birthday = faker.date.birthdate({
            min: 18,
            max: 60,
            mode: 'age',
        });

        return {
            name: faker.person.fullName(),
            email: faker.internet.email().toLowerCase(),
            birthday,
            timezone: faker.helpers.arrayElement(timezones),
        };
    });

    await UserModel.insertMany(users);
    console.log('🌱 Seeded 100 users');
    process.exit(0);
}

seed();