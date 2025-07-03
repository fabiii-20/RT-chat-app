// utils/socket.js
export function connectToWebSocket(username, onMessage) {
  const socket = new WebSocket("ws://localhost:5000");

  socket.onopen = () => {
    socket.send(JSON.stringify({ type: "init", username }));
  };

  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    onMessage(data);
  };

  return socket;
}
