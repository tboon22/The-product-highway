// tests/taskRoutes.test.js

const request = require('supertest');
const app = require('../server');
const { MISSING_FIELDS, TASK_NOT_FOUND, INTERNAL_SERVER_ERROR } = require('../utils/errors');

describe('Task Routes', () => {

  it('should return 400 if required fields are missing while creating a task', async () => {
    const incompleteTask = {
      title: 'Sample Task', // Missing assigned_to and assigned_by
    };

    const response = await request(app)
      .post('/tasks')
      .send(incompleteTask)
      .expect(400);

    expect(response.body).toHaveProperty('error', MISSING_FIELDS.message);
  });

  it('should return 404 if task is not found by ID', async () => {
    const invalidTaskId = 9999; // Assuming task ID 9999 doesn't exist

    const response = await request(app)
      .get(`/tasks/${invalidTaskId}`)
      .expect(404);

    expect(response.body).toHaveProperty('error', TASK_NOT_FOUND.message);
  });

  it('should return 500 for internal server error during task creation', async () => {
    // Simulate a server error by modifying taskModel logic or database
    const newTask = {
      title: 'Server Error Task',
      description: 'Description',
      status: 'pending',
      assigned_to: 'user1',
      assigned_by: 'user2',
    };

    const response = await request(app)
      .post('/tasks')
      .send(newTask)
      .expect(500);

    expect(response.body).toHaveProperty('error', INTERNAL_SERVER_ERROR.message);
  });


});
