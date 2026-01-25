import { z } from 'zod';
import moment from 'moment-timezone';

const timezoneSchema = z.string().refine(
    (tz) => !!moment.tz.zone(tz),
    { message: 'Invalid IANA timezone' }
);

const birthdaySchema = z
    .string()
    .refine(
        (value) => {
            const isoDateTimeRegex =
                /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/;

            if (!isoDateTimeRegex.test(value)) {
                return false;
            }

            return moment(value, moment.ISO_8601, true).isValid();
        },
        {
            message:
                'Birthday must be a full ISO 8601 date-time (e.g. 1995-08-17T00:00:00.000Z)',
        }
    )
    .transform((value) => new Date(value));

export const createUserSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email format'),
    birthday: birthdaySchema,
    timezone: timezoneSchema,
});

export const updateUserSchema = createUserSchema.partial();