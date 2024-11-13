// server.js
const express = require('express');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const taskRoutes = require('./routes/taskRoutes');
const userRoutes = require('./routes/userRoutes');
const app = express();
const port = process.env.PORT || 3000;

// Swagger setup
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'Task Management API',
      version: '1.0.0',
      description: 'API Documentation for Task Management System',
    },
    servers: [
      {
        url: `http://localhost:${port}`,
      },
    ],
  },
  apis: ['./routes/*.js'],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

// Middleware
app.use(express.json());

// Routes
app.use('/tasks', taskRoutes);
app.use('/users', userRoutes);

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
