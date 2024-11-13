

const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const seedDb = async () => {
  try {
    const userResult = await pool.query(`
      INSERT INTO users (name, email) 
      VALUES 
      ('Tushar Test 1', 'tusharbansal@iitbhilai.ac.in'),
      ('Jane Smith', 'tushbansal2203@gmail.com')
      RETURNING id
    `);
    const userIds = userResult.rows.map(row => row.id);

    await pool.query(`
      INSERT INTO tasks (title, description, status, assigned_to, assigned_by) 
      VALUES 
      ('Task 1', 'Description for Task 1', 'pending', ${userIds[0]}, ${userIds[1]}),
      ('Task 2', 'Description for Task 2', 'in_progress', ${userIds[1]}, ${userIds[0]})
    `);

    console.log('Database seeded with sample data.');
  } catch (error) {
    console.error('Error seeding database:', error.message);
  } finally {
    pool.end();
  }
};

seedDb();
