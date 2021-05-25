import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import UsernameModal from "./UserModals/UsernameModal";
import EmailModal from "./UserModals/EmailModal";
import ProfilePicModal from "./UserModals/ProfilePicModal";
import "./UserProfile.css";
import "./UserModals/Modal.css";

function User() {
  const [user, setUser] = useState({});
  const [showNameModal, setNameModal] = useState(false);
  const [showEmailModal, setEmailModal] = useState(false);
  const [showPicModal, setPicModal] = useState(false);

  const dispatch = useDispatch();
  const { userId } = useParams();

  const logOut = async () => {
    await dispatch(logout());
  };

  useEffect(() => {
    if (!userId) {
      return;
    }
    (async () => {
      const response = await fetch(`/api/users/${userId}`);
      const user = await response.json();
      setUser(user);
    })();
  }, [userId]);

  if (user.id !== parseInt(userId, 10)) {
    return null;
  }

  return (
    <>
      <div className="account-profile-container">
        <h1>My Account</h1>
        <div className="account-details-box">
          <div className="user-profile-header">
            <div className="user-profile-icon">
              {user.pictureUrl ? (
                <img
                  className="user-prof-pic"
                  src={user.pictureUrl}
                  alt={user.username}
                />
              ) : (
                <div className="user-profile-icon">{user.username[0]}</div>
              )}
              <div class="overlay">
                <div
                  onClick={() => {
                    setPicModal(true);
                  }}
                >
                  CHANGE
                </div>
              </div>
            </div>
            <div className="user-profile-name">{user.username}</div>
            <div className="user-profile-name-id">#{user.id}</div>
          </div>
          <div className="user-profile-details">
            <div className="user-edit-bar">
              <div>
                <label className="user-labels">USERNAME</label>
                <div className="user-info">{user.username}</div>
              </div>
              <button
                onClick={() => setNameModal(true)}
                className="user-edit-btn"
              >
                Edit
              </button>
            </div>
            <div className="user-edit-bar">
              <div>
                <label className="user-labels">EMAIL</label>
                <div className="user-info">{user.email}</div>
              </div>
              <button
                onClick={() => setEmailModal(true)}
                className="user-edit-btn"
              >
                Edit
              </button>
            </div>

            <button onClick={() => logOut()} className="account-logout-btn">
              Logout
            </button>
          </div>
        </div>
      </div>
      {showNameModal && (
        <div className="modal">
          <div
            className="modal-background"
            onClick={() => setNameModal(false)}
          />
          <div className="modal-content">
            <UsernameModal />
          </div>
        </div>
      )}
      {showEmailModal && (
        <div className="modal">
          <div
            className="modal-background"
            onClick={() => setEmailModal(false)}
          />
          <div className="modal-content">
            <EmailModal />
          </div>
        </div>
      )}
      {showPicModal && (
        <div className="modal">
          <div
            className="modal-background"
            onClick={() => setPicModal(false)}
          />
          <div className="modal-content">
            <ProfilePicModal currUser={user} />
          </div>
        </div>
      )}
    </>
  );
}
export default User;
