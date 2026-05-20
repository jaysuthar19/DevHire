const User = require("../models/User");
const Job = require("../models/Job");

// GET PROFILE
const getProfile = async (req, res) => {
  const user = await User.findById(
    req.user._id
  ).select("-password");

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  res.json(user);
};


const saveJob = async (req, res) => {
  try {
    const user = await User.findById(
      req.user._id
    );

    const alreadySaved =
      user.savedJobs.includes(
        req.params.jobId
      );

    if (alreadySaved) {
      return res.status(400).json({
        message: "Job already saved",
      });
    }

    user.savedJobs.push(
      req.params.jobId
    );

    await user.save();

    res.json({
      message: "Job saved",
    });
  } catch (err) {
    res.status(500).json({
      message: "Server error",
    });
  }
};

const getSavedJobs = async (
  req,
  res
) => {
  try {
    const user = await User.findById(
      req.user._id
    ).populate("savedJobs");

    res.json(user.savedJobs);
  } catch (err) {
    res.status(500).json({
      message: "Server error",
    });
  }
};

// UPDATE PROFILE
const updateProfile = async (req, res) => {
  const user = await User.findById(
    req.user._id
  );

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  if (req.body.experience) {
  user.experience = JSON.parse(
    req.body.experience
  );
}

if (req.body.education) {
  user.education = JSON.parse(
    req.body.education
  );
}

  if (req.files.avatar) {
  user.avatar =
    "/uploads/" +
    req.files.avatar[0].filename;
}

  user.bio =
    req.body.bio || user.bio;

  user.skills = req.body.skills
    ? req.body.skills.split(",")
    : user.skills;

  if (req.file) {
    user.resume = `/uploads/${req.file.filename}`;
  }

  await user.save();

  res.json(user);
};

module.exports = {
  getProfile,
  updateProfile,
  saveJob,
  getSavedJobs,
};