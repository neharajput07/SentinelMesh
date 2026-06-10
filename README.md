# 🛡️ SentinelMesh
> Real-Time IoT Security Monitoring & AI-Powered Threat Intelligence

![GitHub repo size](https://img.shields.io/github/repo-size/neharajput07/SentinelMesh)
![GitHub last commit](https://img.shields.io/github/last-commit/neharajput07/SentinelMesh)
![GitHub stars](https://img.shields.io/github/stars/neharajput07/SentinelMesh)

---

## 📌 What is SentinelMesh?

SentinelMesh is a full-stack IoT security platform built to solve a real problem — **most IoT networks have zero visibility into device behavior**. When a device gets compromised, nobody knows until it's too late.

SentinelMesh changes that. It monitors every connected device in real-time, scores their behavior using a trust-based system, and uses a custom-built AI engine to predict threats **before they become breaches**.

---

## 🔥 Why SentinelMesh?

IoT devices are everywhere — smart homes, hospitals, industries — but most networks have **zero visibility** into what these devices are actually doing. A single compromised device can bring down an entire network, and by the time it's detected, the damage is already done.

SentinelMesh was built to bridge this gap — providing real-time behavioral monitoring, AI-powered threat prediction, and instant alerts so security teams can act **before** a breach happens, not after.

---

## ⚡ Core Features

- **SentinelMesh AI Engine** — A custom-built threat intelligence engine that detects anomalies, calculates risk scores, predicts breach time, and generates human-readable threat reports
- **JWT Authentication** — Stateless token-based auth with Spring Security and BCrypt password encryption
- **Real-Time Device Monitoring** — Live tracking of all IoT devices with automatic status updates every 5 seconds
- **Threat Alerts** — Automatic alerts generated when device trust score drops below threshold
- **AI Security Chatbot** — Natural language interface to query network status, get device risk analysis, and security recommendations
- **Activity Logs** — Complete audit trail of every device operation with timestamps
- **Analytics Dashboard** — Device health visualization with trust score bars and risk distribution
- **Contact Messaging System** — Users can contact admin, messages stored in database and visible in admin panel
- **Notification Bell** — Live pulsing notification bell showing count of suspicious devices

---

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Frontend | React + Vite | UI and user interaction |
| Backend | Spring Boot | REST API and business logic |
| Database | MySQL | Data persistence |
| Security | JWT + Spring Security | Authentication and authorization |
| Encryption | BCrypt | Password hashing |
| AI Engine | Custom Java Rule Engine | Threat detection and prediction |
| HTTP Client | Axios | Frontend-backend communication |
| Styling | CSS3 | Animations and responsive design |

---

## 📁 Project Structure
```text
SentinelMesh/
│
├── Frontend/
│   └── src/
│       ├── pages/
│       │   ├── Login.jsx
│       │   ├── Dashboard.jsx
│       │   ├── Devices.jsx
│       │   ├── Alerts.jsx
│       │   ├── Analytics.jsx
│       │   ├── Logs.jsx
│       │   ├── Messages.jsx
│       │   ├── Settings.jsx
│       │   ├── AiAnalysis.jsx
│       │   └── AiChat.jsx
│       ├── components/
│       │   ├── Sidebar.jsx
│       │   └── ProtectedRoute.jsx
│       └── services/
│           └── axiosInstance.js
│
└── Backend/
└── src/main/java/auto/
├── controller/
├── entity/
├── repository/
├── dto/
├── security/
│   ├── JwtUtil.java
│   ├── JwtFilter.java
│   └── SecurityConfig.java
└── ai/
├── ThreatAnalysisEngine.java
└── ChatbotEngine.java
```
---

## 🤖 SentinelMesh AI Engine

The AI engine is not a third-party integration — it's a **custom-built threat intelligence system** designed specifically for IoT security.

**How it works:**
Device Data (trust score, status, name)
↓
Risk Score Calculation (0-100%)
↓
Anomaly Pattern Detection
↓
Breach Time Prediction
↓
Human-Readable Threat Report
↓
Natural Language Chatbot Response
**Risk Levels:**

| Score | Level | Action |
|-------|-------|--------|
| 0-20 | 🔴 CRITICAL | Isolate immediately |
| 20-40 | 🟠 HIGH | Restrict access |
| 40-70 | 🟡 MEDIUM | Monitor closely |
| 70-100 | 🟢 LOW | No action needed |

---

## 🔐 Security Implementation

- **JWT tokens** generated on login, expire in 24 hours
- **BCrypt** password hashing with salt — plain text passwords never stored
- **Spring Security** protects all API endpoints
- **Protected Routes** in React redirect unauthenticated users to login
- **Axios Interceptor** automatically attaches JWT token to every API request
- **Auto logout** when token expires or returns 403

---

## 🚀 Setup Instructions

### Prerequisites
- Java 21
- Node.js
- MySQL
- Maven

### Backend Setup
```bash
cd Backend
./mvnw spring-boot:run
```

### Frontend Setup
```bash
cd Frontend
npm install
npm run dev
```

### Database Setup
```sql
CREATE DATABASE sentinelmesh;
```
> Tables are auto-created by Spring Boot JPA on first run.

---

## 📡 API Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | /signup | Register new user | Public |
| POST | /login | Login and get JWT | Public |
| GET | /device | Get all devices | 🔒 JWT |
| POST | /device | Add new device | 🔒 JWT |
| PUT | /device/{id} | Update device | 🔒 JWT |
| DELETE | /device/{id} | Delete device | 🔒 JWT |
| GET | /logs | Get activity logs | 🔒 JWT |
| GET | /ai/analyze | AI analysis all devices | 🔒 JWT |
| POST | /ai/chat | AI chatbot query | 🔒 JWT |
| POST | /contact | Send contact message | Public |
| GET | /contact | Get all messages | 🔒 JWT |

---

## 📊 Device Trust Score System

| Trust Score | Status | Risk Level |
|-------------|--------|------------|
| 70 - 100 | Safe | 🟢 Low Risk |
| 40 - 70 | Monitor | 🟡 Medium Risk |
| 20 - 40 | Suspicious | 🟠 High Risk |
| 0 - 20 | Critical | 🔴 Breach Imminent |

When a device trust score drops below 50, SentinelMesh automatically:
1. Marks device as **Suspicious**
2. Generates a **Threat Alert**
3. Creates an **Activity Log** entry
4. Triggers **Notification Bell**
5. Runs **AI Analysis** on the device

---

## 👩‍💻 Developer

**Neha Rajput**
B.Tech CSE | Specializing in Internet of Things, Cybersecurity including Blockchain Technology

🔗 GitHub: [@neharajput07](https://github.com/neharajput07)

---

## 📄 License

This project is developed for educational purposes as part of B.Tech coursework.
