// routes/taskRoutes.js

const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const TaskStatus = require('../enums/taskStatusEnum');

/**
 * @swagger
 * definitions:
 *   TaskStatus:
 *     type: string
 *     enum:
 *       - pending
 *       - in_progress
 *       - completed
 */

/**
 * @swagger
 * /tasks:
 *   post:
 *     description: Create a new task
 *     parameters:
 *       - in: body
 *         name: task
 *         description: Task object to create
 *         schema:
 *           type: object
 *           required:
 *             - title
 *             - description
 *             - status
 *           properties:
 *             title:
 *               type: string
 *             description:
 *               type: string
 *             status:
 *               $ref: '#/definitions/TaskStatus'
 *             assigned_to:
 *               type: integer
 *             assigned_by:
 *               type: integer
 *     responses:
 *       201:
 *         description: Task created successfully
 *       400:
 *         description: Invalid input data
 *       500:
 *         description: Internal Server Error
 */
router.post('/', taskController.createTask);

/**
 * @swagger
 * /tasks/{id}:
 *   get:
 *     description: Get a task by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Task retrieved successfully
 *       404:
 *         description: Task not found
 *       500:
 *         description: Internal Server Error
 */
router.get('/:id', taskController.getTaskById);

/**
 * @swagger
 * /tasks:
 *   get:
 *     description: Get tasks, optionally filtered by status
 *     parameters:
 *       - in: query
 *         name: status
 *         required: false
 *         type: string
 *         enum:
 *           - pending
 *           - in_progress
 *           - completed
 *       - in: query
 *         name: assigned_to
 *         required: false
 *         type: integer
 *     responses:
 *       200:
 *         description: List of tasks
 *       400:
 *         description: Invalid status or user ID
 *       500:
 *         description: Internal Server Error
 */
router.get('/', taskController.getAllTasks);

/**
 * @swagger
 * /tasks/user/{userId}:
 *   get:
 *     description: Get tasks assigned to a particular user, optionally filtered by status
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         type: integer
 *       - in: query
 *         name: status
 *         required: false
 *         type: string
 *         enum:
 *           - pending
 *           - in_progress
 *           - completed
 *     responses:
 *       200:
 *         description: List of tasks assigned to a user
 *       400:
 *         description: Invalid status or user ID
 *       500:
 *         description: Internal Server Error
 */
router.get('/user/:userId', taskController.getTasksByUser);

/**
 * @swagger
 * /tasks/{id}:
 *   put:
 *     description: Update a task by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: integer
 *       - in: body
 *         name: task
 *         description: Updated task object
 *         schema:
 *           type: object
 *           properties:
 *             title:
 *               type: string
 *             description:
 *               type: string
 *             status:
 *               $ref: '#/definitions/TaskStatus'
 *             assigned_to:
 *               type: integer
 *             assigned_by:
 *               type: integer
 *     responses:
 *       200:
 *         description: Task updated successfully
 *       400:
 *         description: Invalid input data
 *       404:
 *         description: Task not found
 *       500:
 *         description: Internal Server Error
 */
router.put('/:id', taskController.updateTask);

/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     description: Delete a task by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Task deleted successfully
 *       404:
 *         description: Task not found
 *       500:
 *         description: Internal Server Error
 */
router.delete('/:id', taskController.deleteTask);

module.exports = router;
