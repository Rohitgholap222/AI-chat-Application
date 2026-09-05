import { useEffect, useRef, useState } from "react";
import api from "../api/baseurl";

import ChatHeader from "../components/ChatHeader";
import ChatMessages from "../components/ChatMessages";
import ChatInput from "../components/ChatInput";

function Chat() {
  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState(() => {
    const savedMessages = localStorage.getItem("chatMessages");

    return savedMessages ? JSON.parse(savedMessages) : [];
  });

  const [loading, setLoading] = useState(false);

  const scrollRef = useRef(null);

  useEffect(() => {
    localStorage.setItem(
      "chatMessages",
      JSON.stringify(messages)
    );
  }, [messages]);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, loading]);

  const sendMessage = async () => {
    const trimmedMessage = message.trim();

    if (!trimmedMessage || loading) return;

    const userMessage = {
      role: "user",
      content: trimmedMessage,
    };

    setMessages((prev) => [...prev, userMessage]);

    setMessage("");
    setLoading(true);

    try {
      const { data } = await api.post("/chat", {
        message: trimmedMessage,
      });

      const aiMessage = {
        role: "assistant",
        content: data.response,
      };

      setMessages((prev) => [...prev, aiMessage]);

    } catch (error) {
      console.error(error);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Something went wrong. Please try again.",
          isError: true,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    localStorage.removeItem("chatMessages");
    setMessages([]);
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#0b1018] px-4 py-6">

      <section className="flex h-[88vh] w-full max-w-5xl flex-col overflow-hidden rounded-[28px] border border-[#242b38] bg-[#151b27] shadow-2xl">

        <ChatHeader
          loading={loading}
          clearChat={clearChat}
        />

        <ChatMessages
          messages={messages}
          loading={loading}
          scrollRef={scrollRef}
        />

        <ChatInput
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
          loading={loading}
        />

      </section>

    </main>
  );
}

export default Chat;