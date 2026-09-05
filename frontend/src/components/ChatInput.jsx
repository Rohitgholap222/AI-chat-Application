import { useState } from "react";
import { ArrowRight } from "lucide-react";

function ChatInput({
  sendMessage,
  loading,
}) {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    const trimmedMessage = message.trim();

    if (!trimmedMessage || loading) return;

    sendMessage(trimmedMessage);

    setMessage("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <footer className="border-t border-[#252d3a] bg-[#151b27] px-6 py-5">

      <div className="mx-auto flex max-w-4xl items-center gap-3 rounded-[22px] border border-[#323b4b] bg-[#1c222d] p-2 pl-5">

        <input
          type="text"
          value={message}
          placeholder="Message AI..."
          onChange={(e) =>
            setMessage(e.target.value)
          }
          onKeyDown={handleKeyDown}
          disabled={loading}
          className="h-12 flex-1 bg-transparent text-base text-[#e5e7eb] outline-none placeholder:text-[#7f8990]"
        />

        <button
          onClick={handleSend}
          disabled={loading || !message.trim()}
          className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#6e5634] text-[#e5e7eb] transition hover:bg-[#d99222] hover:text-[#151515] active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <ArrowRight size={21} />
        </button>

      </div>

      <p className="mt-3 text-center text-xs text-[#667085]">
        Press Enter to send
      </p>

    </footer>
  );
}

export default ChatInput;