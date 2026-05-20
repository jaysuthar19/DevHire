import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import "../styles/profile.css";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await API.get("/user/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchProfile();
    else setLoading(false);
  }, [token]);

  if (loading) {
    return <div className="centerPage">Loading...</div>;
  }

  if (!user) {
    return <div className="centerPage">No profile found</div>;
  }

  return (
    <div className="profilePage">

      <div className="profileContainer">

        {/* HEADER BANNER */}
        <div className="profileBanner"></div>

        <div className="profileCard">

          {/* AVATAR */}
          <div className="avatarWrapper">
            <img
              src={
                user.avatar
                  ? `http://localhost:5000${user.avatar}`
                  : `https://ui-avatars.com/api/?name=${user.name}`
              }
              className="avatar"
            />
          </div>

          {/* TOP INFO */}
          <div className="profileTop">

            <div>
              <h1>{user.name}</h1>
              <p>{user.role}</p>
            </div>

            <button
              onClick={() => navigate("/edit-profile")}
              className="primaryBtn"
            >
              Edit Profile
            </button>

          </div>

          {/* BIO */}
          <div className="profileSection">
            <h2>Bio</h2>
            <div className="box">
              {user.bio || "No bio added yet."}
            </div>
          </div>

          {/* SKILLS */}
          <div className="profileSection">
            <h2>Skills</h2>

            <div className="skillWrap">
              {user.skills?.length ? (
                user.skills.map((s, i) => (
                  <span key={i} className="skillTag">
                    {s}
                  </span>
                ))
              ) : (
                <p>No skills added</p>
              )}
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}