import "../styles/dashboard.css";

import { useEffect, useState } from "react";
import axios from "../services/axiosInstance";
import API_URL from "../config/api";

import Sidebar from "../components/Sidebar";

function Devices() {

  const [devices, setDevices] = useState([]);
  const [newDevice, setNewDevice] = useState({
    deviceName: "",
    status: "",
    trustScore: ""
  });

  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

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

  const handleChange = (e) => {
    setNewDevice({
      ...newDevice,
      [e.target.name]: e.target.value
    });
  };

  const addDevice = async () => {
    try {
      await axios.post(
        `${API_URL}/device`,
        newDevice
      );
      fetchDevices();
      setNewDevice({ deviceName: "", status: "", trustScore: "" });
    } catch (error) {
      console.error(error);
    }
  };

  const deleteDevice = async (id) => {
    try {
      await axios.delete(
        `${API_URL}/device/${id}`
      );
      fetchDevices();
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
        `${API_URL}/device/${editingId}`,
        newDevice
      );
      fetchDevices();
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

  const filteredDevices = devices.filter((device) => {
    const matchesSearch = device.deviceName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterStatus === "All" ? true : device.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (

    <div className="main-container">

      {/* SIDEBAR */}
      <Sidebar />

      <div className="dashboard-content">

        <h1 className="title">Devices Management</h1>

        {/* ADD / EDIT FORM */}
        <div className="add-device-section">

          <h2>{editingId ? "Update Device" : "Add New Device"}</h2>

          <div className="form-container">

            <input
              type="text"
              name="deviceName"
              placeholder="Device Name"
              value={newDevice.deviceName}
              onChange={handleChange}
            />

            <input
              type="number"
              name="trustScore"
              placeholder="Trust Score"
              value={newDevice.trustScore}
              onChange={handleChange}
            />

            {editingId ? (
              <div className="button-group">
                <button onClick={updateDevice}>
                  Update Device
                </button>
                <button className="cancel-btn" onClick={cancelEdit}>
                  Cancel
                </button>
              </div>
            ) : (
              <button onClick={addDevice}>
                Add Device
              </button>
            )}

          </div>

        </div>

        {/* SEARCH & FILTER */}
        <div className="filter-section">

          <input
            type="text"
            placeholder="Search Device..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="All">All Devices</option>
            <option value="Safe">Safe</option>
            <option value="Suspicious">Suspicious</option>
          </select>

        </div>

        {/* DEVICE TABLE */}
        <div className="device-section">

          <h2 className="device-title">Connected Devices</h2>

          <table className="device-table">

            <thead>
              <tr>
                <th>Device Name</th>
                <th>Status</th>
                <th>Trust Score</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredDevices.map((device) => (
                <tr key={device.id}>

                  <td>{device.deviceName}</td>

                  <td>
                    <span className={
                      device.status === "Safe" ? "online" : "warning"
                    }>
                      {device.status}
                    </span>
                  </td>

                  <td>{device.trustScore}%</td>

                  <td>
                    <button
                      className="edit-btn"
                      onClick={() => editDevice(device)}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => deleteDevice(device.id)}
                    >
                      Delete
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>

          </table>

        </div>

      </div>

    </div>

  );
}

export default Devices;