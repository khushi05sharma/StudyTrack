// Job: Start and organize the Express app
const express = require("express");
const pool = require("./db");
const userRoutes = require("./routes/userRoutes");

const app = express();

const port = 5000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("studytrack backend is working");
});

// read / checking users
// Requests beginning with /api/users should go to userRoutes
app.use("/api/users", userRoutes);

// read / checking user with id

app.get("/api/users/:id", async (req, res) => {
  try {
    const userId = req.params.id;

    const [rows] = await pool.execute(
      "SELECT id, name, email FROM users WHERE id = ?",
      [userId],
    );

    res.json(rows);
  } catch (Err) {
    console.error(Err);
    res.status(500).json({
      message: "failed to fetch users",
    });
  }
});

// adding / creating user

app.post("/api/users", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const [result] = await pool.execute(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, password],
    );

    console.log("user created  successfully");

    res.status(201).json({
      message: "user created",
      userId: result.insertId,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "failed to create user" });
  }
});

// updating user name

app.put("/api/users/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const { name } = req.body;

    const [result] = await pool.execute(
      "UPDATE users SET name = ? WHERE id = ?",
      [name, userId],
    );

    console.log("user name updated successfully");

    res.json({
      message: "User updated successfully",
      affectedRows: result.affectedRows,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Failed to update user",
    });
  }
});

// delete user

app.delete("/api/users/:id", async (req, res) => {
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
});

app.listen(port, async () => {
  console.log(`Server running on http://localhost:${port}`);

  try {
    const [result] = await pool.query("SELECT 1");
    console.log("MySQL connected successfully!");
  } catch (error) {
    console.error("MySQL connection failed:", error.message);
  }
});
