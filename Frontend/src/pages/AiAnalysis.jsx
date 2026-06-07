import { useEffect, useState } from "react";
import axios from "../services/axiosInstance";
import Sidebar from "../components/Sidebar";
import "../styles/dashboard.css";

function AiAnalysis() {

  const [analyses, setAnalyses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalysis();
    const interval = setInterval(fetchAnalysis, 10000);
    return () => clearInterval(interval);
  }, []);

  const fetchAnalysis = async () => {
    try {
      const response = await axios.get("/ai/analyze");
      setAnalyses(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const getRiskColor = (riskLevel) => {
    if (riskLevel === "CRITICAL") return "#ff4d4d";
    if (riskLevel === "HIGH") return "#ff9900";
    if (riskLevel === "MEDIUM") return "#facc15";
    return "#00ff88";
  };

  const getRiskBackground = (riskLevel) => {
    if (riskLevel === "CRITICAL") return "rgba(255,77,77,0.08)";
    if (riskLevel === "HIGH") return "rgba(255,153,0,0.08)";
    if (riskLevel === "MEDIUM") return "rgba(250,204,21,0.08)";
    return "rgba(0,255,136,0.08)";
  };

  const getRiskIcon = (riskLevel) => {
    if (riskLevel === "CRITICAL") return "🔴";
    if (riskLevel === "HIGH") return "🟠";
    if (riskLevel === "MEDIUM") return "🟡";
    return "🟢";
  };

  return (
    <div className="main-container">

      <Sidebar />

      <div className="dashboard-content">

        {/* HEADER */}
        <div className="ai-header">
          <h1 className="title">
            🤖 SentinelMesh AI
          </h1>
          <p className="ai-subtitle">
            Real-time threat analysis powered by
            SentinelMesh AI Engine
          </p>
          <div className="ai-badge">
            <span className="ai-live-dot"></span>
            AI Engine Active
          </div>
        </div>

        {/* SUMMARY ROW */}
        <div className="dashboard-overview">
          <div className="overview-card">
            <h3>Total Analyzed</h3>
            <p>{analyses.length}</p>
          </div>
          <div className="overview-card">
            <h3>Critical Threats</h3>
            <p style={{ color: "#ff4d4d" }}>
              {analyses.filter(
                a => a.riskLevel === "CRITICAL"
              ).length}
            </p>
          </div>
          <div className="overview-card">
            <h3>High Risk</h3>
            <p style={{ color: "#ff9900" }}>
              {analyses.filter(
                a => a.riskLevel === "HIGH"
              ).length}
            </p>
          </div>
          <div className="overview-card">
            <h3>Safe Devices</h3>
            <p style={{ color: "#00ff88" }}>
              {analyses.filter(
                a => a.riskLevel === "LOW"
              ).length}
            </p>
          </div>
        </div>

        {/* AI ANALYSIS CARDS */}
        {loading ? (
          <div className="ai-loading">
            <p>🤖 SentinelMesh AI is analyzing devices...</p>
          </div>
        ) : (
          <div className="ai-cards-container">
            {analyses.map((analysis, index) => (
              <div
                key={index}
                className="ai-card"
                style={{
                  background: getRiskBackground(
                    analysis.riskLevel
                  ),
                  borderColor: getRiskColor(
                    analysis.riskLevel
                  )
                }}
              >
                {/* CARD HEADER */}
                <div className="ai-card-header">
                  <div>
                    <h2 className="ai-device-name">
                      {getRiskIcon(analysis.riskLevel)}{" "}
                      {analysis.deviceName}
                    </h2>
                    <span
                      className="ai-risk-badge"
                      style={{
                        background: getRiskColor(
                          analysis.riskLevel
                        ) + "22",
                        color: getRiskColor(
                          analysis.riskLevel
                        ),
                        border: `1px solid ${getRiskColor(
                          analysis.riskLevel
                        )}`
                      }}
                    >
                      {analysis.riskLevel} RISK
                    </span>
                  </div>

                  {/* RISK SCORE CIRCLE */}
                  <div
                    className="ai-risk-score"
                    style={{
                      borderColor: getRiskColor(
                        analysis.riskLevel
                      ),
                      color: getRiskColor(
                        analysis.riskLevel
                      )
                    }}
                  >
                    <span className="ai-score-number">
                      {analysis.riskScore}%
                    </span>
                    <span className="ai-score-label">
                      Risk
                    </span>
                  </div>
                </div>

                {/* AI REPORT */}
                <div className="ai-report-box">
                  <p className="ai-report-text">
                    🤖 {analysis.aiReport}
                  </p>
                </div>

                {/* DETAILS ROW */}
                <div className="ai-details">

                  <div className="ai-detail-item">
                    <span className="ai-detail-label">
                      Trust Score
                    </span>
                    <span className="ai-detail-value">
                      {analysis.trustScore}/100
                    </span>
                  </div>

                  <div className="ai-detail-item">
                    <span className="ai-detail-label">
                      Anomaly Pattern
                    </span>
                    <span className="ai-detail-value">
                      {analysis.anomalyPattern}
                    </span>
                  </div>

                  <div className="ai-detail-item">
                    <span className="ai-detail-label">
                      Breach Prediction
                    </span>
                    <span
                      className="ai-detail-value"
                      style={{
                        color: getRiskColor(
                          analysis.riskLevel
                        )
                      }}
                    >
                      ⏱️ {analysis.breachPrediction}
                    </span>
                  </div>

                  <div className="ai-detail-item">
                    <span className="ai-detail-label">
                      Recommendation
                    </span>
                    <span className="ai-detail-value">
                      ✅ {analysis.recommendation}
                    </span>
                  </div>

                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

export default AiAnalysis;