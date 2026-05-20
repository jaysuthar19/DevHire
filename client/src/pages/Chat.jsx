import "../styles/chat.css";
import {
  useEffect,
  useState,
  useRef,
} from "react";

import { useParams } from "react-router-dom";
import API from "../api";
import { io } from "socket.io-client";
import { FiSend, FiMoreVertical } from "react-icons/fi";

export default function Chat() {
  const { id: receiverId } = useParams();

  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");
  const bottomRef = useRef(null);
  const socketRef = useRef(null);

  const userId = token
    ? JSON.parse(atob(token.split(".")[1])).id
    : null;

  useEffect(() => {
    socketRef.current = io("http://localhost:5000");

    socketRef.current.emit("joinRoom", {
      userId,
      otherUserId: receiverId,
    });

    socketRef.current.on("receiveMessage", (msg) => {
      setMessages((prev) => {
        const exists = prev.some((m) => m._id === msg._id);
        return exists ? prev : [...prev, msg];
      });
    });

    return () => socketRef.current.disconnect();
  }, [receiverId]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        setLoading(true);
        const { data } = await API.get(`/messages/${receiverId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMessages(data);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [receiverId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!text.trim()) return;

    const msgData = {
      sender: userId,
      receiver: receiverId,
      text,
    };

    setText("");

    const { data } = await API.post("/messages", msgData, {
      headers: { Authorization: `Bearer ${token}` },
    });

    socketRef.current.emit("sendMessage", data);
  };

  return (
    <div className="chat-page">

      {/* HEADER */}
      <div className="chat-header">
        <div className="chat-user">
          <div className="avatar" />
          <div>
            <h2>Chat</h2>
            <p>Online</p>
          </div>
        </div>

        <FiMoreVertical />
      </div>

      {/* MESSAGES */}
      <div className="chat-body">
        {loading ? (
          <p className="center">Loading...</p>
        ) : messages.length === 0 ? (
          <p className="center">No messages yet</p>
        ) : (
          messages.map((m, i) => {
            const isMe = (m.sender?._id || m.sender) === userId;

            return (
              <div
                key={i}
                className={isMe ? "msg me" : "msg"}
              >
                {m.text}
              </div>
            );
          })
        )}

        <div ref={bottomRef} />
      </div>

      {/* INPUT */}
      <div className="chat-input">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type message..."
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />

        <button onClick={sendMessage}>
          <FiSend />
        </button>
      </div>
    </div>
  );
}