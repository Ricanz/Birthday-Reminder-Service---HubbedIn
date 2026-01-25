import moment from 'moment-timezone';

export function isBirthdayAt9AM(
    birthday: Date,
    timezone: string,
    nowUtc: moment.Moment
): boolean {
    const userNow = nowUtc.clone().tz(timezone);

    return (
        userNow.hour() === 9 &&
        userNow.minute() === 0 &&
        userNow.date() === birthday.getDate() &&
        userNow.month() === birthday.getMonth()
    );
}

export function getTimezonesAt9AM(nowUtc: moment.Moment): string[] {
    return moment.tz.names().filter((tz) => {
        const local = nowUtc.clone().tz(tz);
        return local.hour() === 9;
    });
}