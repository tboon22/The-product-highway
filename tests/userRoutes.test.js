// tests/userRoutes.test.js

const request = require('supertest');
const app = require('../server');
const { USER_NOT_FOUND, INTERNAL_SERVER_ERROR } = require('../utils/errors');

describe('User Routes', () => {

  it('should return 404 if user is not found by ID', async () => {
    const invalidUserId = 9999; // Assuming user ID 9999 doesn't exist

    const response = await request(app)
      .get(`/users/${invalidUserId}`)
      .expect(404);

    expect(response.body).toHaveProperty('error', USER_NOT_FOUND.message);
  });

  it('should return 500 for internal server error during user creation', async () => {
    // Simulate a server error by modifying the User.create method or database
    const newUser = {
      name: 'Server Error User',
      email: 'error@example.com',
    };

    const response = await request(app)
      .post('/users')
      .send(newUser)
      .expect(500);

    expect(response.body).toHaveProperty('error', INTERNAL_SERVER_ERROR.message);
  });

  // Add more test cases as needed
});
