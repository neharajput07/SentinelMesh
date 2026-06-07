import "../styles/dashboard.css";
import Sidebar from "../components/Sidebar";

function Settings() {

  const userEmail =
    localStorage.getItem("userEmail");

  const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("userEmail");
  window.location.replace("/");
};

  return (

    <div className="main-container">

      {/* SIDEBAR */}
      <Sidebar />

      {/* CONTENT */}
      <div className="dashboard-content">

        <h1 className="title">Settings</h1>

        {/* ACCOUNT SETTINGS */}
        <div className="threat-overview"
          style={{ marginBottom: "25px" }}>

          <h2>Account Settings</h2>

          <div className="threat-row">
            <p>Logged in as</p>
            <strong style={{ color: "#38bdf8" }}>
              {userEmail}
            </strong>
          </div>

          <div className="threat-row">
            <p>Role</p>
            <strong style={{ color: "#00ff88" }}>
              Administrator
            </strong>
          </div>

          <div className="threat-row">
            <p>Session</p>
            <strong style={{ color: "#00ff88" }}>
              Active
            </strong>
          </div>

          <div className="threat-row">
            <p>Logout</p>
            <button
              className="delete-btn"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>

        </div>

        {/* NOTIFICATION SETTINGS */}
        <div className="threat-overview"
          style={{ marginBottom: "25px" }}>

          <h2>Notification Settings</h2>

          <div className="threat-row">
            <p>Threat Alerts</p>
            <span style={{
              background: "rgba(0,255,136,0.1)",
              color: "#00ff88",
              padding: "6px 16px",
              borderRadius: "20px",
              border: "1px solid #00ff88",
              fontWeight: "bold"
            }}>
              Enabled
            </span>
          </div>

          <div className="threat-row">
            <p>Device Added Alerts</p>
            <span style={{
              background: "rgba(0,255,136,0.1)",
              color: "#00ff88",
              padding: "6px 16px",
              borderRadius: "20px",
              border: "1px solid #00ff88",
              fontWeight: "bold"
            }}>
              Enabled
            </span>
          </div>

          <div className="threat-row">
            <p>System Monitoring</p>
            <span style={{
              background: "rgba(0,255,136,0.1)",
              color: "#00ff88",
              padding: "6px 16px",
              borderRadius: "20px",
              border: "1px solid #00ff88",
              fontWeight: "bold"
            }}>
              Active
            </span>
          </div>

        </div>

        {/* SYSTEM INFO */}
        <div className="threat-overview">

          <h2>System Information</h2>

          <div className="threat-row">
            <p>Platform</p>
            <strong style={{ color: "#38bdf8" }}>
              SentinelMesh v1.0
            </strong>
          </div>

          <div className="threat-row">
            <p>Backend</p>
            <strong style={{ color: "#38bdf8" }}>
              Spring Boot
            </strong>
          </div>

          <div className="threat-row">
            <p>Frontend</p>
            <strong style={{ color: "#38bdf8" }}>
              React + Vite
            </strong>
          </div>

          <div className="threat-row">
            <p>Database</p>
            <strong style={{ color: "#38bdf8" }}>
              MySQL
            </strong>
          </div>

          <div className="threat-row">
            <p>Security</p>
            <strong style={{ color: "#38bdf8" }}>
              JWT + Spring Security
            </strong>
          </div>

          <div className="threat-row">
            <p>Status</p>
            <span style={{
              background: "rgba(0,255,136,0.1)",
              color: "#00ff88",
              padding: "6px 16px",
              borderRadius: "20px",
              border: "1px solid #00ff88",
              fontWeight: "bold"
            }}>
              All Systems Operational
            </span>
          </div>

        </div>

      </div>

    </div>

  );
}

export default Settings;