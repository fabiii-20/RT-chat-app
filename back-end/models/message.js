import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  username: String,
  message: String,
  timestamp: Date,
});

export default mongoose.model("Message", messageSchema);
