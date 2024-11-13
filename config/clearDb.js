

const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const clearDb = async () => {
  try {
    await pool.query('DROP TABLE IF EXISTS tasks');
    await pool.query('DROP TABLE IF EXISTS users');

    console.log('Database cleared successfully.');
  } catch (error) {
    console.error('Error clearing database:', error.message);
  } finally {
    pool.end();
  }
};

clearDb();
