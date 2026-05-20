const express = require("express");
const router = express.Router();

const User = require("../models/User");

const protect = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const {
  getProfile,
  updateProfile,
  saveJob,
  getSavedJobs,
} = require("../controllers/userController");

// --------------------
// GET OWN PROFILE
// --------------------
router.get("/profile", protect, getProfile);


router.put(
  "/save-job/:jobId",
  protect,
  saveJob
);

router.get(
  "/saved-jobs",
  protect,
  getSavedJobs
);
// --------------------
// GET PUBLIC PROFILE
// --------------------
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select(
      "-password"
    );

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({
      message: "Server error",
    });
  }
});
// --------------------
// UPDATE PROFILE
// --------------------
router.put(
  "/profile",
  protect,
  upload.fields([
  {
    name: "resume",
    maxCount: 1,
  },
  {
    name: "avatar",
    maxCount: 1,
  },
]),
  updateProfile
);

module.exports = router;