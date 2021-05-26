import React, { useState } from "react";

function EmailModal() {
  const [email, setEmail] = useState("");
  return (
    <>
      <div className="edit-header">Change your Email</div>
      <div className="edit-text">Enter a new Email</div>
      <label className="edit-label">EMAIL</label>
      <input
        className="edit-input-field"
        type="email"
        name="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      ></input>
      <div className="submit-div">
        <button className="submit-edit-btn">Done</button>
      </div>
    </>
  );
}

export default EmailModal;
