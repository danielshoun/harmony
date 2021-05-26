import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import "./UsersBar.css";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#36393f",
    border: "none",
    padding: "0",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.75)",
  },
};

function UsersBar() {
  const user = useSelector((state) => state.session.user);
  const history = useHistory();
  const [conversations, setConversations] = useState([]);
  const [usersList, setusersList] = useState([]);
  const [activeUser, setactiveUser] = useState("");

  useEffect(() => {
    async function fetchDMs() {
      const res = await fetch(`/api/dms/`);
      if (res.ok) {
        const data = await res.json();
        const convos = data.map((convo) => {
          if (convo.user_1.id !== user.id) return convo.user_1;
          else return convo.user_2;
        });
        setConversations(data);
        setusersList(convos);
      }
    }
    fetchDMs();
  }, []);

  const handleActive = (activeUser) => {
    setactiveUser(activeUser);
    history.push(`/users/${user.id}/dms/${activeUser.id}`);
  };

  return (
    <div className="sidebar">
      <div className="user-header">
        <h1>Direct Messages</h1>
      </div>
      <div className="channels-bar">
        {usersList.map((user) => {
          return (
            <div
              key={user.id}
              className={`users${activeUser === user ? " active-channel" : ""}`}
              onClick={() => handleActive(user)}
            >
              <div className="profile-pic">
                <img
                  src={
                    user.image_url ||
                    "https://discord.com/assets/6debd47ed13483642cf09e832ed0bc1b.png"
                  }
                  alt=""
                />
              </div>
              <span className="user-username">{user.username}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default UsersBar;
