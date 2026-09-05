import { Sparkles } from "lucide-react";

function ChatHeader() {
  return (
    <header className="flex h-[76px] items-center border-b border-[#252d3a] px-8">

      <div>
        <h2 className="flex items-center gap-2 text-base font-semibold text-[#e7e9ee]">
          <Sparkles
            size={18}
            className="text-[#d99222]"
          />

          AI Assistant
        </h2>

        <p className="mt-1 text-xs text-[#7f899b]">
          Powered by LangChain & Hugging Face
        </p>
      </div>

    </header>
  );
}

export default ChatHeader;