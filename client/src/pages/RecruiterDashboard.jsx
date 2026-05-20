import { useEffect, useState } from "react";
import API from "../api";
import "../styles/recruiterDashboard.css";

import {
  FiBriefcase,
  FiUsers,
  FiTrendingUp,
} from "react-icons/fi";

export default function RecruiterDashboard() {
  const [stats, setStats] = useState({
    totalJobs: 0,
    totalApplicants: 0,
    recentApplications: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token");

        const { data } = await API.get("/dashboard/recruiter", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setStats(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="recruiterPage">

      <div className="recruiterContainer">

        {/* HEADER */}
        <div className="recruiterHeader">

          <span className="tag">Recruiter Panel</span>

          <h1>Recruiter Dashboard 🚀</h1>

          <p>
            Track jobs, applicants, and hiring activity.
          </p>

        </div>

        {/* STATS */}
        <div className="statsGrid">

          <StatCard
            label="Total Jobs"
            value={stats.totalJobs}
            icon={<FiBriefcase />}
            type="blue"
          />

          <StatCard
            label="Applicants"
            value={stats.totalApplicants}
            icon={<FiUsers />}
            type="pink"
          />

          <StatCard
            label="Recent Applications"
            value={stats.recentApplications}
            icon={<FiTrendingUp />}
            type="purple"
          />

        </div>

        {/* INSIGHTS */}
        <div className="insightCard">

          <h2>Hiring Insights</h2>

          <p>
            Track jobs, applicants, interviews, and hiring performance in real-time.
          </p>

          <div className="badgeWrap">

            <span className="badge">⚡ Real-time Updates</span>
            <span className="badge">📈 Hiring Analytics</span>
            <span className="badge">💬 Candidate Messaging</span>

          </div>

        </div>

      </div>
    </div>
  );
}

/* SMALL UI COMPONENTS */
function StatCard({ label, value, icon, type }) {
  return (
    <div className={`statCard ${type}`}>

      <div>
        <p>{label}</p>
        <h2>{value}</h2>
      </div>

      <div className="iconBox">
        {icon}
      </div>

    </div>
  );
}