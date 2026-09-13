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
