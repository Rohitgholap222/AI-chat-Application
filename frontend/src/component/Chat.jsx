import { useState } from "react";

function Chat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = {
      role: "user",
      content: message
    };

    // Add user message
    setMessages((prev) => [...prev, userMessage]);

    setMessage("");
    setLoading(true);

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/chat",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            message: message
          })
        }
      );

      const data = await response.json();

      const aiMessage = {
        role: "assistant",
        content: data.response
      };

      // Add AI response
      setMessages((prev) => [...prev, aiMessage]);

    } catch (error) {
      console.error(error);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Something went wrong!"
        }
      ]);
    }

    setLoading(false);
  };

  return (
    <div className="container">

      <h1>🤖 AI Chat App</h1>

      <div className="chat-container">

        {messages.length === 0 && (
          <p>Ask me anything!</p>
        )}

        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${msg.role}`}
          >
            <strong>
              {msg.role === "user" ? "You" : "AI"}:
            </strong>

            <p>{msg.content}</p>
          </div>
        ))}

        {loading && (
          <p>🤖 AI is thinking...</p>
        )}

      </div>

      <div className="input-container">

        <input
          type="text"
          value={message}
          placeholder="Ask something..."
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              sendMessage();
            }
          }}
        />

        <button onClick={sendMessage}>
          Send
        </button>

      </div>

    </div>
  );
}

export default Chat;