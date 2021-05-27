import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../../../store/session";

function UsernameModal(onClose) {
  const [username, setUsername] = useState("");
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  function handleUsername() {
    const updatedUser = {
      username,
      email: user.email,
      image_url: user.image_url,
    };
    dispatch(updateUser(updatedUser));
    onClose.onClose();
  }

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
        <button onClick={() => handleUsername()} className="submit-edit-btn">
          Done
        </button>
      </div>
    </>
  );
}

export default UsernameModal;
