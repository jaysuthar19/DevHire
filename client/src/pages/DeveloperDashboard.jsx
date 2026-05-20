import { useEffect, useState } from "react";
import API from "../api";
 
import {
  FiBriefcase,
  FiBookmark,
  FiUser,
  FiTrendingUp,
} from "react-icons/fi";

import "../styles/developerDashboard.css";

export default function DeveloperDashboard() {
  const [stats, setStats] = useState({
    appliedJobs: 0,
    savedJobs: 0,
    profileCompletion: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token");

        const { data } = await API.get(
          "/dashboard/developer",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setStats(data);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const cards = [
    {
      title: "Applied Jobs",
      value: stats.appliedJobs,
      icon: <FiBriefcase />,
      color: "blue",
    },
    {
      title: "Saved Jobs",
      value: stats.savedJobs,
      icon: <FiBookmark />,
      color: "pink",
    },
    {
      title: "Profile Complete",
      value: `${stats.profileCompletion}%`,
      icon: <FiUser />,
      color: "purple",
    },
  ];

  return (
    <div className="dashPage">

      <div className="dashContainer">

        <div className="dashHeader">
          <div>
            <h1>Developer Dashboard</h1>
            <p>Track your progress</p>
          </div>

          <div className="dashBadge">
            <FiTrendingUp />
            <span>Excellent</span>
          </div>
        </div>

        {loading ? (
          <p className="loading">Loading...</p>
        ) : (
          <div className="cardGrid">

            {cards.map((c, i) => (
              <div key={i} className={`statCard ${c.color}`}>

                <div className="iconBox">
                  {c.icon}
                </div>

                <h2>{c.value}</h2>
                <p>{c.title}</p>

              </div>
            ))}

          </div>
        )}

      </div>
    </div>
  );
}