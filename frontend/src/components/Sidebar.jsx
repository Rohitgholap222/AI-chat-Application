import {
  MessageSquarePlus,
  Trash2,
  MessageCircle,
} from "lucide-react";

function Sidebar({
  chats,
  activeChatId,
  setActiveChatId,
  createNewChat,
  deleteChat,
}) {
  return (
    <aside className="flex h-screen w-72 flex-col border-r border-[#252d3a] bg-[#111722]">

      {/* Logo */}
      <div className="border-b border-[#252d3a] p-5">
        <div className="flex items-center gap-3">

          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#d99222]">
            <MessageCircle
              size={20}
              className="text-[#111722]"
            />
          </div>

          <div>
            <h1 className="text-sm font-semibold text-white">
              LangChain AI
            </h1>

            <p className="text-xs text-[#7f899b]">
              Your AI Assistant
            </p>
          </div>

        </div>
      </div>

      {/* New Chat */}
      <div className="p-4">

        <button
          onClick={createNewChat}
          className="flex w-full items-center gap-3 rounded-xl border border-[#323b4b] bg-[#1c222d] px-4 py-3 text-sm font-medium text-[#d7dce5] transition hover:bg-[#252d3a]"
        >
          <MessageSquarePlus size={18} />

          New Chat
        </button>

      </div>

      {/* Chat History */}
      <div className="flex-1 overflow-y-auto px-3">

        <p className="mb-3 px-2 text-xs font-medium uppercase tracking-wider text-[#667085]">
          Recent Chats
        </p>

        <div className="space-y-1">

          {chats.map((chat) => (
            <div
              key={chat.id}
              className={`group flex items-center gap-2 rounded-lg px-3 py-3 transition ${
                activeChatId === chat.id
                  ? "bg-[#252d3a] text-white"
                  : "text-[#9aa4b5] hover:bg-[#1c222d] hover:text-white"
              }`}
            >
              <button
                onClick={() =>
                  setActiveChatId(chat.id)
                }
                className="flex flex-1 items-center gap-3 overflow-hidden text-left"
              >
                <MessageCircle
                  size={16}
                  className="shrink-0"
                />

                <span className="truncate text-sm">
                  {chat.title}
                </span>
              </button>

              <button
                onClick={() =>
                  deleteChat(chat.id)
                }
                className="opacity-0 transition group-hover:opacity-100 hover:text-red-400"
              >
                <Trash2 size={16} />
              </button>

            </div>
          ))}

        </div>

      </div>

      {/* Footer */}
      <div className="border-t border-[#252d3a] p-4">

        <p className="text-center text-xs text-[#667085]">
          Powered by Hugging Face
        </p>

      </div>

    </aside>
  );
}

export default Sidebar;