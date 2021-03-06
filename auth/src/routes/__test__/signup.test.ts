import request from 'supertest';
import { app } from '../../app';

//jest.useFakeTimers('legacy');

it('returns a 201 on successful signup', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            username: 'test',
            email: 'test@test.com',
            password: 'password'
        })
        .expect(201);
});

it('returns a 400 with an invalid email', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            username: 'test',
            email: 'tesest.com',
            password: 'password'
        })
        .expect(400);
});

it('returns a 400 with an invalid password', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            username: 'test',
            email: 'test@test.com',
            password: '2'
        })
        .expect(400);
});

it('returns a 400 with missing email', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            username: 'test',
            password: 'password'
        })
        .expect(400);
});

it('returns a 400 with missing password', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            username: 'test',
            email: 'test@test.com'
        })
        .expect(400);
});

it('returns a 400 with missing username', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.test',
            password: 'password'
        })
        .expect(400);
});

it('disallows duplicate emails', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            username: 'test',
            email: 'test@test.com',
            password: 'password'
        })
        .expect(201);

    await request(app)
        .post('/api/users/signup')
        .send({
            username: 'test',
            email: 'test@test.com',
            password: 'password'
        })
        .expect(400);
});

it('sets a cookie after successful signup', async () => {
    const response = await request(app)
        .post('/api/users/signup')
        .send({
            username: 'test',
            email: 'test@test.com',
            password: 'password'
        })
        .expect(201);

    expect(response.get('Set-Cookie')).toBeDefined();
});