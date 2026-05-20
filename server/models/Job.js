const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    company: String,
    location: String,
    skills: [String],

    salary: {
      type: String,
    },

    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    location: {
  type: String,
},

type: {
  type: String,
},
  applicants: [
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    status: {
      type: String,
      enum: [
        "Applied",
        "Reviewing",
        "Shortlisted",
        "Interview",
        "Rejected",
        "Hired",
      ],
      default: "Applied",
    },
  },
],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", jobSchema);