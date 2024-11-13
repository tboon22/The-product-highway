const db = require('../config/db');

const User = {
  async create(user) {
    const { name, email } = user;
    const result = await db.query(
      `INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *`,
      [name, email]
    );
    return result.rows[0];
  },

  async findById(id) {
    const result = await db.query(`SELECT * FROM users WHERE id = $1`, [id]);
    return result.rows[0];
  },

  async findAll() {
    const result = await db.query(`SELECT * FROM users`);
    return result.rows;
  }
};

module.exports = User;
