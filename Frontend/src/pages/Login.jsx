import "../styles/login.css";
import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import API_URL from "../config/api";

function Login() {
  const navigate = useNavigate();
  const canvasRef = useRef(null);
  const networkRef = useRef(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [activePage, setActivePage] = useState("home");
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMsg, setContactMsg] = useState("");
  const [contactLoading, setContactLoading] = useState(false);
  const [contactSuccess, setContactSuccess] = useState("");
  const [contactError, setContactError] = useState("");
  const [activeTab, setActiveTab] = useState("login");
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupError, setSignupError] = useState("");
  const [signupSuccess, setSignupSuccess] = useState("");
  const [signupLoading, setSignupLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (message, type) => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animId;
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);
    const cols = Math.floor(canvas.width / 20);
    const drops = Array(cols).fill(1);
    const chars = "SENTINELMESH01アイウエオABCDEF0123456789";
    const draw = () => {
      ctx.fillStyle = "rgba(0,0,0,0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const isHead = drops[i] * 20 < canvas.height * 0.12;
        ctx.font = "14px monospace";
        ctx.fillStyle = isHead ? "#00ff9d" : "rgba(0,180,90,0.45)";
        ctx.shadowBlur = isHead ? 8 : 0;
        ctx.shadowColor = "#00ff9d";
        ctx.fillText(char, i * 20, drops[i] * 20);
        ctx.shadowBlur = 0;
        if (drops[i] * 20 > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);
  useEffect(() => {
    const canvas = networkRef.current;
    const ctx = canvas.getContext("2d");
    let animId;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const nodes = [
      { x: 0.5, y: 0.2, label: "Router-01", safe: true },
      { x: 0.2, y: 0.4, label: "Camera-01", safe: true },
      { x: 0.8, y: 0.35, label: "SmartTV-01", safe: true },
      { x: 0.35, y: 0.65, label: "Sensor-01", safe: false },
      { x: 0.7, y: 0.7, label: "Unknown-01", safe: false },
      { x: 0.5, y: 0.5, label: "Gateway", safe: true },
    ];

    const connections = [
      [0, 5], [1, 5], [2, 5],
      [3, 5], [4, 5], [1, 3],
      [2, 4], [0, 2]
    ];

    let tick = 0;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      tick += 0.02;

      const W = canvas.width;
      const H = canvas.height;

      // Draw connections
      connections.forEach(([a, b]) => {
        const na = nodes[a];
        const nb = nodes[b];
        const isThreat = !na.safe || !nb.safe;
        ctx.beginPath();
        ctx.moveTo(na.x * W, na.y * H);
        ctx.lineTo(nb.x * W, nb.y * H);
        ctx.strokeStyle = isThreat
          ? "rgba(255,77,77,0.2)"
          : "rgba(0,255,157,0.15)";
        ctx.lineWidth = 1;
        ctx.stroke();

        // Animated packet dot
        const t = (Math.sin(tick + a + b) + 1) / 2;
        const px = na.x * W + (nb.x * W - na.x * W) * t;
        const py = na.y * H + (nb.y * H - na.y * H) * t;
        ctx.beginPath();
        ctx.arc(px, py, 3, 0, Math.PI * 2);
        ctx.fillStyle = isThreat ? "#ff4d4d" : "#00ff9d";
        ctx.shadowBlur = 8;
        ctx.shadowColor = isThreat ? "#ff4d4d" : "#00ff9d";
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Draw nodes
      nodes.forEach((node, i) => {
        const x = node.x * W;
        const y = node.y * H;
        const pulse = Math.sin(tick * 2 + i) * 4;
        const color = node.safe ? "#00ff9d" : "#ff4d4d";

        // Outer glow ring
        ctx.beginPath();
        ctx.arc(x, y, 18 + pulse, 0, Math.PI * 2);
        ctx.strokeStyle = node.safe
          ? "rgba(0,255,157,0.15)"
          : "rgba(255,77,77,0.15)";
        ctx.lineWidth = 1;
        ctx.stroke();

        // Inner circle
        ctx.beginPath();
        ctx.arc(x, y, 10, 0, Math.PI * 2);
        ctx.fillStyle = node.safe
          ? "rgba(0,255,157,0.15)"
          : "rgba(255,77,77,0.15)";
        ctx.fill();

        // Center dot
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.shadowBlur = 12;
        ctx.shadowColor = color;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Label
        ctx.font = "11px monospace";
        ctx.fillStyle = node.safe
          ? "rgba(0,255,157,0.7)"
          : "rgba(255,77,77,0.7)";
        ctx.fillText(node.label, x - 25, y + 26);
      });

      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => cancelAnimationFrame(animId);
  }, []);

  const handleContact = async () => {
    if (!contactName || !contactEmail || !contactMsg) {
      setContactError("Please fill all fields");
      return;
    }
    try {
      setContactLoading(true);
      setContactError("");
      await axios.post(`${API_URL}/contact`, {
        name: contactName,
        email: contactEmail,
        message: contactMsg
      });
      setContactSuccess("Message sent successfully!");
      setContactName("");
      setContactEmail("");
      setContactMsg("");
      setTimeout(() => setContactSuccess(""), 3000);
    } catch (err) {
      setContactError("Failed to send. Please try again.");
    } finally {
      setContactLoading(false);
    }
  };
  const handleLogin = async () => {
    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }
    try {
      setLoading(true);
      setError("");
      const response = await axios.post(
        `${API_URL}/login`,
        { email, password }
      );
      const { token, email: userEmail } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userEmail", userEmail);
      showToast("Login successful! Welcome back.", "success");
      navigate("/dashboard");
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data);
      } else {
        setError("Server Error. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async () => {
    if (!signupEmail || !signupPassword) {
      setSignupError("Please fill all fields");
      return;
    }
    try {
      setSignupLoading(true);
      setSignupError("");
      await axios.post(
        `${API_URL}/signup`,
        { email: signupEmail, password: signupPassword }
      );
      setSignupSuccess("Account created! You can now login.");
      showToast("Account created! You can now login.", "success");
      setSignupName("");
      setSignupEmail("");
      setSignupPassword("");
      setTimeout(() => setActiveTab("login"), 2000);
    } catch (err) {
      if (err.response && err.response.data) {
        setSignupError(err.response.data);
      } else {
        setSignupError("Server Error. Please try again.");
      }
    } finally {
      setSignupLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      activeTab === "login" ? handleLogin() : handleSignup();
    }
  };

  const closeModal = (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      setShowModal(false);
      setError("");
      setSignupError("");
      setSignupSuccess("");
    }
  };

  return (
    <div className="lp-root">

      <canvas ref={canvasRef} className="lp-canvas" suppressHydrationWarning={true} />
      <div className="lp-scanline" />
      <div className="lp-corner lp-c1" />
      <div className="lp-corner lp-c2" />
      <div className="lp-corner lp-c3" />
      <div className="lp-corner lp-c4" />

      {/* TOP NAV */}
      <div className="lp-nav">
        <div className="lp-nav-brand">
          <svg width="72" height="72" viewBox="0 0 100 100">
            <path
              d="M50 50 C30 25, 5 25, 5 50 C5 75, 30 75, 50 50 C70 25, 95 25, 95 50 C95 75, 70 75, 50 50"
              stroke="url(#ig)"
              strokeWidth="10"
              fill="none"
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id="ig" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#00ff9d" />
                <stop offset="100%" stopColor="#38bdf8" />
              </linearGradient>
            </defs>
          </svg>
          <div className="lp-brand-text">
            <span className="lp-brand-s">Sentinel</span>
            <span className="lp-brand-m">Mesh</span>
          </div>
        </div>
<div className="lp-nav-links">
  <span className={`lp-nav-link ${activePage === "home" ? "lp-nav-active" : ""}`} onClick={() => setActivePage("home")}>Home</span>
  <span className={`lp-nav-link ${activePage === "features" ? "lp-nav-active" : ""}`} onClick={() => setActivePage("features")}>Features</span>
  <span className={`lp-nav-link ${activePage === "solutions" ? "lp-nav-active" : ""}`} onClick={() => setActivePage("solutions")}>Solutions</span>
  <span className={`lp-nav-link ${activePage === "about" ? "lp-nav-active" : ""}`} onClick={() => setActivePage("about")}>About</span>
  <span className={`lp-nav-link ${activePage === "contact" ? "lp-nav-active" : ""}`} onClick={() => setActivePage("contact")}>Contact</span>
</div>

        <button
          className="lp-access-btn"
          onClick={() => setShowModal(true)}
        >
          <span className="lp-access-icon">🔐</span>
          Access Portal
        </button>
      </div>

     {/* MAIN CONTENT */}
      <div className="lp-main">
        <div className="lp-left">

          {/* HOME PAGE */}
          {activePage === "home" && (
            <>
              <div className="lp-tagline-chip">
                <span className="lp-chip-dot"></span>
                IoT Security Intelligence Platform
              </div>

              <h1 className="lp-headline">
                <span className="lp-h-white">Next-Generation</span>
                <br />
                <span className="lp-h-green">AI Threat Defense</span>
                <br />
                <span className="lp-h-white">For IoT Networks</span>
              </h1>

              <p className="lp-desc">
                Real-time threat detection, AI-powered anomaly analysis,
                and predictive breach intelligence — all in one unified
                security platform built for modern IoT infrastructure.
              </p>

              <div className="lp-cta-row">
                <button className="lp-cta-primary" onClick={() => setShowModal(true)}>
                  Get Started →
                </button>
                <button className="lp-cta-secondary" onClick={() => setActivePage("features")}>
                  View Features
                </button>
              </div>

              <div className="lp-metrics">
                <div className="lp-metric">
                  <div className="lp-metric-num">1500+</div>
                  <div className="lp-metric-label">Devices Monitored</div>
                </div>
                <div className="lp-metric">
                  <div className="lp-metric-num">99.2%</div>
                  <div className="lp-metric-label">Threat Detection Accuracy</div>
                </div>
                <div className="lp-metric">
                  <div className="lp-metric-num">24/7</div>
                  <div className="lp-metric-label">Monitoring</div>
                </div>
                <div className="lp-metric">
                  <div className="lp-metric-num">120+</div>
                  <div className="lp-metric-label">Alerts Resolved</div>
                </div>
              </div>
            </>
          )}

          {/* FEATURES PAGE */}
          {activePage === "features" && (
            <>
              <h1 className="lp-headline" style={{fontSize:"42px"}}>
                <span className="lp-h-white">Platform</span>
                <br />
                <span className="lp-h-green">Features</span>
              </h1>
              <p className="lp-desc">Everything you need to secure your IoT infrastructure</p>
              <div className="lp-features-grid">
                <div className="lp-feature-card">
                  <div className="lp-fc-icon lp-fc-green">🤖</div>
                  <h3>SentinelMesh AI Engine</h3>
                  <p>Custom AI analyzes device behavior and predicts threats before they happen.</p>
                </div>
                <div className="lp-feature-card">
                  <div className="lp-fc-icon lp-fc-blue">🔐</div>
                  <h3>JWT Authentication</h3>
                  <p>Industry-standard JWT secured APIs with Spring Security.</p>
                </div>
                <div className="lp-feature-card">
                  <div className="lp-fc-icon lp-fc-yellow">⚡</div>
                  <h3>Real-Time Alerts</h3>
                  <p>Instant notifications when suspicious devices are detected.</p>
                </div>
                <div className="lp-feature-card">
                  <div className="lp-fc-icon lp-fc-red">🛡️</div>
                  <h3>Breach Prediction</h3>
                  <p>Estimates device compromise probability and time to breach.</p>
                </div>
                <div className="lp-feature-card">
                  <div className="lp-fc-icon lp-fc-purple">📊</div>
                  <h3>Analytics Dashboard</h3>
                  <p>Comprehensive visualization of device health and threats.</p>
                </div>
                <div className="lp-feature-card">
                  <div className="lp-fc-icon lp-fc-teal">💬</div>
                  <h3>AI Security Chatbot</h3>
                  <p>Natural language interface to query your network security status.</p>
                </div>
              </div>
            </>
          )}

          {/* SOLUTIONS PAGE */}
          {activePage === "solutions" && (
            <>
              <h1 className="lp-headline" style={{fontSize:"42px"}}>
                <span className="lp-h-white">Security</span>
                <br />
                <span className="lp-h-green">Solutions</span>
              </h1>
              <p className="lp-desc">Built for modern IoT security challenges</p>
              <div className="lp-solutions-grid">
                <div className="lp-solution-card">
                  <h3>🏠 Smart Home</h3>
                  <p>Monitor all connected home devices. Detect unauthorized access instantly.</p>
                  <ul>
                    <li>Device trust scoring</li>
                    <li>Automatic threat detection</li>
                    <li>Real-time notifications</li>
                  </ul>
                </div>
                <div className="lp-solution-card">
                  <h3>🏭 Industrial IoT</h3>
                  <p>Enterprise monitoring for industrial devices and critical infrastructure.</p>
                  <ul>
                    <li>Multi-device monitoring</li>
                    <li>AI-powered analysis</li>
                    <li>Breach time prediction</li>
                  </ul>
                </div>
                <div className="lp-solution-card">
                  <h3>🏥 Healthcare</h3>
                  <p>Secure medical IoT devices with strict security requirements.</p>
                  <ul>
                    <li>24/7 monitoring</li>
                    <li>Instant alerts</li>
                    <li>Activity logging</li>
                  </ul>
                </div>
              </div>
            </>
          )}

          {/* ABOUT PAGE */}
          {activePage === "about" && (
            <>
              <h1 className="lp-headline" style={{fontSize:"42px"}}>
                <span className="lp-h-white">About</span>
                <br />
                <span className="lp-h-green">SentinelMesh</span>
              </h1>
              <p className="lp-desc">
                SentinelMesh is a next-generation IoT security monitoring platform
                designed to protect connected devices from emerging cyber threats.
                Built with React, Spring Boot, and a custom AI engine, it provides
                real-time threat detection and predictive breach intelligence.
              </p>
              <p className="lp-desc">
                Our platform uses trust-score based behavioral analysis to identify
                compromised devices before breaches occur, giving security teams
                the intelligence they need to act proactively.
              </p>
              <div className="lp-tech-stack">
                <span className="lp-tech-badge">React</span>
                <span className="lp-tech-badge">Spring Boot</span>
                <span className="lp-tech-badge">MySQL</span>
                <span className="lp-tech-badge">JWT</span>
                <span className="lp-tech-badge">SentinelMesh AI</span>
                <span className="lp-tech-badge">REST APIs</span>
              </div>
            </>
          )}

          {/* CONTACT PAGE */}
          {activePage === "contact" && (
            <>
              <h1 className="lp-headline" style={{fontSize:"42px"}}>
                <span className="lp-h-white">Get In</span>
                <br />
                <span className="lp-h-green">Touch</span>
              </h1>
              <p className="lp-desc">Contact the SentinelMesh team</p>
              <div className="lp-contact-form">
                <input
                  className="lp-contact-input"
                  type="text"
                  placeholder="Your Name"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                />
                <input
                  className="lp-contact-input"
                  type="email"
                  placeholder="Your Email"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                />
                <textarea
                  className="lp-contact-input lp-contact-textarea"
                  placeholder="Your Message"
                  rows="4"
                  value={contactMsg}
                  onChange={(e) => setContactMsg(e.target.value)}
                ></textarea>
                {contactSuccess && (
                  <div className="modal-success">
                    ✅ {contactSuccess}
                  </div>
                )}
                {contactError && (
                  <div className="modal-error">
                    ⚠️ {contactError}
                  </div>
                )}
                <button
                  className="lp-cta-primary"
                  onClick={handleContact}
                  disabled={contactLoading}
                >
                  {contactLoading ? "Sending..." : "Send Message →"}
                </button>
              </div>
              <div className="lp-contact-info" style={{marginTop:"24px"}}>
                <div className="lp-ci-item">
                  <span className="lp-ci-icon">📧</span>
                  <div>
                    <div className="lp-ci-label">Email</div>
                    <div className="lp-ci-val">admin@sentinelmesh.com</div>
                  </div>
                </div>
                <div className="lp-ci-item">
                  <span className="lp-ci-icon">🔐</span>
                  <div>
                    <div className="lp-ci-label">Security</div>
                    <div className="lp-ci-val">JWT + Spring Security</div>
                  </div>
                </div>
              </div>
            </>
          )}

        </div>

        {/* RIGHT NETWORK */}
        <div className="lp-right">
          <canvas ref={networkRef} className="lp-network" suppressHydrationWarning={true}></canvas>
        </div>

      </div>
      {/* BOTTOM BAR */}
      <div className="lp-bottombar">
        <div className="lp-ticker">
          <div className="lp-tick">
            <span className="lp-td lp-tg"></span>
            System Online
          </div>
          <div className="lp-tick">
            <span className="lp-td lp-tb"></span>
            AI Engine Active
          </div>
          <div className="lp-tick">
            <span className="lp-td lp-ty"></span>
            Threat Monitoring
          </div>
        </div>
        <div className="lp-typing-wrap">
          <span className="lp-typing">
            [ SCANNING CONNECTED INFRASTRUCTURE... ]
          </span>
        </div>
      </div>

      {/* LOGIN / SIGNUP MODAL */}
      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-box">

            <button
              className="modal-close"
              onClick={() => {
                setShowModal(false);
                setError("");
                setSignupError("");
                setSignupSuccess("");
              }}
            >
              ✕
            </button>

            <div className="modal-brand">
              <span className="lp-brand-s">Sentinel</span>
              <span className="lp-brand-m">Mesh</span>
            </div>
            <p className="modal-sub">
              Security Intelligence Platform
            </p>

            <div className="modal-tabs">
              <button
                className={`modal-tab ${activeTab === "login" ? "modal-tab-active" : ""}`}
                onClick={() => {
                  setActiveTab("login");
                  setError("");
                  setSignupError("");
                  setSignupSuccess("");
                }}
              >
                Login
              </button>
              <button
                className={`modal-tab ${activeTab === "signup" ? "modal-tab-active" : ""}`}
                onClick={() => {
                  setActiveTab("signup");
                  setError("");
                  setSignupError("");
                  setSignupSuccess("");
                }}
              >
                Sign Up
              </button>
            </div>

            {activeTab === "login" && (
              <div className="modal-form">
                {error && (
                  <div className="modal-error">⚠️ {error}</div>
                )}
                <input
                  className="modal-input"
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
                <input
                  className="modal-input"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
                <button
                  className="modal-btn"
                  onClick={handleLogin}
                  disabled={loading}
                >
                  {loading ? "AUTHENTICATING..." : "INITIALIZE SESSION →"}
                </button>
              </div>
            )}

            {activeTab === "signup" && (
              <div className="modal-form">
                {signupError && (
                  <div className="modal-error">⚠️ {signupError}</div>
                )}
                {signupSuccess && (
                  <div className="modal-success">✅ {signupSuccess}</div>
                )}
                <input
                  className="modal-input"
                  type="email"
                  placeholder="Email Address"
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
                <input
                  className="modal-input"
                  type="password"
                  placeholder="Create Password"
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
                <button
                  className="modal-btn"
                  onClick={handleSignup}
                  disabled={signupLoading}
                >
                  {signupLoading ? "CREATING..." : "CREATE ACCOUNT →"}
                </button>
              </div>
            )}

          </div>
        </div>
      )}
{/* TOAST NOTIFICATION */}
      {toast && (
        <div className={`toast-notification ${toast.type === "success" ? "toast-success" : "toast-error"}`}>
          <span className="toast-icon">
            {toast.type === "success" ? "✅" : "❌"}
          </span>
          <span className="toast-message">{toast.message}</span>
        </div>
      )}
    </div>
  );
}

export default Login;