import { useState } from "react";

export default function UsernameInput({ onSubmit }) {
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      onSubmit(name.trim());
    }
  };

  return (
    <div className="username-container">
      <form onSubmit={handleSubmit} className="username-form">
        <h2>Enter your username :</h2>
        <div className="username-input-row">
          <input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <button type="submit">Join Chat</button>
        </div>
      </form>
    </div>
  );
}
