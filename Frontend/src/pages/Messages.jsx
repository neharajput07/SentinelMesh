import { useEffect, useState } from "react";
import axios from "../services/axiosInstance";
import API_URL from "../config/api";
import Sidebar from "../components/Sidebar";
import "../styles/dashboard.css";

function Messages() {

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/contact`
      );
      setMessages(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="main-container">

      <Sidebar />

      <div className="dashboard-content">

        <div className="dash-header">
          <div>
            <h1 className="dash-title">📬 Messages</h1>
            <p className="dash-sub">
              Contact messages from users
            </p>
          </div>
          <div className="dash-status-row">
            <div className="dash-status-item">
              <span className="status-dot"></span>
              <span>Total: {messages.length}</span>
            </div>
          </div>
        </div>

        {messages.length === 0 ? (
          <div className="no-logs-msg">
            No messages yet.
          </div>
        ) : (
          <div className="messages-list">
            {[...messages].reverse().map((msg) => (
              <div className="message-card" key={msg.id}>
                <div className="msg-header">
                  <div className="msg-avatar">
                    {msg.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="msg-info">
                    <div className="msg-name">{msg.name}</div>
                    <div className="msg-email">{msg.email}</div>
                  </div>
                  <div className="msg-time">
                    {new Date(msg.timestamp).toLocaleString()}
                  </div>
                </div>
               <div className="msg-body">
                {msg.message}
              </div>
              <div style={{textAlign:"right", marginTop:"10px"}}>
                <button
                  className="delete-btn"
                  onClick={() => {
                    axios.delete(
                      `${API_URL}/contact/${msg.id}`
                    ).then(() => fetchMessages());
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

export default Messages;