import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import JobCard from "../components/JobCard";
import "../styles/jobs.css";

export default function Jobs() {
  const [keyword, setKeyword] = useState("");
  const [jobs, setJobs] = useState([]);
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) navigate("/login");
  }, []);

  const fetchJobs = async () => {
    try {
      const { data } = await API.get(
        `/jobs?keyword=${keyword}&location=${location}&type=${type}`
      );

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
    fetchJobs();
  }, [keyword, location, type]);

  const applyJob = async (id) => {
    try {
      await API.post(`/jobs/${id}/apply`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("Applied successfully 🚀");
    } catch (err) {
      alert(err.response?.data?.message || "Error applying");
    }
  };

  const saveJob = async (jobId) => {
    try {
      await API.put(`/user/save-job/${jobId}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("Job saved ❤️");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="jobsPage">
      <div className="jobsContainer">

        <div className="jobsHero">
          <h1>Find Your Dream Job</h1>
          <p>Discover top developer opportunities.</p>
        </div>

        <div className="searchBox">

          <input
            placeholder="Search jobs..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />

          <input
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />

          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="">All Types</option>
            <option value="Remote">Remote</option>
            <option value="Hybrid">Hybrid</option>
            <option value="Onsite">Onsite</option>
          </select>

          <button onClick={fetchJobs}>Search</button>

        </div>

        <div className="jobsList">
          <h2>Available Jobs</h2>
          <p>{jobs.length} jobs found</p>

          {jobs.length > 0 ? (
            jobs.map((job) => (
              <JobCard
                key={job._id}
                job={job}
                onApply={applyJob}
                onSave={saveJob}
              />
            ))
          ) : (
            <div className="emptyJobs">
              No jobs found
            </div>
          )}
        </div>

      </div>
    </div>
  );
}