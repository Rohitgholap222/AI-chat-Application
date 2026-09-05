import { MessageCircle } from "lucide-react";

function ChatHeader({ loading }) {
  return (
    <header className="flex items-center gap-4 border-b border-[#252d3a] px-7 py-5">

      <div className="flex h-13 w-13 items-center justify-center rounded-2xl bg-[#d99222]">
        <MessageCircle
          size={23}
          className="text-[#1b1b1b]"
        />
      </div>

      <div>
        <h1 className="text-[17px] font-semibold text-[#e7e9ee]">
          Langchain Chat Application - Using Huggingface
        </h1>

        <p className="mt-1 text-sm text-[#8b95a7]">
          {loading ? "Thinking..." : "Ready to help"}
        </p>
      </div>

    </header>
  );
}

export default ChatHeader;