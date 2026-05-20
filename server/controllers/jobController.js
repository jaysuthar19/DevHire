const Job = require("../models/Job");
const Notification = require(
  "../models/Notification"
);
const User = require("../models/User");


// Create Job
const createJob = async (req, res) => {
  const job = await Job.create({
    ...req.body,
    postedBy: req.user._id,
  });

  res.json(job);
};

// Apply Job
const applyToJob = async (req, res) => {
  const job = await Job.findById(req.params.id);

  if (!job) return res.status(404).json({ message: "Job not found" });

  const alreadyApplied = job.applicants.find(
    (a) => a.user.toString() === req.user._id.toString()
  );

  if (alreadyApplied) {
    return res.status(400).json({ message: "Already applied" });
  }

  job.applicants.push({
  user: req.user._id,
  status: "Applied",
});

  req.user.appliedJobs.push(job._id);

  await req.user.save();

  await job.save();

  res.json({ message: "Applied successfully" });
};

// Get Applicants
const getJobApplicants = async (req, res) => {
  const job = await Job.findById(req.params.id)
    .populate(
  "applicants.user",
  "name email skills resume"
)
    .populate("postedBy", "name email");

  if (!job) return res.status(404).json({ message: "Job not found" });

  res.json(job);
};

const updateApplicationStatus =
  async (req, res) => {
    const { status } = req.body;

    const job = await Job.findById(
      req.params.jobId
    );

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    const applicant =
      job.applicants.find(
        (a) =>
          a.user.toString() ===
          req.params.userId
      );

    if (!applicant) {
      return res.status(404).json({
        message: "Applicant not found",
      });
    }

    applicant.status = status;

    const user = await User.findById(
  req.params.userId
);

user.notifications.unshift({
  text: `Your application status changed to ${status}`,
});

await user.save();

    await job.save();

    await Notification.create({
  user: req.params.userId,
  text: `Your application status changed to ${status} 🚀`,
});

    res.json({
      message:
        "Status updated successfully",
    });
  };


// Get Jobs
const getJobs = async (req, res) => {
  try {
    const {
      keyword,
      location,
      type,
    } = req.query;

    let query = {};

    // SEARCH
    if (keyword) {
      query.$or = [
        {
          title: {
            $regex: keyword,
            $options: "i",
          },
        },
        {
          skills: {
            $regex: keyword,
            $options: "i",
          },
        },
      ];
    }

    // LOCATION FILTER
    if (location) {
      query.location = {
        $regex: location,
        $options: "i",
      };
    }

    // JOB TYPE FILTER
    if (type) {
      query.type = type;
    }

    const jobs = await Job.find(query)
      .populate("postedBy", "name")
      .sort({ createdAt: -1 });

    res.json(jobs);
  } catch (err) {
    res.status(500).json({
      message: "Server error",
    });
  }
};

// Save Job
const saveJob = async (req, res) => {
  const user = req.user;
  const jobId = req.params.id;

  if (user.savedJobs.includes(jobId)) {
    return res.status(400).json({ message: "Already saved" });
  }

  user.savedJobs.push(jobId);
  await user.save();

  res.json({ message: "Job saved" });
};

const getMyJobs = async (req, res) => {
  const jobs = await Job.find({ postedBy: req.user._id })
    .populate("postedBy", "name email");

  res.json(jobs);
};

// Get Saved Jobs
const getSavedJobs = async (req, res) => {
  const user = await User.findById(req.user._id).populate("savedJobs");

  res.json(user.savedJobs);
};

module.exports = {
  updateApplicationStatus,
  createJob,
  applyToJob,
  getJobApplicants,
  getJobs,
  saveJob,
  getSavedJobs,
  getMyJobs,
};