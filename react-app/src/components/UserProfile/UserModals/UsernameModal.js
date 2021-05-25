import React, { useState } from "react";
import { useDispatch } from "react-redux";

import "./UsernameModal.css";

function UsernameModal(onClose) {
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
      ></input>
      <div className="submit-edit-btn">Done</div>
    </>
  );
}

export default UsernameModal;
