export default function ChatWindow({ messages }) {
  return (
    <div className="chat-window">
      <h2>Chat Room</h2>
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index} className="message">
            <strong>{msg.username}</strong>: {msg.message}
            <span className="timestamp">
              {new Date(msg.timestamp).toLocaleTimeString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
