const express = require("express");
const router = express.Router();
const roleCheck = require("../middleware/roleMiddleware");

const {
  createJob,
  getJobs,
  applyToJob,
  getJobApplicants,
  saveJob,
  getSavedJobs,
  getMyJobs,
  updateApplicationStatus,
} = require("../controllers/jobController");

const protect = require("../middleware/authMiddleware");

// CREATE JOB
router.post("/", protect, createJob);

// GET ALL JOBS
router.get("/", getJobs);

router.put("/:jobId/status/:userId",protect,roleCheck("recruiter"),updateApplicationStatus);


// APPLY TO JOB
router.post("/:id/apply", protect, applyToJob);

// GET JOB APPLICANTS
router.get("/:id/applicants", protect, getJobApplicants);

// SAVE JOB
router.post("/:id/save", protect, saveJob);

// GET MY JOBS
router.get("/my", protect, getMyJobs);

// GET SAVED JOBS
router.get("/saved/me", protect, getSavedJobs);

module.exports = router;