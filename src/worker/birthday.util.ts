import moment from 'moment-timezone';

export function isBirthdayAt9AM(
    birthday: Date,
    timezone: string,
    nowUtc = moment.utc()
): boolean {
    const nowLocal = nowUtc.clone().tz(timezone);

    const isSameDay =
        nowLocal.date() === moment(birthday).date() &&
        nowLocal.month() === moment(birthday).month();

    const isNineAM =
        nowLocal.hour() === 9 && nowLocal.minute() === 0;

    return isSameDay && isNineAM;
}