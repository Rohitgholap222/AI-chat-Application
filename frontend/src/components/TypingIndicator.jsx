function TypingIndicator() {
  return (
    <div className="flex justify-start">

      <div className="flex gap-1.5 rounded-2xl rounded-bl-md border border-[#2a3240] bg-[#1c2330] px-5 py-4">

        <span className="h-2 w-2 animate-bounce rounded-full bg-[#8b95a7]" />

        <span className="h-2 w-2 animate-bounce rounded-full bg-[#8b95a7] [animation-delay:150ms]" />

        <span className="h-2 w-2 animate-bounce rounded-full bg-[#8b95a7] [animation-delay:300ms]" />

      </div>

    </div>
  );
}

export default TypingIndicator;