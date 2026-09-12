// Job: Actually perform the operation
const pool = require("./db");

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

    res.json(rows);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Failed to fetch user",
    });
  }
};

module.exports = {
  getUsers,
  getUserById,
};
