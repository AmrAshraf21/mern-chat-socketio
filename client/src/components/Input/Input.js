import React from "react";
import "./Input.css";
function Input({ message, setMessage, sendMessage }) {
  return (
    <form className="form">
      <input
        className="input"
        placeholder="Type a Message..."
        type="text"
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        onKeyDown={(event) => (event.key === "Enter" ? setMessage("") : null)}
      />
      <button className="sendButton" onClick={(event)=>sendMessage(event)}>Send Message</button>
    </form>
  );
}

export default Input;
