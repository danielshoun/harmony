import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../../../store/session";

function EmailModal(onClose) {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState("");
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  async function handleEmail() {
    const updatedUser = {
      type: "email",
      username: user.username,
      email,
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
      <div className="submit-div large-edit">
        <button onClick={() => handleEmail()} className="submit-edit-btn">
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

export default EmailModal;
