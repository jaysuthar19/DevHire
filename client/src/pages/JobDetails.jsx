import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api";
import "../styles/jobDetails.css";

export default function JobDetails() {
  const { id } = useParams();
 
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const { data } = await API.get("/jobs");
        const found = data.find((j) => j._id === id);
        setJob(found);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, []);

  if (loading) {
    return <div className="pageCenter">Loading...</div>;
  }

  if (!job) {
    return <div className="pageCenter">Job not found</div>;
  }

  return (
    <div className="jobPage">

      {/* TOP */}
      <div className="jobCard">

        <div className="jobHeader">
          <div className="jobLogo">💼</div>

          <div>
            <h1 className="jobTitle">{job.title}</h1>
            <p className="jobCompany">{job.company}</p>
          </div>
        </div>

        <div className="jobInfo">
          <div className="infoBox">{job.location}</div>
          <div className="infoBox">₹ {job.salary}</div>
          <div className="infoBox">Full Time</div>
          <div className="infoBox">Active Hiring</div>
        </div>

        <div className="jobActions">
          <button className="primaryBtn">Apply Now</button>
          <button className="secondaryBtn">Save Job</button>
        </div>
      </div>

      {/* BODY */}
      <div className="jobGrid">

        <div className="jobDesc">
          <h2>Job Description</h2>
          <p>{job.description}</p>
        </div>

        <div className="jobSide">

          <div className="sideCard">
            <h2>Quick Info</h2>

            <p><b>Company:</b> {job.company}</p>
            <p><b>Salary:</b> ₹ {job.salary}</p>
            <p><b>Location:</b> {job.location}</p>
          </div>

          <div className="promoCard">
            <h2>Premium Opportunity</h2>
            <p>High visibility role with strong growth potential.</p>
          </div>

        </div>
      </div>
    </div>
  );
}