# 🤖 AI Chat Application

A full-stack AI Chat Application built using **React**, **FastAPI**, **LangChain**, and **Hugging Face**.

The application allows users to send messages through a React-based chat interface. The message is sent to a FastAPI backend, processed using LangChain and a Hugging Face language model, and the AI-generated response is displayed in the chat UI.

---

## 🚀 Features

- 💬 Interactive chat interface
- ⚛️ React + Vite frontend
- 🎨 Tailwind CSS UI
- ⚡ FastAPI backend
- 🧠 LangChain integration
- 🤗 Hugging Face language model
- 🔄 Real-time request and response flow
- ⌨️ Send messages using the **Send** button or **Enter** key
- ⏳ Loading state while AI generates a response
- 🛡️ CORS configuration for frontend-backend communication

---

## 🏗️ Project Architecture

```text
┌──────────────────┐
│  React Frontend  │
│                  │
│   Chat Interface │
└────────┬─────────┘
         │
         │ POST /chat
         ▼
┌──────────────────┐
│ FastAPI Backend  │
│                  │
│  API Endpoint    │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│    LangChain     │
│                  │
│ ChatHuggingFace  │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│   Hugging Face   │
│       LLM        │
└────────┬─────────┘
         │
         ▼
    AI Response
         │
         ▼
┌──────────────────┐
│ React Chat UI    │
└──────────────────┘