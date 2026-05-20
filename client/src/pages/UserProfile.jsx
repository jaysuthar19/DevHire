import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api";

export default function UserProfile() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    fetchUser();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        User not found
      </div>
    );
  }

  return (
    <div className="userProfilePage">
  <div className="userProfileContainer">

    <div className="userCard">

      <h1 className="userName">{user.name}</h1>
      <p className="userRole">{user.role}</p>

      <div className="userBio">
        {user.bio || "No bio added"}
      </div>

      <h2 className="sectionTitle">Skills</h2>

      <div className="skillWrap">
        {user.skills?.map((skill, i) => (
          <span key={i} className="skillTag">
            {skill}
          </span>
        ))}
      </div>

      <div className="actionRow">

        {user.github && (
          <a href={user.github} target="_blank" className="btn btn-dark">
            GitHub
          </a>
        )}

        {user.portfolio && (
          <a href={user.portfolio} target="_blank" className="btn btn-blue">
            Portfolio
          </a>
        )}

        {user.resume && (
          <a
            href={`http://localhost:5000${user.resume}`}
            target="_blank"
            className="btn btn-green"
          >
            Resume
          </a>
        )}

        <button
          onClick={() => navigate(`/chat/${user._id}`)}
          className="btn btn-purple"
        >
          Message
        </button>

      </div>

    </div>
  </div>
</div>
  );
}