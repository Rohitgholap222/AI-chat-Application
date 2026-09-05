import { ArrowRight } from "lucide-react";

function ChatInput({
  message,
  setMessage,
  sendMessage,
  loading,
}) {
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <footer className="border-t border-[#252d3a] px-5 py-4">

      <div className="flex items-center gap-3 rounded-[22px] border border-[#323b4b] bg-[#1c222d] p-2 pl-5 shadow-inner">

        <input
          type="text"
          value={message}
          placeholder="Message Aria..."
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={loading}
          className="h-12 flex-1 bg-transparent text-[16px] text-[#e5e7eb] outline-none placeholder:text-[#7f8990]"
        />

        <button
          onClick={sendMessage}
          disabled={loading || !message.trim()}
          className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#6e5634] text-[#1b1b1b] transition hover:bg-[#d99222] active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <ArrowRight size={22} />
        </button>

      </div>

    </footer>
  );
}

export default ChatInput;