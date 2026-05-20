import { useNavigate } from "react-router-dom";
import "../styles/Messages.css";

export default function Messages() {
  const navigate = useNavigate();

  return (
    <div className="messagesPage">

      <div className="messagesContainer">

        {/* HEADER */}
        <div className="messagesHeader">

          <span className="tag">
            Communication Center
          </span>

          <h1>Messages 💬</h1>

          <p>
            Manage conversations with recruiters and developers.
          </p>

          <button
            onClick={() => navigate("/jobs")}
            className="primaryBtn"
          >
            Start New Chat
          </button>
        </div>

        {/* MAIN CARD */}
        <div className="messageCard">

          {/* TOP BAR */}
          <div className="messageTop">
            <h2>Inbox</h2>
            <p>Your recent conversations will appear here</p>
          </div>

          {/* EMPTY STATE */}
          <div className="emptyState">

            <div className="emptyIcon">
              💬
            </div>

            <h2>No Conversations Yet</h2>

            <p>
              Start chatting with recruiters or developers.
              Your messages will show up here in real-time.
            </p>

            <div style={{ marginTop: "30px", display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>

              <button
                onClick={() => navigate("/jobs")}
                className="primaryBtn"
              >
                Explore Jobs
              </button>

              <button
                onClick={() => navigate("/developers")}
                style={{
                  padding: "12px 18px",
                  borderRadius: "12px",
                  border: "1px solid #334155",
                  background: "transparent",
                  color: "#cbd5e1"
                }}
              >
                View Developers
              </button>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}