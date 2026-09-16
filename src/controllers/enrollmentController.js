const e = require("express");
const pool = require("../db");

const getEnrollments = async (req, res) => {
  try {
    const [rows] = await pool.execute(`
            SELECT 
            e.id AS enrollment_id,
            u.name AS user_name,
            c.title AS course_title,
            e.enrolled_at            FROM enrollments e
            JOIN users u ON e.user_id = u.id
            JOIN courses c ON e.course_id = c.id
            `);

    res.json(rows);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Failed to fetch enrollments",
    });
  }
};

module.exports = {
  getEnrollments,
};