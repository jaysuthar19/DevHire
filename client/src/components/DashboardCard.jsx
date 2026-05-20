import "../styles/dashboard.css";
import { FiTrendingUp } from "react-icons/fi";

export default function DashboardCard({
  title,
  value,
  icon,
}) {
  return (
    <div className="dashboard-card">

      <div className="dashboard-glow"></div>

      <div className="dashboard-top">
        <div>
          <p className="dashboard-title">{title}</p>
          <h2 className="dashboard-value">{value}</h2>
        </div>

        <div className="dashboard-icon">
          {icon || <FiTrendingUp size={24} />}
        </div>
      </div>

      <div className="dashboard-bottom">
        <span className="dot"></span>
        <p>Updated recently</p>
      </div>

    </div>
  );
} 