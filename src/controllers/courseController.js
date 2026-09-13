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
    const courseId = req.params.id;
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

//create course
const createCourse = async (req, res) => {
  try {
    const { title, description, instructor } = req.body;

    const [result] = await pool.execute(
      "INSERT INTO courses (title, description, instructor) VALUES (?, ?, ?)",
      [title, description, instructor],
    );

    res.status(201).json({
      message: "Course created successfully",
      courseId: result.insertId,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Failed to create course",
    });
  }
};

// UPDATE course
const updateCourse = async (req, res) => {
  try {
    const courseId = req.params.id;
    const { title, description, instructor } = req.body;

    const [result] = await pool.execute(
      `UPDATE courses SET title = ?, description = ?, instructor = ? WHERE id = ?`,
      [title, description, instructor, courseId],
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Course not found",
      });
    }

    res.json({
      message: "Course updated successfully",
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Failed to update course",
    });
  }
};

// DELETE course
const deleteCourse = async (req, res) => {
  try {
    const courseId = req.params.id;

    const [result] = await pool.execute("DELETE FROM courses WHERE id = ?", [
      courseId,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Course not found",
      });
    }

    res.json({
      message: "Course deleted successfully",
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Failed to delete course",
    });
  }
};

module.exports = {
  getCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
};
