import "../styles/Applicants.css";
import {
  useEffect,
  useState,
} from "react";
 
import { useParams, useNavigate } from "react-router-dom";
import API from "../api";
import { FiMail } from "react-icons/fi";

export default function Applicants() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const token = localStorage.getItem("token");

  const fetchApplicants = async () => {
    const { data } = await API.get(`/jobs/${id}/applicants`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setJob(data);
  };

  const updateStatus = async (userId, status) => {
    await API.put(
      `/jobs/${id}/status/${userId}`,
      { status },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    fetchApplicants();
  };

  useEffect(() => {
    fetchApplicants();
  }, []);

  return (
    <div className="app-page">

      <h1 className="app-title">Applicants</h1>

      {job?.applicants?.map((a, i) => (
        <div key={i} className="app-card">

          <div className="app-top">

            <div className="app-user">
              <div
                className="avatar"
                onClick={() => navigate(`/user/${a.user._id}`)}
              />

              <div>
                <h2>{a.user.name}</h2>

                <p>
                  <FiMail /> {a.user.email}
                </p>
              </div>
            </div>

            <select
              value={a.status}
              onChange={(e) =>
                updateStatus(a.user._id, e.target.value)
              }
            >
              <option>Applied</option>
              <option>Reviewing</option>
              <option>Shortlisted</option>
              <option>Interview</option>
              <option>Rejected</option>
              <option>Hired</option>
            </select>
          </div>

          <div className="skills">
            {a.user.skills?.map((s, i) => (
              <span key={i}>{s}</span>
            ))}
          </div>

          <div className="actions">
            {a.user.resume ? (
              <>
                <a href={`http://localhost:5000${a.user.resume}`}>
                  View Resume
                </a>
              </>
            ) : (
              <p>No Resume</p>
            )}

            <button onClick={() => navigate(`/chat/${a.user._id}`)}>
              Message
            </button>
          </div>
        </div>
      ))}
    </div>
  );
} 