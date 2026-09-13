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

// Requests beginning with /api/users should go to userRoutes
app.use("/api/users", userRoutes);



app.listen(port, async () => {
  console.log(`Server running on http://localhost:${port}`);

  try {
    const [result] = await pool.query("SELECT 1");
    console.log("MySQL connected successfully!");
  } catch (error) {
    console.error("MySQL connection failed:", error.message);
  }
});
