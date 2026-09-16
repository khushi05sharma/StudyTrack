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

// GET enrollment by ID

const getEnrollmentById = async (req, res) => {
  try {
    const enrollmentId = req.params.id;

    const [rows] = await pool.execute(
      `
      SELECT
        e.id AS enrollment_id,
        u.name AS user_name,
        c.title AS course_title,
        e.enrolled_at
      FROM enrollments e
      JOIN users u ON e.user_id = u.id
      JOIN courses c ON e.course_id = c.id
      WHERE e.id = ?
    `,
      [enrollmentId],
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "enrollment not found" });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Failed to fetch enrollment",
    });
  }
};

// CREATE enrollment
const createEnrollment = async (req, res) => {
  try {
    const { user_id, course_id } = req.body;

    const [result] = await pool.execute(
      "INSERT INTO enrollments (user_id, course_id) VALUES (?, ?)",
      [user_id, course_id],
    );

    return res
      .status(201)
      .json({
        message: "enrollment created successfully",
        enrollmentId: result.insertId,
      });
  } catch (err) {}
};

module.exports = {
  getEnrollments,
};
