import moment from 'moment-timezone';
import { isBirthdayAt9AM } from './birthday.util';

describe('Birthday reminder timing', () => {
    it('returns true when it is 9 AM in user timezone on birthday', () => {
        const birthday = new Date('1995-08-17T00:00:00.000Z');

        const nowUtc = moment.utc('2026-08-17T02:00:00Z');
        // 09:00 Asia/Jakarta (UTC+7)

        const result = isBirthdayAt9AM(
            birthday,
            'Asia/Jakarta',
            nowUtc
        );

        expect(result).toBe(true);
    });

    it('returns false if it is birthday but not 9 AM', () => {
        const birthday = new Date('1995-08-17T00:00:00.000Z');

        const nowUtc = moment.utc('2026-08-17T01:00:00Z');
        // 08:00 Asia/Jakarta

        const result = isBirthdayAt9AM(
            birthday,
            'Asia/Jakarta',
            nowUtc
        );

        expect(result).toBe(false);
    });

    it('returns false if it is 9 AM but not birthday', () => {
        const birthday = new Date('1995-08-17T00:00:00.000Z');

        const nowUtc = moment.utc('2026-08-18T02:00:00Z');
        // 09:00 Asia/Jakarta, but wrong day

        const result = isBirthdayAt9AM(
            birthday,
            'Asia/Jakarta',
            nowUtc
        );

        expect(result).toBe(false);
    });

    it('works correctly for different timezone (UTC)', () => {
        const birthday = new Date('1995-08-17T00:00:00.000Z');

        const nowUtc = moment.utc('2026-08-17T09:00:00Z');
        // 09:00 UTC

        const result = isBirthdayAt9AM(
            birthday,
            'UTC',
            nowUtc
        );

        expect(result).toBe(true);
    });
});