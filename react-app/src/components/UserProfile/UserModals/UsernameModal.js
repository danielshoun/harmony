import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../../../store/session";

function UsernameModal(onClose) {
  const [username, setUsername] = useState("");
  const [errors, setErrors] = useState("");
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  async function handleUsername() {
    const updatedUser = {
      type: "username",
      username,
      email: user.email,
      image_url: user.image_url,
    };

    const data = await dispatch(updateUser(updatedUser));
    if (data.errors) {
      setErrors(data.errors);
    } else {
      onClose.onClose();
    }
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
      <div className="submit-div large-edit">
        <button onClick={() => handleUsername()} className="submit-edit-btn">
          Done
        </button>
        <div onClick={() => onClose.onClose()} className="cancel-btn">
          Cancel
        </div>
        {errors && <div className="user-edit-errors">{errors}</div>}
      </div>
    </>
  );
}

export default UsernameModal;
