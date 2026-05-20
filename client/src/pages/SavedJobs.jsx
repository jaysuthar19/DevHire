import { useEffect, useState } from "react";
import API from "../api";
import JobCard from "../components/JobCard";
import { FiBookmark } from "react-icons/fi";
import "../styles/saved.css";

export default function SavedJobs() {
  const [jobs, setJobs] = useState([]);
  const token = localStorage.getItem("token");

  const fetchSavedJobs = async () => {
    try {
      const { data } = await API.get("/user/saved-jobs", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // 🔥 SAFE FIX
      setJobs(
        Array.isArray(data)
          ? data
          : data?.jobs || data?.data || []
      );
    } catch (err) {
      console.log(err);
      setJobs([]);
    }
  };

  useEffect(() => {
    fetchSavedJobs();
  }, []);

  return (
    <div className="savedPage">

      <div className="savedContainer">

        <div className="savedHeader">
          <div className="iconBox">
            <FiBookmark />
          </div>

          <div>
            <h1>Saved Jobs</h1>
            <p>Your bookmarked opportunities ❤️</p>
          </div>
        </div>

        {jobs.length === 0 ? (
          <div className="emptyState">
            <div className="bigIcon">📂</div>
            <h2>No Saved Jobs</h2>
            <p>Save jobs to access them later.</p>
          </div>
        ) : (
          <div className="jobsGrid">
            {jobs.map((job) => (
              <JobCard key={job._id} job={job} />
            ))}
          </div>
        )}

      </div>

    </div>
  );
}