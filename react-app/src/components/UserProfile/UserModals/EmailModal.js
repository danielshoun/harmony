import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../../../store/session";

function EmailModal(onClose) {
  const [email, setEmail] = useState("");
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  function handleEmail() {
    const updatedUser = {
      username: user.username,
      email,
      image_url: user.image_url,
    };

    dispatch(updateUser(updatedUser));
    onClose.onClose();
  }
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
        <button onClick={() => handleEmail()} className="submit-edit-btn">
          Done
        </button>
      </div>
    </>
  );
}

export default EmailModal;
