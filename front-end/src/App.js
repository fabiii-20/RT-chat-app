import { useState, useEffect } from "react";
import { connectToWebSocket } from "./utils/socket";
import UsernameInput from "./components/UsernameInput";
import ChatWindow from "./components/ChatWindow";
import MessageInput from "./components/MessageInput";

function App() {
  const [username, setUsername] = useState("");
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (username) {
      const ws = connectToWebSocket(username, handleMessage);
      setSocket(ws);
    }
  }, [username]);

  const handleMessage = (data) => {
    if (data.type === "history") {
      setMessages(data.messages);
    } else if (data.type === "message") {
      setMessages((prev) => [...prev, data]);
    }
  };

  const sendMessage = (text) => {
    if (socket && text.trim()) {
      socket.send(JSON.stringify({ type: "message", message: text }));
    }
  };

  return (
    <div className="chat-container">
      {!username ? (
        <UsernameInput onSubmit={setUsername} />
      ) : (
        <>
          <ChatWindow messages={messages} />
          <MessageInput onSend={sendMessage} />
        </>
      )}
    </div>
  );
}

export default App;
