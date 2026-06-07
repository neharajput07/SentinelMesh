import { useEffect, useState } from "react";
import axios from "../services/axiosInstance";
import "../styles/logs.css";
import Sidebar from "../components/Sidebar";

function Logs() {

  const [logs, setLogs] = useState([]);

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/logs"
      );
      setLogs(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getActionColor = (action) => {
    if (action === "Device Added") return "log-added";
    if (action === "Device Updated") return "log-updated";
    if (action === "Device Deleted") return "log-deleted";
    if (action === "Suspicious Device Detected") return "log-suspicious";
    return "log-default";
  };

  const getActionIcon = (action) => {
    if (action === "Device Added") return "✅";
    if (action === "Device Updated") return "✏️";
    if (action === "Device Deleted") return "🗑️";
    if (action === "Suspicious Device Detected") return "⚠️";
    return "📋";
  };

  return (
    <div className="main-container">

      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN CONTENT */}
      <div className="logs-content">

        <div className="logs-header">
          <h1 className="logs-title">Activity Logs</h1>
          <p className="logs-subtitle">
            Complete history of all device operations
          </p>
          <div className="logs-count">
            Total Logs: <strong>{logs.length}</strong>
          </div>
        </div>

        {/* LOGS TABLE */}
        {logs.length === 0 ? (
          <div className="no-logs">
            <p>No activity logs found.</p>
            <p>Logs will appear here when devices are added, updated, or deleted.</p>
          </div>
        ) : (
          <div className="logs-table-container">
            <table className="logs-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Action</th>
                  <th>Device</th>
                  <th>Timestamp</th>
                </tr>
              </thead>
              <tbody>
                {[...logs].reverse().map((log, index) => (
                  <tr key={log.id}>
                    <td>{index + 1}</td>
                    <td>
                      <span className={`log-badge ${getActionColor(log.action)}`}>
                        {getActionIcon(log.action)} {log.action}
                      </span>
                    </td>
                    <td>{log.deviceName}</td>
                    <td>{log.timestamp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>
    </div>
  );
}

export default Logs;