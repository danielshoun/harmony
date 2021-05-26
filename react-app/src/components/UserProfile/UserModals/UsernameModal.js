import React, { useState } from "react";

function UsernameModal() {
  const [username, setUsername] = useState("");

  return (
    <>
      <div className="edit-header">Change your username</div>
      <div className="edit-text">Enter a new username</div>
      <label className="edit-label">USERNAME</label>
      <input
        className="edit-input-field"
        type="text"
        name="username"
        onChange={(e) => setUsername(e.target.value)}
        value={username}
      ></input>
      <div className="submit-div">
        <button className="submit-edit-btn">Done</button>
      </div>
    </>
  );
}

export default UsernameModal;
