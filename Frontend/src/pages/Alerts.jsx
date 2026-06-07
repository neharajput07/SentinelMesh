import "../styles/alerts.css";

import { useEffect, useState } from "react";
import axios from "../services/axiosInstance";

import Sidebar from "../components/Sidebar";

function Alerts() {

  const [devices, setDevices] = useState([]);

  useEffect(() => {

    fetchDevices();

    const interval = setInterval(() => {
      fetchDevices();
    }, 5000);

    return () => clearInterval(interval);

  }, []);

  const fetchDevices = async () => {

    try {

      const response = await axios.get(
        "http://localhost:8080/device"
      );

      const suspiciousDevices = response.data.filter(
        (device) => device.status === "Suspicious"
      );

      setDevices(suspiciousDevices);

    } catch (error) {
      console.error(error);
    }

  };

  return (

    <div className="main-container">

      {/* SIDEBAR */}
      <Sidebar />

      {/* CONTENT */}
      <div className="dashboard-content">

        <h1 className="title">
          Threat Monitoring Center
        </h1>

        <div className="alerts-wrapper">

          {devices.length === 0 ? (

            <div className="safe-alert-box">
              <h2>✅ No Threats Detected</h2>
              <p>All devices are secure.</p>
            </div>

          ) : (

            devices.map((device) => (

              <div className="alert-card" key={device.id}>

                <h2>🚨 Suspicious Device</h2>

                <p>Device: {device.deviceName}</p>

                <p>Status: {device.status}</p>

                <p>Trust Score: {device.trustScore}</p>

              </div>

            ))

          )}

        </div>

      </div>

    </div>

  );

}

export default Alerts;