import { useState } from "react";

function Chat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!message.trim() || loading) return;

    const userMessage = {
      role: "user",
      content: message,
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
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: message,
          }),
        }
      );

      const data = await response.json();

      const aiMessage = {
        role: "assistant",
        content: data.response,
      };

      // Add AI response
      setMessages((prev) => [...prev, aiMessage]);

    } catch (error) {
      console.error(error);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Something went wrong!",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">

      <div className="flex h-[700px] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white shadow-xl">

        {/* Header */}
        <div className="border-b bg-blue-600 px-6 py-5 text-white">
          <h1 className="text-2xl font-bold">
            🤖 AI Chat App
          </h1>

          <p className="text-sm text-blue-100">
            Ask me anything
          </p>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 space-y-4 overflow-y-auto bg-gray-50 p-6">

          {messages.length === 0 && (
            <div className="flex h-full items-center justify-center">
              <p className="text-lg text-gray-400">
                👋 Ask me anything!
              </p>
            </div>
          )}

          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.role === "user"
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              <div
                className={`max-w-[75%] rounded-2xl px-4 py-3 shadow-sm ${
                  msg.role === "user"
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-800"
                }`}
              >
                <p className="mb-1 text-xs font-semibold opacity-70">
                  {msg.role === "user" ? "You" : "AI Assistant"}
                </p>

                <p className="whitespace-pre-wrap">
                  {msg.content}
                </p>
              </div>
            </div>
          ))}

          {/* Loading */}
          {loading && (
            <div className="flex justify-start">
              <div className="rounded-2xl bg-white px-4 py-3 shadow-sm">
                🤖 AI is thinking...
              </div>
            </div>
          )}

        </div>

        {/* Input */}
        <div className="border-t bg-white p-4">
          <div className="flex gap-3">

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
              className="flex-1 rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />

            <button
              onClick={sendMessage}
              disabled={loading}
              className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "..." : "Send"}
            </button>

          </div>
        </div>

      </div>
    </div>
  );
}

export default Chat;