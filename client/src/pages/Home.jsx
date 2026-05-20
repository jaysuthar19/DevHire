import { useNavigate } from "react-router-dom";
import "../styles/home.css";

export default function Home() {
  const navigate = useNavigate();
 
  return (
    <div className="home-container">
      <div className="home-hero">

        {/* LEFT */}
        <div className="home-hero-left">

          <div className="home-badge">
            🚀 AI Powered Hiring Platform
          </div>

          <h1 className="home-title">
            Hire Developers.
            <span>Build Careers.</span>
          </h1>

          <p className="home-description">
            Modern hiring platform with chat, jobs,
            dashboards, resumes and recruiter tools.
          </p>

          <div className="home-buttons">
            <button onClick={() => navigate("/jobs")}>
              Explore Jobs
            </button>

            <button onClick={() => navigate("/register")}>
              Create Account
            </button>
          </div>

          <div className="home-stats">
            <div>
              <h2>10K+</h2>
              <p>Developers</p>
            </div>

            <div>
              <h2>2K+</h2>
              <p>Companies</p>
            </div>

            <div>
              <h2>Live</h2>
              <p>Chat</p>
            </div>
          </div>

        </div>

        {/* RIGHT */}
        <div className="home-hero-right">

          <div className="home-glow"></div>

          <div className="home-card">

            <h2>1,284 Active Jobs</h2>

            {["Frontend", "Backend", "AI", "DevOps"].map((j, i) => (
              <div key={i} className="home-job-mini">
                <p>{j} Developer</p>
                <span>Remote</span>
              </div>
            ))}

          </div>

        </div>

      </div>
    </div>
  );
}