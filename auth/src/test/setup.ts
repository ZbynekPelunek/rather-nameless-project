import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../app';

declare global {
    var signin: () => Promise<string[]>;
}

let mongo: any;
beforeAll(async () => {
    process.env.JWT_KEY = 'asdfadfad';

    mongo = await MongoMemoryServer.create();
    const mongoUri = mongo.getUri();

    await mongoose.connect(mongoUri);
});

beforeEach(async () => {
    const collections = await mongoose.connection.db.collections();

    for(let collection of collections) {
        await collection.deleteMany({});
    }
});

afterAll(async () => {
    await mongoose.connection.close();
    await mongo.stop();
});

global.signin = async () => {
    const username = 'test';
    const email = 'test@test.com';
    const password = '123456';

    const response = await request(app)
        .post('/api/users/signup')
        .send({
            username, email, password
        })
        .expect(201);

    const cookie = response.get('Set-Cookie');

    return cookie;
};