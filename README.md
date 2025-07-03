
````markdown
# Real-Time Chat App (MERN Stack)

A real-time chat application built with the MERN stack and WebSocket (`ws` module). Users can join with a username, view recent messages, and chat in real time.

---

##  Local Setup

### Backend

```bash
cd backend
npm install
````

Create a `.env` file:

```
MONGO_URI=mongodb+srv://fabi_RT_Chat:230220@cluster0.dhwhp.mongodb.net/
```

Start the server:

```bash
node server.js
```

### Frontend

```bash
cd frontend
npm install
```

Create a `.env` file:

```
REACT_APP_WS_URL= wss://rt-chat-app-33m0.onrender.com
```

Start the app:

```bash
npm start
```

---

##  Architecture

* **Frontend**: React SPA using WebSocket to communicate with the backend.
* **Backend**: Express.js with `ws` for real-time communication and MongoDB for storing messages.
* **Concurrency**: Uses async WebSocket handlers and broadcasts to all connected clients via in-memory Set.
* **Communication**: Clients connect via WebSocket, send username and messages; backend stores and broadcasts them.

---

##  Deployment

   **Frontend (Vercel)**: [https://rt-chat-app-pzov.vercel.app/](https://rt-chat-app-pzov.vercel.app/)
   **Backend**: Deployed on Render (wss://rt-chat-app-33m0.onrender.com)

Open the deployed link in multiple tabs and start chatting live.

---
```
