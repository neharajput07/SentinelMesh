import { useState } from "react";
import axios from "../services/axiosInstance";
import Sidebar from "../components/Sidebar";
import "../styles/dashboard.css";

function AiChat() {

  const [messages, setMessages] = useState([
    {
      type: "ai",
      text: "Hello! I am SentinelMesh AI Assistant. I can analyze your IoT network and answer security questions. How can I help you today?"
    }
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {

    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput("");

    // Add user message
    setMessages(prev => [
      ...prev,
      { type: "user", text: userMessage }
    ]);

    setLoading(true);

    try {
      const response = await axios.post("/ai/chat", {
        question: userMessage
      });

      // Add AI response
      setMessages(prev => [
        ...prev,
        { type: "ai", text: response.data.answer }
      ]);

    } catch (error) {
      setMessages(prev => [
        ...prev,
        {
          type: "ai",
          text: "Sorry, I encountered an error. Please try again."
        }
      ]);
    }

    setLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  const suggestedQuestions = [
    "Which devices are at risk?",
    "What is the network status?",
    "Which device is most dangerous?",
    "What should I do?",
    "How many devices are safe?"
  ];

  return (
    <div className="main-container">

      <Sidebar />

      <div className="dashboard-content">

        {/* HEADER */}
        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          <h1 className="title">🤖 SentinelMesh AI</h1>
          <p style={{ color: "#94a3b8" }}>
            Your intelligent IoT security assistant
          </p>
        </div>

        {/* CHAT CONTAINER */}
        <div className="chat-container">

          {/* MESSAGES */}
          <div className="chat-messages">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`chat-bubble ${
                  msg.type === "user"
                    ? "chat-user"
                    : "chat-ai"
                }`}
              >
                {msg.type === "ai" && (
                  <span className="chat-ai-icon">
                    🤖
                  </span>
                )}
                <p>{msg.text}</p>
              </div>
            ))}

            {loading && (
              <div className="chat-bubble chat-ai">
                <span className="chat-ai-icon">🤖</span>
                <p className="chat-typing">
                  Analyzing network data...
                </p>
              </div>
            )}
          </div>

          {/* SUGGESTED QUESTIONS */}
          <div className="chat-suggestions">
            {suggestedQuestions.map((q, index) => (
              <button
                key={index}
                className="suggestion-btn"
                onClick={() => {
                  setInput(q);
                }}
              >
                {q}
              </button>
            ))}
          </div>

          {/* INPUT ROW */}
          <div className="chat-input-row">
            <input
              type="text"
              className="chat-input"
              placeholder="Ask SentinelMesh AI anything..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button
              className="chat-send-btn"
              onClick={sendMessage}
              disabled={loading}
            >
              {loading ? "..." : "Send"}
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}

export default AiChat;