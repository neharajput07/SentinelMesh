import "../styles/dashboard.css";

import { useEffect, useState } from "react";
import axios from "../services/axiosInstance";
import API_URL from "../config/api";

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

function Analytics() {

  const [devices, setDevices] = useState([]);

  useEffect(() => {
    fetchDevices();
  }, []);

  const fetchDevices = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/device`
      );
      setDevices(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const totalDevices = devices.length;

  const safeDevices = devices.filter(
    (device) => device.status === "Safe"
  ).length;

  const threatAlerts = devices.filter(
    (device) => device.status === "Suspicious"
  ).length;

  const safePercentage = totalDevices
    ? Math.round((safeDevices / totalDevices) * 100)
    : 0;

  const threatPercentage = totalDevices
    ? Math.round((threatAlerts / totalDevices) * 100)
    : 0;

  const chartData = {
    labels: ["Safe Devices", "Suspicious Devices"],
    datasets: [
      {
        data: [safeDevices, threatAlerts],
        backgroundColor: ["#00ff88", "#ff4d4d"],
        borderColor: ["#00ff88", "#ff4d4d"],
        borderWidth: 2
      }
    ]
  };

  return (

    <div className="main-container">

      {/* SIDEBAR */}
      <Sidebar />

      <div className="dashboard-content">

        <div className="dash-header">
          <div>
            <h1 className="dash-title">Analytics Dashboard</h1>
            <p className="dash-sub">
              Device performance and threat analysis
            </p>
          </div>
        </div>

     <div className="analytics-section">

          <h2 className="analytics-title">
            Network Analytics
          </h2>

          <div className="analytics-container">

            <div className="analytics-card safe-card">
              <h3>Safe Devices</h3>
              <p>{safeDevices}</p>
            </div>

            <div className="analytics-card danger-card">
              <h3>Suspicious Devices</h3>
              <p>{threatAlerts}</p>
            </div>

            <div className="analytics-card" style={{
              background: "rgba(56,189,248,0.08)",
              border: "1px solid #38bdf8",
              boxShadow: "0 0 20px rgba(56,189,248,0.2)"
            }}>
              <h3 style={{color:"#38bdf8"}}>
                Network Health
              </h3>
              <p style={{color:"#38bdf8"}}>
                {totalDevices > 0
                  ? Math.round((safeDevices / totalDevices) * 100)
                  : 0}%
              </p>
            </div>

            <div className="analytics-card" style={{
              background: "rgba(250,204,21,0.08)",
              border: "1px solid #facc15",
              boxShadow: "0 0 20px rgba(250,204,21,0.2)"
            }}>
              <h3 style={{color:"#facc15"}}>
                Avg Trust Score
              </h3>
              <p style={{color:"#facc15"}}>
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

        </div>

        {/* DEVICE BREAKDOWN TABLE */}
        <div className="analytics-breakdown">
          <h2 className="analytics-title">
            Device Breakdown
          </h2>
          <table className="analytics-table">
            <thead>
              <tr>
                <th>Device Name</th>
                <th>Trust Score</th>
                <th>Status</th>
                <th>Risk Level</th>
              </tr>
            </thead>
            <tbody>
              {devices.map((device) => (
                <tr key={device.id}>
                  <td>{device.deviceName}</td>
                  <td>
                    <div className="trust-bar-wrap">
                      <div
                        className="trust-bar-fill"
                        style={{
                          width: `${device.trustScore}%`,
                          background: device.trustScore >= 70
                            ? "#00ff88"
                            : device.trustScore >= 40
                            ? "#facc15"
                            : "#ff4d4d"
                        }}
                      ></div>
                      <span>{device.trustScore}%</span>
                    </div>
                  </td>
                  <td>
                    <span className={
                      device.status === "Safe" ? "online" : "warning"
                    }>
                      {device.status}
                    </span>
                  </td>
                  <td style={{color:
                    device.trustScore < 40 ? "#ff4d4d" :
                    device.trustScore < 70 ? "#facc15" : "#00ff88"
                  }}>
                    {device.trustScore < 40 ? "High Risk" :
                     device.trustScore < 70 ? "Medium Risk" : "Low Risk"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="chart-section">

          <h2 className="chart-title">
            Device Distribution
          </h2>

          <div className="chart-container">
            <Doughnut
              data={chartData}
              options={{
                responsive: true,
                maintainAspectRatio: false
              }}
            />
          </div>

        </div>

        <div className="threat-monitor">

          <h2 className="monitor-title">
            System Threat Monitor
          </h2>

          <div className="progress-box">
            <div className="progress-header">
              <span>Safe Device Ratio</span>
              <span>{safePercentage}%</span>
            </div>
            <div className="progress-bar">
              <div
                className="progress-fill safe-fill"
                style={{ width: `${safePercentage}%` }}
              ></div>
            </div>
          </div>

          <div className="progress-box">
            <div className="progress-header">
              <span>Threat Level</span>
              <span>{threatPercentage}%</span>
            </div>
            <div className="progress-bar">
              <div
                className="progress-fill threat-fill"
                style={{ width: `${threatPercentage}%` }}
              ></div>
            </div>
          </div>

        </div>

      </div>

    </div>

  );
}

export default Analytics;