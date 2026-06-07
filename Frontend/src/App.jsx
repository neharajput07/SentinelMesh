import { BrowserRouter, Routes, Route }
from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Devices from "./pages/Devices";
import Alerts from "./pages/Alerts";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import Logs from "./pages/Logs";
import AiAnalysis from "./pages/AiAnalysis";
import AiChat from "./pages/AiChat";
import ProtectedRoute from "./components/ProtectedRoute";
import Messages from "./pages/Messages";

function App() {

  return (

    <BrowserRouter>
      <Routes>

        {/* PUBLIC ROUTES */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* PROTECTED ROUTES */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }/>

        <Route path="/devices" element={
          <ProtectedRoute>
            <Devices />
          </ProtectedRoute>
        }/>

        <Route path="/alerts" element={
          <ProtectedRoute>
            <Alerts />
          </ProtectedRoute>
        }/>

        <Route path="/analytics" element={
          <ProtectedRoute>
            <Analytics />
          </ProtectedRoute>
        }/>

        <Route path="/logs" element={
          <ProtectedRoute>
            <Logs />
          </ProtectedRoute>
        }/>

        <Route path="/settings" element={
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        }/>

        <Route path="/ai" element={
          <ProtectedRoute>
            <AiAnalysis />
          </ProtectedRoute>
        }/>

        <Route path="/chat" element={
          <ProtectedRoute>
            <AiChat />
          </ProtectedRoute>
        }/>

        <Route path="/messages" element={
          <ProtectedRoute>
            <Messages />
          </ProtectedRoute>
        }/>

      </Routes>
    </BrowserRouter>

  );
}

export default App;