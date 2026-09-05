function MessageBubble({ message }) {
  const isUser = message.role === "user";

  return (
    <div
      className={`flex ${
        isUser
          ? "justify-end"
          : "justify-start"
      }`}
    >
      <div
        className={`max-w-[75%] whitespace-pre-wrap break-words rounded-2xl px-5 py-3 text-sm leading-7 ${
          isUser
            ? "rounded-br-md bg-[#2f6fed] text-white"
            : message.isError
            ? "rounded-bl-md border border-red-500/30 bg-red-500/10 text-red-300"
            : "rounded-bl-md border border-[#2a3240] bg-[#1c2330] text-[#d7dce5]"
        }`}
      >
        {message.content}
      </div>
    </div>
  );
}

export default MessageBubble;