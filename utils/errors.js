const errorMessages = {
    MISSING_FIELDS: {
      message: 'Title, assigned_to, and assigned_by are required.',
      statusCode: 400
    },
    TASK_NOT_FOUND: {
      message: 'Task not found',
      statusCode: 404
    },
    USER_NOT_FOUND: {
        message: 'User not found',
        statusCode: 404
    },
    INTERNAL_SERVER_ERROR: {
      message: 'Internal Server Error',
      statusCode: 500
    },
    INVALID_INPUT: {
      message: 'Invalid input data.',
      statusCode: 400
    }
  };
  
  module.exports = errorMessages;
  