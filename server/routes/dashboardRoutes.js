const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  getDeveloperStats,
  getRecruiterStats,
} = require("../controllers/dashboardController");

// developer dashboard
router.get(
  "/developer",
  protect,
  getDeveloperStats
);

// recruiter dashboard
router.get(
  "/recruiter",
  protect,
  getRecruiterStats
);

module.exports = router;