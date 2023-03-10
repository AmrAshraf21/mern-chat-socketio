import React, { useState } from "react";
import { Link } from "react-router-dom";
import './Join.css';
export default function Join() {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const handleSignin = (event) => {
    if (!name || !room) {
      event.preventDefault();
    } else {
      return null;
    }
  };
  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h1 className="heading">Join</h1>
        <div>
          <input
            placeholder="Name"
            className="joinInput"
            type="text"
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <div>
          <input
            placeholder="Room"
            className="joinInput mt-20"
            type="text"
            onChange={(event) => setRoom(event.target.value)}
          />
        </div>
        <Link
          to={`/chat?name=${name}&room=${room}`}
          onClick={handleSignin}
        >
          <button className="button mt-20" type="submit">
            Sign In
          </button>
        </Link>
      </div>
    </div>
  );
}
