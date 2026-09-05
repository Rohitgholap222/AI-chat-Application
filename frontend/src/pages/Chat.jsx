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

  // Get active chat
  const activeChat = chats.find(
    (chat) => chat.id === activeChatId
  );

  // Save chats to localStorage
  useEffect(() => {
    localStorage.setItem(
      "ai-chats",
      JSON.stringify(chats)
    );
  }, [chats]);

  // Save active chat ID
  useEffect(() => {
    if (activeChatId) {
      localStorage.setItem(
        "active-chat-id",
        activeChatId
      );
    } else {
      localStorage.removeItem("active-chat-id");
    }
  }, [activeChatId]);

  // Auto scroll to bottom
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

    let currentChatId = activeChatId;
    let currentMessages = [];

    // Create chat automatically if no active chat
    if (!currentChatId) {
      const newChat = {
        id: Date.now().toString(),
        title:
          message.length > 40
            ? message.substring(0, 40) + "..."
            : message,
        messages: [],
      };

      setChats((prev) => [newChat, ...prev]);
      setActiveChatId(newChat.id);

      currentChatId = newChat.id;
    } else {
      const currentChat = chats.find(
        (chat) => chat.id === currentChatId
      );

      currentMessages = currentChat?.messages || [];
    }

    // User message
    const userMessage = {
      role: "user",
      content: message,
    };

    // Full conversation history
    const conversationHistory = [
      ...currentMessages,
      userMessage,
    ];

    // Add user message to UI
    setChats((prev) =>
      prev.map((chat) =>
        chat.id === currentChatId
          ? {
              ...chat,

              // Use first prompt as chat title
              title:
                chat.messages.length === 0
                  ? message.length > 40
                    ? message.substring(0, 40) + "..."
                    : message
                  : chat.title,

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
      // Send conversation to backend
      const { data } = await api.post("/chat", {
        messages: conversationHistory,
      });

      // AI response
      const aiMessage = {
        role: "assistant",
        content: data.response,
      };

      // Add AI response
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
        content:
          "Something went wrong. Please try again.",
        isError: true,
      };

      // Add error message
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