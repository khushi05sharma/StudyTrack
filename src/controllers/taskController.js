const pool = require("../db");

//GET all tasks
const getTasks = async (req, res) => {
  try {
    const [rows] = await pool.execute(`
            SELECT 
            t.id AS task_id,
            t.title,
            t.description,
            t.status,
            t.due_date,
            u.name AS user_name,
            c.title AS course_title,
            t.created_at
            FROM tasks t
            JOIN enrollments e ON t.enrollment_id = e.id
            JOIN users u ON e.user_id = u.id
            JOIN courses c ON e.course_id = c.id
            `);

    res.json(rows);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Failed to fetch tasks",
    });
  }
};

module.exports = {
  getTasks,
};
