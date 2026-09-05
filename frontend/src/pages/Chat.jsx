import { useEffect, useRef, useState } from "react";
import api from "../api/baseurl";

import Sidebar from "../components/Sidebar";
import ChatHeader from "../components/ChatHeader";
import ChatMessages from "../components/ChatMessages";
import ChatInput from "../components/ChatInput";

function Chat() {
  const [chats, setChats] = useState(() => {
    const savedChats = localStorage.getItem("ai-chats");

    return savedChats ? JSON.parse(savedChats) : [];
  });

  const [activeChatId, setActiveChatId] = useState(() => {
    return localStorage.getItem("active-chat-id") || null;
  });

  const [loading, setLoading] = useState(false);

  const scrollRef = useRef(null);

  const activeChat = chats.find(
    (chat) => chat.id === activeChatId
  );

  // Save chats
  useEffect(() => {
    localStorage.setItem(
      "ai-chats",
      JSON.stringify(chats)
    );
  }, [chats]);

  // Save active chat
  useEffect(() => {
    if (activeChatId) {
      localStorage.setItem(
        "active-chat-id",
        activeChatId
      );
    }
  }, [activeChatId]);

  // Auto scroll
  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [activeChat?.messages, loading]);

  // Create new chat
  const createNewChat = () => {
    const newChat = {
      id: Date.now().toString(),
      title: "New Conversation",
      messages: [],
    };

    setChats((prev) => [newChat, ...prev]);

    setActiveChatId(newChat.id);
  };

  // Delete chat
  const deleteChat = (id) => {
    setChats((prev) =>
      prev.filter((chat) => chat.id !== id)
    );

    if (id === activeChatId) {
      setActiveChatId(null);
    }
  };

  // Send message
  const sendMessage = async (message) => {
    if (!message.trim() || loading) return;

    // Create chat automatically
    let currentChatId = activeChatId;

    if (!currentChatId) {
      const newChat = {
        id: Date.now().toString(),
        title: message.slice(0, 30),
        messages: [],
      };

      setChats((prev) => [newChat, ...prev]);

      setActiveChatId(newChat.id);

      currentChatId = newChat.id;
    }

    const userMessage = {
      role: "user",
      content: message,
    };

    // Add user message
    setChats((prev) =>
      prev.map((chat) =>
        chat.id === currentChatId
          ? {
              ...chat,
              messages: [
                ...chat.messages,
                userMessage,
              ],
            }
          : chat
      )
    );

    setLoading(true);

    try {
      const { data } = await api.post("/chat", {
        message,
      });

      const aiMessage = {
        role: "assistant",
        content: data.response,
      };

      setChats((prev) =>
        prev.map((chat) =>
          chat.id === currentChatId
            ? {
                ...chat,
                messages: [
                  ...chat.messages,
                  aiMessage,
                ],
              }
            : chat
        )
      );

    } catch (error) {
      console.error(error);

      const errorMessage = {
        role: "assistant",
        content: "Something went wrong. Please try again.",
        isError: true,
      };

      setChats((prev) =>
        prev.map((chat) =>
          chat.id === currentChatId
            ? {
                ...chat,
                messages: [
                  ...chat.messages,
                  errorMessage,
                ],
              }
            : chat
        )
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen bg-[#0b1018]">

      <Sidebar
        chats={chats}
        activeChatId={activeChatId}
        setActiveChatId={setActiveChatId}
        createNewChat={createNewChat}
        deleteChat={deleteChat}
      />

      <section className="flex flex-1 flex-col">

        <ChatHeader />

        <ChatMessages
          messages={activeChat?.messages || []}
          loading={loading}
          scrollRef={scrollRef}
        />

        <ChatInput
          sendMessage={sendMessage}
          loading={loading}
        />

      </section>

    </main>
  );
}

export default Chat;