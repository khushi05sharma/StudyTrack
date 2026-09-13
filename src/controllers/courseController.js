const pool = require("../db");

// GET all courses

const getCourses = async (req, res) => {
  try {
    const [rows] = await pool.execute(
      "SELECT id, title, description, instructor",
    );

    res.json(rows);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Failed to fetch courses",
    });
  }
};

// GET course by ID
const getCourseById = async (req, res) => {
  try {
    const userId = req.params.id;
    const [rows] = await pool.execute(
      "SELECT id, title, description, instructor FROM courses WHERE id = ?",
      [courseId],
    );

    if (rows.length === 0) {
      return res.status(404).json({
        message: "Course not found",
      });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Failed to fetch course",
    });
  }
};

module.exports = {
  getCourses,
  getCourseById,
};
