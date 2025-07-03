const WS_URL = process.env.REACT_APP_WS_URL || "ws://localhost:5000";

export function connectToWebSocket(username, onMessage) {
  const socket = new WebSocket(WS_URL);

  socket.onopen = () => {
    socket.send(JSON.stringify({ type: "init", username }));
  };

  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    onMessage(data);
  };

  return socket;
}
