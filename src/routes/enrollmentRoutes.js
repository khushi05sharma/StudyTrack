const express = require("express");
const router = express.Router();

const {
  getEnrollments,
  getEnrollmentById,
  createEnrollment,
  deleteEnrollment,
} = require("../controllers/enrollmentController");

router.get("/", getEnrollments);

module.exports = router;
