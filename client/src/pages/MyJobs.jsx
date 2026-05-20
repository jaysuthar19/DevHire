import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import "../styles/myjobs.css";

import {
  FiUsers,
  FiStar,
  FiCalendar,
  FiArrowRight,
} from "react-icons/fi";

export default function MyJobs() {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const fetchMyJobs = async () => {
    try {
      const { data } = await API.get("/jobs/my", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setJobs(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchMyJobs();
  }, []);

  return (
    <div className="myJobsPage">

      <div className="myJobsContainer">

        {/* HEADER */}
        <div className="myJobsHeader">

          <span className="tag">
            Recruiter Workspace
          </span>

          <h1>My Posted Jobs 🚀</h1>

          <p>
            Manage jobs, applicants, and hiring flow.
          </p>

        </div>

        {/* EMPTY STATE */}
        {jobs.length === 0 && (
          <div className="emptyBox">
            <div className="emptyIcon">📄</div>

            <h2>No Jobs Posted Yet</h2>

            <p>
              Create your first job post to start hiring.
            </p>
          </div>
        )}

        {/* JOB LIST */}
        <div>

          {jobs.map((job) => {
            const applicants = job.applicants?.length || 0;

            const shortlisted =
              job.applicants?.filter((a) => a.status === "Shortlisted").length || 0;

            const interviews =
              job.applicants?.filter((a) => a.status === "Interview").length || 0;

            return (
              <div key={job._id} className="jobItem">

                {/* TOP */}
                <div className="jobTop">

                  <div>

                    <h2 className="jobTitle">
                      {job.title}
                    </h2>

                    <p className="jobCompany">
                      {job.company}
                    </p>

                    <div className="jobTags">

                      <span className="tagBox">
                        📍 {job.location}
                      </span>

                      <span className="tagBox" style={{ color: "#22c55e" }}>
                        ₹ {job.salary}
                      </span>

                    </div>

                  </div>

                  <button
                    onClick={() => navigate(`/applicants/${job._id}`)}
                    style={{
                      background: "#3b82f6",
                      color: "white",
                      padding: "10px 14px",
                      borderRadius: "12px",
                      fontWeight: "600",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px"
                    }}
                  >
                    View Applicants <FiArrowRight />
                  </button>

                </div>

                {/* STATS */}
                <div className="jobTags" style={{ marginTop: "20px" }}>

                  <span className="tagBox">
                    👥 Applicants: {applicants}
                  </span>

                  <span className="tagBox">
                    ⭐ Shortlisted: {shortlisted}
                  </span>

                  <span className="tagBox">
                    📅 Interviews: {interviews}
                  </span>

                </div>

              </div>
            );
          })}

        </div>

      </div>
    </div>
  ); 
}