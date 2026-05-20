import { useNavigate } from "react-router-dom";
import "../styles/jobcard.css";

import {
  FiMapPin,
  FiBookmark,
  FiDollarSign,
  FiClock,
  FiArrowRight,
} from "react-icons/fi";

export default function JobCard({ job, onApply, onSave }) {
  const navigate = useNavigate();

  return (
    <div className="job-card">

      {/* TOP */}
      <div className="job-top">

        <div className="job-left">

          <div className="job-logo">
            {job.company?.charAt(0)}
          </div>

          <div>
            <h2
              className="job-title"
              onClick={() => navigate(`/jobs/${job._id}`)}
            >
              {job.title}
            </h2>

            <p className="job-company">{job.company}</p>

            <div className="job-meta">

              <span><FiMapPin /> {job.location}</span>
              <span><FiDollarSign /> ₹ {job.salary}</span>
              <span><FiClock /> {job.type || "Full Time"}</span>

            </div>
          </div>
        </div>

        <button className="save-btn" onClick={() => onSave(job._id)}>
          <FiBookmark />
        </button>
      </div>

      {/* DESCRIPTION */}
      <p className="job-desc">
        {job.description || "No description provided."}
      </p>

      {/* SKILLS */}
      {job.skills?.length > 0 && (
        <div className="job-skills">
          {job.skills.map((skill, i) => (
            <span key={i}>{skill}</span>
          ))}
        </div>
      )}

      {/* FOOTER */}
      <div className="job-footer">

        <p className="job-time">Posted recently</p>

        <div className="job-actions">

          <button className="apply-btn" onClick={() => onApply(job._id)}>
            Apply
          </button>

          <button className="view-btn" onClick={() => navigate(`/jobs/${job._id}`)}>
            View Job <FiArrowRight />
          </button>

        </div>
      </div>

    </div>
  );
} 