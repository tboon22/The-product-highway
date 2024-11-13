
const taskModel = require('../models/task');
const { MISSING_FIELDS, TASK_NOT_FOUND, INTERNAL_SERVER_ERROR, INVALID_INPUT } = require('../utils/errors');

// Create a new task
const createTask = async (req, res) => {
  const { title, description, status, assigned_to, assigned_by } = req.body;

  if (!title || !assigned_to || !assigned_by) {
    return res.status(MISSING_FIELDS.statusCode).json({ error: MISSING_FIELDS.message });
  }

  try {
    const newTask = await taskModel.createTask(title, description, status, assigned_to, assigned_by);
    res.status(201).json(newTask);
  } catch (error) {
    console.error(error.message);
    res.status(INTERNAL_SERVER_ERROR.statusCode).json({ error: INTERNAL_SERVER_ERROR.message });
  }
};

// Get task by ID
const getTaskById = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await taskModel.getTaskById(id);
    if (!task) {
      return res.status(TASK_NOT_FOUND.statusCode).json({ error: TASK_NOT_FOUND.message });
    }
    res.status(200).json(task);
  } catch (error) {
    console.error(error.message);
    res.status(INTERNAL_SERVER_ERROR.statusCode).json({ error: INTERNAL_SERVER_ERROR.message });
  }
};

// Get all tasks with optional filters (status and assigned_to)
const getAllTasks = async (req, res) => {
  const { status, assigned_to } = req.query;
  const filters = { status, assigned_to };

  try {
    const tasks = await taskModel.getAllTasks(filters);
    res.status(200).json(tasks);
  } catch (error) {
    console.error(error.message);
    res.status(INTERNAL_SERVER_ERROR.statusCode).json({ error: INTERNAL_SERVER_ERROR.message });
  }
};

// Get tasks assigned to a specific user with optional filters (status)
const getTasksByUser = async (req, res) => {
  const { userId } = req.params;
  const { status } = req.query;
  const filters = { status };

  try {
    const tasks = await taskModel.getTasksByUser(userId, filters);
    res.status(200).json(tasks);
  } catch (error) {
    console.error(error.message);
    res.status(INTERNAL_SERVER_ERROR.statusCode).json({ error: INTERNAL_SERVER_ERROR.message });
  }
};

// Update task details
const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, status, assigned_to, assigned_by } = req.body;

  try {
    const updatedTask = await taskModel.updateTask(id, { title, description, status, assigned_to, assigned_by });
    if (!updatedTask) {
      return res.status(TASK_NOT_FOUND.statusCode).json({ error: TASK_NOT_FOUND.message });
    }
    res.status(200).json(updatedTask);
  } catch (error) {
    console.error(error.message);
    res.status(INTERNAL_SERVER_ERROR.statusCode).json({ error: INTERNAL_SERVER_ERROR.message });
  }
};

// Delete task
const deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTask = await taskModel.deleteTask(id);
    if (!deletedTask) {
      return res.status(TASK_NOT_FOUND.statusCode).json({ error: TASK_NOT_FOUND.message });
    }
    res.status(200).json({ message: 'Task deleted successfully', id: deletedTask.id });
  } catch (error) {
    console.error(error.message);
    res.status(INTERNAL_SERVER_ERROR.statusCode).json({ error: INTERNAL_SERVER_ERROR.message });
  }
};

module.exports = {
  createTask,
  getTaskById,
  getAllTasks,
  getTasksByUser,
  updateTask,
  deleteTask
};
