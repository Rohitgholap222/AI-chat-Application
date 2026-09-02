import { useState, useRef, useEffect } from "react";
import api from "../api/baseurl";

function Chat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, loading]);

  const sendMessage = async () => {
    const trimmed = message.trim();
    if (!trimmed || loading) return;

    setMessages((prev) => [...prev, { role: "user", content: trimmed }]);
    setMessage("");
    setLoading(true);

    try {
      const { data } = await api.post("/chat", { message: trimmed });
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.response },
      ]);
    } catch (error) {
      const detail =
        error.response?.data?.detail ||
        "Something went wrong. Please try again.";
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: detail, isError: true },
      ]);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="chat-page">
      <style>{`
        html, body, #root {
          height: 100%;
        }
        .chat-page {
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #0b0e14;
          padding: 16px;
          font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          box-sizing: border-box;
          overflow: hidden;
        }
        .chat-window {
          display: flex;
          flex-direction: column;
          width: 100%;
          max-width: 720px;
          height: 100%;
          max-height: 800px;
          background: #12151f;
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 20px 60px -15px rgba(0,0,0,0.6);
        }
        .chat-header {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 18px 22px;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          flex-shrink: 0;
        }
        .chat-avatar {
          width: 38px;
          height: 38px;
          border-radius: 10px;
          background: linear-gradient(135deg, #e8a93a, #c97a2a);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .chat-title {
          margin: 0;
          font-size: 15px;
          font-weight: 600;
          color: #ffffff;
          line-height: 1.3;
        }
        .chat-subtitle {
          margin: 2px 0 0;
          font-size: 12.5px;
          color: rgba(255,255,255,0.4);
        }
        .chat-messages {
          flex: 1;
          min-height: 0;
          overflow-y: auto;
          padding: 22px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .chat-empty {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          gap: 6px;
        }
        .chat-empty-title {
          margin: 0;
          font-size: 15px;
          font-weight: 500;
          color: rgba(255,255,255,0.7);
        }
        .chat-empty-sub {
          margin: 0;
          max-width: 260px;
          font-size: 13px;
          line-height: 1.5;
          color: rgba(255,255,255,0.35);
        }
        .row {
          display: flex;
        }
        .row-user {
          justify-content: flex-end;
        }
        .row-assistant {
          justify-content: flex-start;
        }
        .bubble-user {
          max-width: 75%;
          background: #e8a93a;
          color: #211603;
          padding: 10px 14px;
          border-radius: 16px;
          border-bottom-right-radius: 4px;
          font-size: 14px;
          line-height: 1.5;
          white-space: pre-wrap;
          word-break: break-word;
        }
        .bubble-assistant {
          max-width: 75%;
          border-left: 2px solid rgba(255,255,255,0.15);
          padding: 8px 14px;
          font-size: 14px;
          line-height: 1.5;
          color: rgba(255,255,255,0.85);
          white-space: pre-wrap;
          word-break: break-word;
        }
        .bubble-assistant.error {
          border-left-color: rgba(248,113,113,0.6);
          color: rgba(252,165,165,0.9);
        }
        .typing {
          display: flex;
          align-items: center;
          gap: 5px;
          border-left: 2px solid rgba(255,255,255,0.15);
          padding: 12px 14px;
        }
        .typing span {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: rgba(255,255,255,0.4);
          animation: bounce 1.2s infinite ease-in-out;
        }
        .typing span:nth-child(2) { animation-delay: 0.15s; }
        .typing span:nth-child(3) { animation-delay: 0.3s; }
        @keyframes bounce {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.5; }
          40% { transform: translateY(-4px); opacity: 1; }
        }
        .chat-input-bar {
          border-top: 1px solid rgba(255,255,255,0.06);
          padding: 14px;
          flex-shrink: 0;
        }
        .chat-input-wrap {
          display: flex;
          align-items: flex-end;
          gap: 10px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 16px;
          padding: 6px 6px 6px 16px;
          transition: border-color 0.15s ease;
        }
        .chat-input-wrap:focus-within {
          border-color: rgba(232,169,58,0.5);
        }
        .chat-textarea {
          flex: 1;
          resize: none;
          background: transparent;
          border: none;
          outline: none;
          color: #ffffff;
          font-family: inherit;
          font-size: 14px;
          line-height: 1.5;
          padding: 8px 0;
          max-height: 120px;
        }
        .chat-textarea::placeholder {
          color: rgba(255,255,255,0.3);
        }
        .send-btn {
          width: 36px;
          height: 36px;
          flex-shrink: 0;
          border: none;
          border-radius: 10px;
          background: #e8a93a;
          color: #211603;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.15s ease, opacity 0.15s ease;
        }
        .send-btn:hover:not(:disabled) {
          background: #f0b654;
        }
        .send-btn:disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }
      `}</style>

      <div className="chat-window">
        <div className="chat-header">
          <div className="chat-avatar">
            <svg viewBox="0 0 24 24" fill="none" width="18" height="18">
              <path
                d="M12 3a7 7 0 0 0-7 7c0 2.1.94 3.97 2.42 5.24L7 20l4.02-1.53c.32.03.65.05.98.05a7 7 0 1 0 0-14Z"
                stroke="#12151f"
                strokeWidth="1.8"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div>
            <p className="chat-title">Langchain Chat Application - Using Huggingface</p>
            <p className="chat-subtitle">{loading ? "Typing…" : "Ready to help"}</p>
          </div>
        </div>

        <div className="chat-messages" ref={scrollRef}>
          {messages.length === 0 && (
            <div className="chat-empty">
              <p className="chat-empty-title">Start a conversation</p>
              <p className="chat-empty-sub">
                Ask a question, brainstorm an idea, or paste something you'd
                like help with.
              </p>
            </div>
          )}

          {messages.map((msg, index) =>
            msg.role === "user" ? (
              <div className="row row-user" key={index}>
                <div className="bubble-user">{msg.content}</div>
              </div>
            ) : (
              <div className="row row-assistant" key={index}>
                <div className={`bubble-assistant${msg.isError ? " error" : ""}`}>
                  {msg.content}
                </div>
              </div>
            )
          )}

          {loading && (
            <div className="row row-assistant">
              <div className="typing">
                <span />
                <span />
                <span />
              </div>
            </div>
          )}
        </div>

        <div className="chat-input-bar">
          <div className="chat-input-wrap">
            <textarea
              ref={inputRef}
              rows={1}
              className="chat-textarea"
              value={message}
              placeholder="Message Aria…"
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button
              className="send-btn"
              onClick={sendMessage}
              disabled={loading || !message.trim()}
              aria-label="Send message"
            >
              <svg viewBox="0 0 24 24" fill="none" width="16" height="16">
                <path
                  d="M4 12h15M13 6l6 6-6 6"
                  stroke="#211603"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;