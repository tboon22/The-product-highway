const request = require('supertest');
const app = require('../server');
const { USER_NOT_FOUND, INTERNAL_SERVER_ERROR } = require('../utils/errors');

describe('User Routes', () => {

  it('should create a new user', async () => {
    const newUser = {
      name: 'John Doe',
      email: 'john@example.com',
    };

    const response = await request(app)
      .post('/users')
      .send(newUser)
      .expect(201);

    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe(newUser.name);
  });

  it('should return 404 if user is not found by ID', async () => {
    const invalidUserId = 9999; 
    const response = await request(app)
      .get(`/users/${invalidUserId}`)
      .expect(404);

    expect(response.body).toHaveProperty('error', USER_NOT_FOUND.message);
  });

  

  it('should get user details by ID', async () => {
    const userId = 1; 

    const response = await request(app)
      .get(`/users/${userId}`)
      .expect(200);

    expect(response.body).toHaveProperty('id', userId);
  });

});
