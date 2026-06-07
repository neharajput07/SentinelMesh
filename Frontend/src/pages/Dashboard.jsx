import "../styles/dashboard.css";

import { useEffect, useState } from "react";

import axios from "../services/axiosInstance";

import Sidebar from "../components/Sidebar";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

import { Doughnut } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

function Dashboard() {

  const [devices, setDevices] = useState([]);
  const [logs, setLogs] = useState([]);

  const [newDevice, setNewDevice] = useState({
    deviceName: "",
    status: "",
    trustScore: ""
  });

  const [editingId, setEditingId] = useState(null);

  useEffect(() => {

    fetchDevices();
    fetchLogs();

    const interval = setInterval(() => {
      fetchDevices();
      fetchLogs();
    }, 5000);

    return () => clearInterval(interval);

  }, []);

  const fetchDevices = async () => {
    try {
      const response = await axios.get("http://localhost:8080/device");
      setDevices(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchLogs = async () => {
    try {
      const response = await axios.get("http://localhost:8080/logs");
      setLogs(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setNewDevice({
      ...newDevice,
      [e.target.name]: e.target.value
    });
  };

  const addDevice = async () => {
    try {
      await axios.post("http://localhost:8080/device", newDevice);
      fetchDevices();
      fetchLogs();
      setNewDevice({ deviceName: "", status: "", trustScore: "" });
    } catch (error) {
      console.error(error);
    }
  };

  const deleteDevice = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/device/${id}`);
      fetchDevices();
      fetchLogs();
    } catch (error) {
      console.error(error);
    }
  };

  const editDevice = (device) => {
    setNewDevice({
      deviceName: device.deviceName,
      status: device.status,
      trustScore: device.trustScore
    });
    setEditingId(device.id);
  };

  const updateDevice = async () => {
    try {
      await axios.put(
        `http://localhost:8080/device/${editingId}`,
        newDevice
      );
      fetchDevices();
      fetchLogs();
      setNewDevice({ deviceName: "", status: "", trustScore: "" });
      setEditingId(null);
    } catch (error) {
      console.error(error);
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setNewDevice({ deviceName: "", status: "", trustScore: "" });
  };

  const getTimelineStatus = (action) => {
    if (action === "Device Added")               return "success";
    if (action === "Device Updated")             return "info";
    if (action === "Device Deleted")             return "danger";
    if (action === "Suspicious Device Detected") return "warning";
    return "info";
  };

  const totalDevices = devices.length;

  const threatAlerts = devices.filter(
    (d) => d.status === "Suspicious"
  ).length;

  const safeDevices = devices.filter(
    (d) => d.status === "Safe"
  ).length;

  const highRisk = devices.filter(
    (d) => Number(d.trustScore) < 40
  ).length;

  const mediumRisk = devices.filter(
    (d) => Number(d.trustScore) >= 40 && Number(d.trustScore) < 70
  ).length;

  const lowRisk = devices.filter(
    (d) => Number(d.trustScore) >= 70
  ).length;

  const chartData = {
    labels: ["Safe Devices", "Suspicious Devices"],
    datasets: [{
      data: [safeDevices, threatAlerts],
      backgroundColor: ["#00ff88", "#ff4d4d"],
      borderColor:     ["#00ff88", "#ff4d4d"],
      borderWidth: 2
    }]
  };

  return (

    <div className="main-container">

      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN CONTENT */}
      <div className="dashboard-content">

      {/* COMPACT HEADER */}
        <div className="dash-header">
          <div>
            <h1 className="dash-title">Security Dashboard</h1>
            <p className="dash-sub">
              Real-time IoT threat monitoring
            </p>
          </div>
          <div className="dash-status-row">
            <div className="dash-status-item">
              <span className="status-dot"></span>
              <span>System Active</span>
            </div>
            <div className="dash-status-item">
              <span className="status-dot warning-dot"></span>
              <span>Threat Monitoring On</span>
            </div>
          </div>
        </div>

        {/* OVERVIEW CARDS */}
        <div className="dashboard-overview">
          <div className="overview-card">
            <h3>Total Devices</h3>
            <p>{totalDevices}</p>
          </div>
          <div className="overview-card">
            <h3>Threat Alerts</h3>
            <p>{threatAlerts}</p>
          </div>
          <div className="overview-card">
            <h3>Safe Devices</h3>
            <p>{safeDevices}</p>
          </div>
          <div className="overview-card">
            <h3>Avg Trust Score</h3>
            <p>
              {totalDevices > 0
                ? Math.round(
                    devices.reduce(
                      (sum, d) => sum + Number(d.trustScore), 0
                    ) / totalDevices
                  )
                : 0}%
            </p>
          </div>
        </div>

     {/* THREAT DISTRIBUTION */}
        <div className="threat-overview">
          <h2>Threat Distribution</h2>

          <div className="threat-row">
            <span className="threat-indicator low"></span>
            <p>Low Risk</p>
            <span className="threat-devices">
              {devices
                .filter(d => Number(d.trustScore) >= 70)
                .map(d => d.deviceName)
                .join(", ") || "None"}
            </span>
            <strong>{lowRisk}</strong>
          </div>

          <div className="threat-row">
            <span className="threat-indicator medium"></span>
            <p>Medium Risk</p>
            <span className="threat-devices">
              {devices
                .filter(d => Number(d.trustScore) >= 40 && Number(d.trustScore) < 70)
                .map(d => d.deviceName)
                .join(", ") || "None"}
            </span>
            <strong>{mediumRisk}</strong>
          </div>

          <div className="threat-row">
            <span className="threat-indicator high"></span>
            <p>High Risk</p>
            <span className="threat-devices">
              {devices
                .filter(d => Number(d.trustScore) < 40)
                .map(d => d.deviceName)
                .join(", ") || "None"}
            </span>
            <strong>{highRisk}</strong>
          </div>

        </div>

      {/* BOTTOM ROW */}
        <div className="dash-bottom-row">

          {/* DEVICE PREVIEW */}
          <div className="dash-device-preview">
            <h2>Device Status</h2>
            {devices.slice(0, 5).map((device) => (
              <div className="dash-device-item" key={device.id}>
                <span className={`dash-device-dot ${device.status === "Safe" ? "dot-safe" : "dot-danger"}`}></span>
                <span className="dash-device-name">{device.deviceName}</span>
                <span className="dash-device-score">{device.trustScore}%</span>
                <span className={`dash-device-badge ${device.status === "Safe" ? "badge-safe" : "badge-danger"}`}>
                  {device.status}
                </span>
              </div>
            ))}
          </div>

          {/* AI SUMMARY */}
          <div className="dash-ai-summary">
            <h2>🤖 AI Threat Summary</h2>
            <div className="dash-ai-item">
              <span className="dash-ai-label">Critical Devices</span>
              <span className="dash-ai-val danger-val">
                {devices.filter(d => d.trustScore < 20).length}
              </span>
            </div>
            <div className="dash-ai-item">
              <span className="dash-ai-label">High Risk Devices</span>
              <span className="dash-ai-val warning-val">
                {devices.filter(d => d.trustScore >= 20 && d.trustScore < 40).length}
              </span>
            </div>
            <div className="dash-ai-item">
              <span className="dash-ai-label">Safe Devices</span>
              <span className="dash-ai-val safe-val">
                {devices.filter(d => d.trustScore >= 70).length}
              </span>
            </div>
            <div className="dash-ai-item">
              <span className="dash-ai-label">Network Health</span>
              <span className="dash-ai-val safe-val">
                {totalDevices > 0 ? Math.round((safeDevices / totalDevices) * 100) : 0}%
              </span>
            </div>
          </div>

        </div>

      </div>

      {/* LIVE ACTIVITY TIMELINE */}
      <div className="activity-timeline">

        <h2>Recent Security Events</h2>

        {logs.length === 0 ? (

          <p className="no-logs-msg">
            No recent activity found.
          </p>

        ) : (

          [...logs].reverse().slice(0, 5).map((log) => (

            <div className="timeline-item" key={log.id}>

              <span className="timeline-time">
                {new Date(log.timestamp).toLocaleTimeString(
                  [], { hour: "2-digit", minute: "2-digit" }
                )}
              </span>

              <span className={`timeline-status ${getTimelineStatus(log.action)}`}>
              </span>

              <p>{log.action} — {log.deviceName}</p>

            </div>

          ))

        )}

      </div>

    </div>

  );
}

export default Dashboard;