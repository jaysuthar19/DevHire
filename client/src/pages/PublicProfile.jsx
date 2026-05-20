import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api";
import "../styles/publicProfile.css";

export default function PublicProfile() {
  const { id } = useParams();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await API.get(`/user/${id}`);
        setUser(data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  if (loading) {
    return <div className="centerPage">Loading...</div>;
  }

  if (!user) {
    return <div className="centerPage">User not found</div>;
  }

  return (
    <div className="publicProfilePage">

      <div className="publicProfileCard">

        {/* HEADER */}
        <div className="publicHeader">
          <h1>{user.name}</h1>
          <p>{user.role}</p>
        </div>

        {/* BIO */}
        <div className="section">
          <h2>Bio</h2>
          <p className="box">
            {user.bio || "No bio added yet"}
          </p>
        </div>

        {/* SKILLS */}
        <div className="section">
          <h2>Skills</h2>

          <div className="skillWrap">
            {user.skills?.length ? (
              user.skills.map((s, i) => (
                <span key={i} className="skillTag">
                  {s}
                </span>
              ))
            ) : (
              <p className="muted">No skills added</p>
            )}
          </div>
        </div>

        {/* LINKS */}
        <div className="section">
          <h2>Links</h2>

          <div className="linkWrap">

            {user.github && (
              <a href={user.github} target="_blank" rel="noreferrer">
                GitHub
              </a>
            )}

            {user.portfolio && (
              <a href={user.portfolio} target="_blank" rel="noreferrer">
                Portfolio
              </a>
            )}

          </div>
        </div>

        {/* RESUME */}
        {user.resume && (
          <div className="section">
            <h2>Resume</h2>

            <iframe
              src={`http://localhost:5000${user.resume}`}
              className="resumeFrame"
              title="resume"
            />
          </div>
        )}

      </div>

    </div>
  );
}