import MessageBubble from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";

function ChatMessages({
  messages,
  loading,
  scrollRef,
}) {
  return (
    <div
      ref={scrollRef}
      className="flex flex-1 flex-col overflow-y-auto px-6 py-8"
    >
      {messages.length === 0 ? (

        <div className="flex flex-1 items-center justify-center">
          <div className="max-w-md text-center">

            <h2 className="text-xl font-semibold text-[#d8dce5]">
              Start a conversation
            </h2>

            <p className="mt-3 text-base leading-7 text-[#7f899b]">
              Ask a question, brainstorm an idea, or paste
              something you'd like help with.
            </p>

          </div>
        </div>

      ) : (

        <div className="space-y-6">
          {messages.map((message, index) => (
            <MessageBubble
              key={index}
              message={message}
            />
          ))}

          {loading && <TypingIndicator />}
        </div>

      )}
    </div>
  );
}

export default ChatMessages;