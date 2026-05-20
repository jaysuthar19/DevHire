const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    role: {
      type: String,
      enum: ["developer", "recruiter", "admin"],
      default: "developer",
    },

    // ---------------- PROFILE ----------------
    bio: { type: String, default: "" },

    avatar: {
  type: String,
},

experience: [
  {
    company: String,
    role: String,
    duration: String,
  },
],

education: [
  {
    college: String,
    degree: String,
    year: String,
  },
],

    skills: [
      {
        type: String,
      },
    ],

    savedJobs: [
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job",
  },
],

    github: { type: String, default: "" },
    portfolio: { type: String, default: "" },

    // resume file path
    resume: {
      type: String,
      default: "",
    },

    // ---------------- JOB SYSTEM ----------------
    savedJobs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job",
      },
    ],

    appliedJobs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job",
      },
    ],

    // ---------------- NOTIFICATIONS ----------------
    notifications: [
      {
        text: String,

        type: {
          type: String,
          enum: ["message", "job", "system"],
          default: "system",
        },

        read: {
          type: Boolean,
          default: false,
        },

        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    // ---------------- FUTURE CHAT SUPPORT ----------------
    lastSeen: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);