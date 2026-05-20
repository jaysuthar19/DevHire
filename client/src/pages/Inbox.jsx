import { useEffect, useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";
import "../styles/inbox.css";

export default function Inbox() {
  const [convos, setConvos] = useState([]);
  const navigate = useNavigate();
 
  const token = localStorage.getItem("token");

  const userId = token
    ? JSON.parse(atob(token.split(".")[1])).id
    : null;

  const fetchConvos = async () => {
    try {
      const { data } = await API.get(
        "/messages/conversations/me",
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setConvos(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchConvos();
  }, []);

  return (
    <div className="inboxPage">

      <div className="inboxHeader">
        <h1>Inbox</h1>
        <p>Your conversations</p>
      </div>

      {convos.length === 0 ? (
        <div className="emptyInbox">
          💬 No Conversations Yet
        </div>
      ) : (
        <div className="inboxList">

          {convos.map((c) => {
            const otherUser = c.participants.find(
              (p) => p._id !== userId
            );

            return (
              <div
                key={c._id}
                className="chatCard"
                onClick={() => navigate(`/chat/${otherUser._id}`)}
              >

                <div className="chatLeft">
                  <img
                    src={
                      otherUser?.avatar
                        ? `http://localhost:5000${otherUser.avatar}`
                        : `https://ui-avatars.com/api/?name=${otherUser?.name}`
                    }
                  />

                  <div>
                    <h3>{otherUser?.name}</h3>
                    <p>{c.lastMessage || "Start chatting"}</p>
                  </div>
                </div>

                <div className="chatRight">→</div>

              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}