import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import "../styles/navbar.css";

import {
  FiBell,
  FiBriefcase,
  FiBookmark,
  FiMessageSquare,
  FiGrid,
  FiPlusCircle,
  FiLogOut,
} from "react-icons/fi";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [count, setCount] = useState(0);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRes = await API.get("/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUser(userRes.data);

        const notifRes = await API.get("/notifications", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const unread = notifRes.data.filter(n => !n.read).length;
        setCount(unread);
      } catch (err) {
        console.log(err);
      }
    };

    if (token) fetchData();
  }, []);

  const logout = () => {
    localStorage.clear();
    navigate("/login");
    window.location.reload();
  };

  return (
    <div className="navbar">
      <div className="navbar-container">

        {/* LEFT */}
        <div className="navbar-left">
          <h1 className="logo" onClick={() => navigate("/")}>
            DevHire
          </h1>

          <div className="nav-links">
            <button onClick={() => navigate("/jobs")}>
              <FiBriefcase /> Jobs
            </button>

            <button onClick={() => navigate("/saved-jobs")}>
              <FiBookmark /> Saved
            </button>

            <button onClick={() => navigate("/my-jobs")}>
              My Jobs
            </button>

            <button onClick={() => navigate("/developer-dashboard")}>
              <FiGrid /> Developer
            </button>

            <button onClick={() => navigate("/recruiter-dashboard")}>
              <FiGrid /> Recruiter
            </button>
          </div>
        </div>

        {/* RIGHT */}
        <div className="navbar-right">

          {token && (
            <>
              <button className="post-job" onClick={() => navigate("/create-job")}>
                <FiPlusCircle /> Post Job
              </button>

              <button className="icon-btn" onClick={() => navigate("/inbox")}>
                <FiMessageSquare />
              </button>

              <button className="icon-btn" onClick={() => navigate("/notifications")}>
                <FiBell />
                {count > 0 && <span className="badge">{count}</span>}
              </button>

              <button className="profile-btn" onClick={() => navigate("/profile")}>
                <img
                  src={
                    user?.avatar
                      ? `http://localhost:5000${user.avatar}`
                      : `https://ui-avatars.com/api/?name=${user?.name}`
                  }
                  alt=""
                />
                <div>
                  <p>{user?.name}</p>
                  <span>{user?.role || "Developer"}</span>
                </div>
              </button>

              <button className="logout" onClick={logout}>
                <FiLogOut />
              </button>
            </>
          )}

          {!token && (
            <>
              <button onClick={() => navigate("/login")}>Login</button>
              <button className="register" onClick={() => navigate("/register")}>
                Register
              </button>
            </>
          )}
        </div>

      </div>
    </div>
  );
} 