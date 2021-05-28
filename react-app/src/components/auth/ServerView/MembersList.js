import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const MembersList = ({ server }) => {
  const user = useSelector((state) => state.session.user);
  const socket = user.socket;
  const history = useHistory();
  const [showMessageMenu, setShowMessageMenu] = useState(false);
  const [activeMember, setActiveMember] = useState(null);
  const [body, setBody] = useState("");

  const openMessageMenu = (member) => {
    if (showMessageMenu) return;
    setActiveMember(member);
    setShowMessageMenu(true);
  };

  useEffect(() => {
    if (!showMessageMenu) return;

    const closeMessageMenu = () => {
      setShowMessageMenu(false);
      setActiveMember(null);
    };

    document.addEventListener("click", closeMessageMenu, false);
    document.getElementById("message-menu").addEventListener(
      "click",
      function (e) {
        e.stopPropagation();
      },
      true
    );

    return () => document.removeEventListener("click", closeMessageMenu);
  }, [showMessageMenu]);

  async function handleDm(e) {
    e.preventDefault();
    const res = await fetch(`/api/dms/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ memberId: activeMember.id }),
    });
    const conversationId = await res.json();
    console.log(conversationId);
    socket.emit("private_chat", {
      sender_id: user.id,
      recipient_id: parseInt(activeMember.id),
      conversation_id: Number(conversationId.conversationId),
      body,
    });

    socket.emit("send_notifications", {
      recipient_id: parseInt(activeMember.id),
      sender_id: user.id,
      conversation_id: Number(conversationId.conversationId),
    });

    history.push(`/users/${user.id}/dms/${activeMember.id}`);
  }

  return (
    <div className="members-list-container">
      {showMessageMenu && (
        <div className="message-menu" id="message-menu">
          <div className="message-menu-popout">
            <div className="message-menu-header">
              <div
                style={{ backgroundColor: "rgb(171, 128, 102", height: "60px" }}
              ></div>
              <div className="message-menu-profile-banner">
                <div className="message-menu-nickname">
                  {activeMember.username}#{activeMember.id}
                </div>
              </div>
              <div className="message-menu-avatar">
                <div className="message-menu-avatar-wrapper">
                  <img src={activeMember.image_url} alt="member-pic" />
                </div>
              </div>
              {activeMember.id !== user.id && (
                <div className="message-menu-form">
                  <form onSubmit={handleDm}>
                    <input
                      type="text"
                      value={body}
                      onChange={(e) => setBody(e.target.value)}
                      placeholder={`Message @${activeMember.username}`}
                    />
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      <div className="members-list">
        <div>
          <span className="members-group">All</span>
          <div className="member-container">
            {server.members.map((member) => (
              <div
                className="member-info"
                // onClick={() => member.id === user.id ? null : handleDm(member.id)}
                onClick={() => openMessageMenu(member)}
                key={`member-${member.id}`}
              >
                <div className="profile-pic">
                  <img
                    src={
                      member.image_url ||
                      "https://discord.com/assets/6debd47ed13483642cf09e832ed0bc1b.png"
                    }
                    alt=""
                  />
                </div>
                <div className="member-name">{member.username}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MembersList;
