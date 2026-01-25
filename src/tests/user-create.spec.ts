import request from 'supertest';
import mongoose from 'mongoose';
import { app } from '../../src/app';
import { connectDB } from '../../src/shared/database';
import { clearDatabase } from './setup';

describe('User Creation API', () => {
    beforeAll(async () => {
        process.env.NODE_ENV = 'test';
        await connectDB();
    });

    afterEach(async () => {
        await clearDatabase();
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    it('should create user successfully with valid payload', async () => {
        const payload = {
            name: 'Riyanti Maulya',
            email: 'riyanti.maulya@yopmail.com',
            birthday: '1995-08-17T00:00:00.000Z',
            timezone: 'Asia/Jakarta',
        };

        const res = await request(app)
            .post('/users')
            .send(payload);

        expect(res.status).toBe(201);

        // API response contract
        expect(res.body).toHaveProperty('data');

        const user = res.body.data;

        expect(user.name).toBe(payload.name);
        expect(user.email).toBe(payload.email);
        expect(user.timezone).toBe(payload.timezone);

        // birthday must be transformed to Date
        expect(new Date(user.birthday).toISOString())
            .toBe(payload.birthday);

        // mongoose generated fields
        expect(user).toHaveProperty('id');
        expect(user).toHaveProperty('createdAt');
        expect(user).toHaveProperty('updatedAt');
    });

    it('should reject invalid birthday format', async () => {
        const res = await request(app).post('/users').send({
            name: 'Invalid Birthday',
            email: 'invalid.birthday@yopmail.com',
            birthday: '1995-08',
            timezone: 'Asia/Jakarta',
        });

        expect(res.status).toBe(400);
        expect(res.body.message).toBe('Validation error');
    });

    it('should reject invalid timezone', async () => {
        const res = await request(app).post('/users').send({
            name: 'Invalid Timezone',
            email: 'invalid.timezone@yopmail.com',
            birthday: '1995-08-17T00:00:00.000Z',
            timezone: 'Jakarta',
        });

        expect(res.status).toBe(400);
    });

    it('should reject duplicate email', async () => {
        const payload = {
            name: 'Duplicate User',
            email: 'duplicate@yopmail.com',
            birthday: '1995-08-17T00:00:00.000Z',
            timezone: 'Asia/Jakarta',
        };

        await request(app).post('/users').send(payload);

        const res = await request(app).post('/users').send(payload);

        expect(res.status).toBe(409);
        expect(res.body.message).toBe('Email already exists');
    });
});