import express from "express";
import { WebSocketServer } from "ws";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import Message from "./models/message.js";

dotenv.config();

const app = express();
app.use(cors());
const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// WebSocket server
const wss = new WebSocketServer({ server });

const clients = new Set();

wss.on("connection", (ws) => {
  clients.add(ws);
  let username = "";

  ws.on("message", async (data) => {
    const parsed = JSON.parse(data);
    if (parsed.type === "init") {
      username = parsed.username;
      const messages = await Message.find().sort({ timestamp: -1 }).limit(50);
      ws.send(JSON.stringify({ type: "history", messages: messages.reverse() }));
    } else if (parsed.type === "message") {
      const newMsg = new Message({
        username,
        message: parsed.message,
        timestamp: new Date()
      });
      await newMsg.save();

      const msgData = {
        type: "message",
        username,
        message: parsed.message,
        timestamp: newMsg.timestamp,
      };

      clients.forEach((client) => {
        if (client.readyState === ws.OPEN) {
          client.send(JSON.stringify(msgData));
        }
      });
    }
  });

  ws.on("close", () => {
    clients.delete(ws);
  });
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));
