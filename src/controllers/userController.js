const pool = require("./db");

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

module.exports = {
  getUsers,
};
