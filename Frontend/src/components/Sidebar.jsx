import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../services/axiosInstance";

function Sidebar() {

  const [suspiciousDevices, setSuspiciousDevices] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    fetchSuspicious();
    const interval = setInterval(fetchSuspicious, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchSuspicious = async () => {
    try {
      const response = await axios.get("http://localhost:8080/device");
      const suspicious = response.data.filter(
        (d) => d.status === "Suspicious"
      );
      setSuspiciousDevices(suspicious);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="sidebar">

      {/* LOGO + BELL ROW */}
      <div className="sidebar-top">

        <h2 className="logo">SentinelMesh</h2>

        {/* NOTIFICATION BELL */}
        <div
          className="bell-wrapper"
          onClick={() => setShowNotifications(!showNotifications)}
        >
          <span className="bell-icon">🔔</span>
          {suspiciousDevices.length > 0 && (
            <span className="bell-badge">
              {suspiciousDevices.length}
            </span>
          )}
        </div>

      </div>

      {/* NOTIFICATION DROPDOWN */}
      {showNotifications && (
        <div className="notification-dropdown">
          <div className="notif-header">
            <h4 className="notif-title">⚠️ Threat Alerts</h4>
            <span
              className="notif-close"
              onClick={() => setShowNotifications(false)}
            >
              ✕
            </span>
          </div>
          {suspiciousDevices.length === 0 ? (
            <p className="notif-safe">✅ All devices are safe</p>
          ) : (
            suspiciousDevices.map((device) => (
              <div className="notif-item" key={device.id}>
                <span className="notif-dot"></span>
                <div>
                  <p className="notif-name">{device.deviceName}</p>
                  <p className="notif-score">
                    Trust Score: {device.trustScore}%
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      )}

    {/* NAV LINKS */}
      <ul>
        <li><NavLink to="/dashboard">Dashboard</NavLink></li>
        <li><NavLink to="/devices">Devices</NavLink></li>
        <li><NavLink to="/alerts">Threat Alerts</NavLink></li>
        <li><NavLink to="/analytics">Analytics</NavLink></li>
        <li><NavLink to="/logs">Logs</NavLink></li>
        <li><NavLink to="/settings">Settings</NavLink></li>
        <li><NavLink to="/messages">📬 Messages</NavLink></li>
        <li><NavLink to="/ai">AI Analysis</NavLink></li>
        <li><NavLink to="/chat">AI Chat</NavLink></li>
      </ul>

      <div
        className="sidebar-logout"
        onClick={() => {
          localStorage.removeItem("token");
          localStorage.removeItem("isLoggedIn");
          localStorage.removeItem("userEmail");
          window.location.replace("/");
        }}
      >
        🚪 Logout
      </div>

    </div>
  );
}

export default Sidebar;