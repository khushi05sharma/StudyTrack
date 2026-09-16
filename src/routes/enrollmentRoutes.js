const express = require("express");
const router = express.Router();

const {
  getEnrollments,
  getEnrollmentById,
  createEnrollment,
  deleteEnrollment,
} = require("../controllers/enrollmentController");

router.get("/", getEnrollments);
router.get("/:id", getEnrollmentById);
router.post("/", createEnrollment);
router.delete("/:id", deleteEnrollment);

module.exports = router;
