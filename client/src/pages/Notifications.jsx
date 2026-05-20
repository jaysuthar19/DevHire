import { useEffect, useState } from "react";
import API from "../api";
import { FiBell, FiCheckCircle } from "react-icons/fi";
import "../styles/notifications.css";

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  const fetchNotifications = async () => {
    try {
      const { data } = await API.get("/notifications", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // 🔥 SAFE FIX
      setNotifications(
        Array.isArray(data)
          ? data
          : data?.notifications || data?.data || []
      );
    } catch (err) {
      console.log(err);
      setNotifications([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchNotifications();
    else setLoading(false);
  }, [token]);

  const markRead = async (id) => {
    try {
      await API.put(`/notifications/${id}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchNotifications();
    } catch (err) {
      console.log(err);
    }
  };

  if (loading) {
    return <div className="centerPage">Loading...</div>;
  }

  return (
    <div className="notificationsPage">

      <div className="notificationsContainer">

        <div className="notificationsHeader">
          <div className="headerIcon">
            <FiBell />
          </div>

          <div>
            <span className="tag">Activity Center</span>
            <h1>Notifications</h1>
            <p>Track applications, interviews, and updates.</p>
          </div>
        </div>

        <div className="notificationList">

          {notifications.length > 0 ? (
            notifications.map((n) => (
              <div
                key={n._id}
                className={`notificationCard ${n.read ? "read" : "unread"}`}
              >
                <div className="notificationText">
                  <p>{n.text}</p>
                  <span>
                    {n.createdAt
                      ? new Date(n.createdAt).toLocaleString()
                      : ""}
                  </span>
                </div>

                {!n.read && (
                  <button
                    onClick={() => markRead(n._id)}
                    className="markBtn"
                  >
                    <FiCheckCircle />
                    Mark Read
                  </button>
                )}
              </div>
            ))
          ) : (
            <div className="emptyState">
              No notifications yet
            </div>
          )}

        </div>

      </div>
    </div>
  );
}