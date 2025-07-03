import { useEffect, useRef } from "react";

export default function ChatWindow({ messages, username }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="chat-window">
      <div className="messages">
        {messages.map((msg, index) => {
          const isOwn = msg.username === username;
          return (
            <div key={index} className={`message-bubble ${isOwn ? "own" : ""}`}>
              <div className="meta">
                <span className="user">{msg.username}</span>
                <span className="time">{new Date(msg.timestamp).toLocaleTimeString()}</span>
              </div>
              <div className="text">{msg.message}</div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>
    </div>
  );
}
