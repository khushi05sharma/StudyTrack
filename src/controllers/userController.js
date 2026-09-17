// Job: Actually perform the operation
const pool = require("../db");

// get all users | read
const getUsers = async (req, res) => {
  try {
    const [rows] = await pool.execute("SELECT id, name, email FROM users");
    res.json(rows);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Failed to fetch users",
    });
  }
};

// read by  id | get user with id
const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;

    const [rows] = await pool.execute(
      "SELECT id, name, email FROM users  WHERE id = ?",
      [userId],
    );

    res.json(rows[0]);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Failed to fetch user",
    });
  }
};

// adding | creating user

const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const [result] = await pool.execute(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, password],
    );

    res.status(201).json({
      message: "User created",
      userId: result.insertId,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Failed to create user",
    });
  }
};

// updating user name

const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const { name } = req.body;

    const [result] = await pool.execute(
      "UPDATE users SET name = ? WHERE id = ?",
      [name, userId],
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    res.json({
      message: "User updated successfully",
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Failed to update user",
    });
  }
};

// delete user

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const [result] = await pool.execute("DELETE FROM users WHERE id = ?", [
      userId,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.json({
      message: "User deleted successfully",
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Failed to delete user",
    });
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
