import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { updateUser } from "../../../store/session";

import "./ProfilePicModal.css";

function ProfilePicModal(onClose) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [profileUrl, setProfileUrl] = useState("");
  const [imageLoading, setImageLoading] = useState(false);
  const user = useSelector((state) => state.session.user);

  const uploadImage = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    setImageLoading(true);
    const res = await fetch("/api/images/", {
      method: "POST",
      body: formData,
    });
    if (res.ok) {
      const data = await res.json();
      setProfileUrl(data.url);
      setImageLoading(false);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    console.log(profileUrl);
    const newUser = {
      username: user.username,
      email: user.email,
      image_url: profileUrl,
    };
    dispatch(updateUser(newUser));
    onClose.onClose();
  };

  return (
    <>
      <div className="edit-header">Change your Profile Picture!</div>
      <div className="edit-text">Upload a new picture</div>
      <div className="edit-prof-container">
        <div className="edit-profile-icon">
          {user.image_url ? (
            <img
              className="edit-prof-pic"
              src={user.image_url}
              alt={user.username}
            />
          ) : (
            <div className="edit-profile-icon">{user.username[0]}</div>
          )}
        </div>
        <input
          className="edit-server-image"
          type="file"
          accept="image/*"
          onChange={(e) => uploadImage(e)}
        />
      </div>

      <div className="submit-div">
        <button
          disabled={imageLoading}
          onClick={(e) => handleCreate(e)}
          className="submit-edit-btn"
        >
          {imageLoading ? "Uploading..." : "Done"}
        </button>
      </div>
    </>
  );
}

export default ProfilePicModal;
