// models/task.js

const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// Create a new task
const createTask = async (title, description, status, assigned_to, assigned_by) => {
  const query = `
    INSERT INTO tasks (title, description, status, assigned_to, assigned_by)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING id, title, description, status, assigned_to, assigned_by, created_at, updated_at;
  `;
  const values = [title, description, status, assigned_to, assigned_by];
  const result = await pool.query(query, values);
  return result.rows[0];
};

// Get task by ID
const getTaskById = async (id) => {
  const query = 'SELECT * FROM tasks WHERE id = $1';
  const result = await pool.query(query, [id]);
  return result.rows[0];
};

// Get all tasks with optional filters
const getAllTasks = async (filters) => {
  let query = 'SELECT * FROM tasks';
  const values = [];

  if (filters) {
    const conditions = [];
    if (filters.status) {
      conditions.push('status = $' + (values.length + 1));
      values.push(filters.status);
    }
    if (filters.assigned_to) {
      conditions.push('assigned_to = $' + (values.length + 1));
      values.push(filters.assigned_to);
    }
    if (conditions.length) {
      query += ' WHERE ' + conditions.join(' AND ');
    }
  }

  const result = await pool.query(query, values);
  return result.rows;
};

// Update task details
const updateTask = async (id, updates) => {
  const { title, description, status, assigned_to, assigned_by } = updates;
  const query = `
    UPDATE tasks SET 
      title = COALESCE($1, title),
      description = COALESCE($2, description),
      status = COALESCE($3, status),
      assigned_to = COALESCE($4, assigned_to),
      assigned_by = COALESCE($5, assigned_by),
      updated_at = NOW()
    WHERE id = $6
    RETURNING id, title, description, status, assigned_to, assigned_by, created_at, updated_at;
  `;
  const values = [title, description, status, assigned_to, assigned_by, id];
  const result = await pool.query(query, values);
  return result.rows[0];
};

// Delete task
const deleteTask = async (id) => {
  const query = 'DELETE FROM tasks WHERE id = $1 RETURNING id';
  const result = await pool.query(query, [id]);
  return result.rows[0];
};

// Get tasks by user (assigned_to)
const getTasksByUser = async (userId, filters) => {
  let query = 'SELECT * FROM tasks WHERE assigned_to = $1';
  const values = [userId];

  if (filters) {
    const conditions = [];
    if (filters.status) {
      conditions.push('status = $' + (values.length + 1));
      values.push(filters.status);
    }
    if (conditions.length) {
      query += ' AND ' + conditions.join(' AND ');
    }
  }

  const result = await pool.query(query, values);
  return result.rows;
};

module.exports = {
  createTask,
  getTaskById,
  getAllTasks,
  updateTask,
  deleteTask,
  getTasksByUser
};
