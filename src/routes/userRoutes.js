const express = require("express");
const router = express.Router();
const { getUsers } = require("../controllers/userController");

router.get("/", getUsers);

module.exports = router;

// route work - For THIS request, use THIS controller.
// Job: Decide which controller handles the request
