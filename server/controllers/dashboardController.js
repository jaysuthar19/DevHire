const User = require("../models/User");
const Job = require("../models/Job");

// DEVELOPER DASHBOARD
const getDeveloperStats = async (req, res) => {
  const user = await User.findById(
    req.user._id
  );

  const profileFields = [
    user.bio,
    user.github,
    user.portfolio,
    user.resume,
  ];

  const filled =
    profileFields.filter(Boolean).length;

  const profileCompletion = Math.round(
    (filled / 4) * 100
  );

  res.json({
    appliedJobs:
      user.appliedJobs?.length || 0,

    savedJobs:
      user.savedJobs?.length || 0,

    profileCompletion,
  });
};

// RECRUITER DASHBOARD
const getRecruiterStats = async (
  req,
  res
) => {
  const jobs = await Job.find({
    postedBy: req.user._id,
  });

  const totalApplicants = jobs.reduce(
    (acc, job) =>
      acc + job.applicants.length,
    0
  );

  res.json({
    totalJobs: jobs.length || 0,

    totalApplicants,

    recentApplications:
      totalApplicants || 0,
  });
};

module.exports = {
  getDeveloperStats,
  getRecruiterStats,
};