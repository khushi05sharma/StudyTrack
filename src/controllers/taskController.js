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

// GET task by ID
const getTaskById = async (req, res) => {
  try {
    const taskId = req.params.id;

    const [rows] = await pool.execute(
      `
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
            WHERE t.id = ?
            `,
      [taskId],
    );

    if (rows.length === 0) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Failed to fetch task",
    });
  }
};

// CREATE task
const createTask = async (req, res) => {
  try {
    const { enrollment_id, title, description, status, due_date } = req.body;

    if (!enrollment_id || !title) {
      return res.status(400).json({
        message: "enrollment_id and title are required",
      });
    }

    const [result] = await pool.execute(
      `
        INSERT INTO tasks (enrollment_id, title, description, status, due_date) VALUES ( ?, ?, ?, ?, ?)
        `,
      [enrollment_id, title, description, status || "pending", due_date],
    );

    res
      .status(201)
      .json({ message: "task created successfully", taskId: result.insertId });
  } catch (err) {
    console.error(err);

    if (err.code === "ER_NO_REFERENCED_ROW_2") {
      return res.status(400).json({
        message: "Invalid enrollment_id",
      });
    }

    res.status(500).json({
      message: "Failed to create task",
    });
  }
};

// UPDATE task
const updateTask = async (req, res) => {
  try {
    const taskId = req.params.id;

    const { title, description, status, due_date } = req.body;

    const [result] = await pool.execute(
      `UPDATE tasks
       SET title = ?, description = ?, status = ?, due_date = ?
       WHERE id = ?`,
      [title, description, status, due_date, taskId],
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.json({
      message: "Task updated successfully",
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Failed to update task",
    });
  }
};

// DELETE task
const deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id;

    const [result] = await pool.execute("DELETE FROM tasks WHERE id = ?", [
      taskId,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.json({
      message: "Task deleted successfully",
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Failed to delete task",
    });
  }
};

module.exports = {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};
