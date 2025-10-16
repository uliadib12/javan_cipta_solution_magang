import request from 'supertest';
import app from '../index';

describe('User API', () => {
  it('should get all users', async () => {
    const res = await request(app).get('/users');
    expect(res.statusCode).toEqual(200);
    expect(res.body.status).toEqual('success');
    expect(res.body.message).toEqual('Users retrieved successfully');
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  it('should create a new user', async () => {
    const res = await request(app)
      .post('/users')
      .send({
        name: 'test user',
        email: 'test@example.com',
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body.status).toEqual('success');
    expect(res.body.message).toEqual('User created successfully');
    expect(res.body.data.name).toEqual('test user');
    expect(res.body.data.email).toEqual('test@example.com');
  });

  it('should get a user by id', async () => {
    const res = await request(app).get('/users/1');
    expect(res.statusCode).toEqual(200);
    expect(res.body.status).toEqual('success');
    expect(res.body.message).toEqual('User retrieved successfully');
    expect(res.body.data.id).toEqual(1);
  });

  it('should delete a user by id', async () => {
    const res = await request(app).delete('/users/1');
    expect(res.statusCode).toEqual(200);
    expect(res.body.status).toEqual('success');
    expect(res.body.message).toEqual('User deleted successfully');
  });

  it('should return 404 for non-existent user', async () => {
    const res = await request(app).get('/users/999');
    expect(res.statusCode).toEqual(404);
    expect(res.body.status).toEqual('failed');
    expect(res.body.message).toEqual('User not found');
  });

  it('should return 400 for invalid user id', async () => {
    const res = await request(app).get('/users/abc');
    expect(res.statusCode).toEqual(400);
    expect(res.body.status).toEqual('failed');
    expect(res.body.message).toEqual('Invalid ID');
  });

  it('should return 400 for invalid user data', async () => {
    const res = await request(app)
      .post('/users')
      .send({
        name: 'test user',
      });
    expect(res.statusCode).toEqual(400);
    expect(res.body.status).toEqual('failed');
    expect(res.body.message).toEqual('"email" is required');
  });
});