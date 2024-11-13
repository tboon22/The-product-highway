
const User = require('../models/user');
const { USER_NOT_FOUND, INTERNAL_SERVER_ERROR } = require('../utils/errors');

// Create a new user
exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(INTERNAL_SERVER_ERROR.statusCode).json({ error: INTERNAL_SERVER_ERROR.message });
  }
};

// Get a user by ID
exports.getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(USER_NOT_FOUND.statusCode).json({ error: USER_NOT_FOUND.message });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(INTERNAL_SERVER_ERROR.statusCode).json({ error: INTERNAL_SERVER_ERROR.message });
  }
};

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(INTERNAL_SERVER_ERROR.statusCode).json({ error: INTERNAL_SERVER_ERROR.message });
  }
};
