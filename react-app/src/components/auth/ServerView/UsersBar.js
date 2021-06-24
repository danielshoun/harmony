import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { deleteNotification } from "../../../store/notifications";

import "./UsersBar.css";

function UsersBar() {
  const user = useSelector((state) => state.session.user);
  const socket = user.socket;
  const history = useHistory();
  const notifications = useSelector((state) => state.notifications);
  const dispatch = useDispatch()
  // const [conversations, setConversations] = useState([]);
  const [usersList, setusersList] = useState([]);
  const [activeUser, setactiveUser] = useState("");
  const [firstRender, setFirstRender] = useState(true);

  document.title = "Harmony";

  useEffect(() => {
    async function fetchDMs() {
      const res = await fetch(`/api/dms/`);
      if (res.ok) {
        const data = await res.json();
        const convos = data.map((convo) => {
          if (convo.user_1.id !== user.id) return convo.user_1;
          else return convo.user_2;
        });
        // setConversations(data);
        setusersList(convos);
      }
    }
    if(firstRender) {
      fetchDMs();
      setFirstRender(false);
    }

    const socketOnReceiveNotifications = async ({recipient_id, sender_id, conversation_id}) => {
      console.log(activeUser.id, sender_id)
      if(usersList.filter(user => user.id === sender_id).length === 0) {
        const res = await fetch(`/api/users/${sender_id}`);
        const user = await res.json();
        setusersList(prevState => {
          return [...prevState, user]
        })
      } else if(activeUser.id === sender_id) {
        await markRead(activeUser.id)
      }
    }

    socket.on("receive_notifications", socketOnReceiveNotifications)

    return () => {
      socket.off("receive_notifications", socketOnReceiveNotifications)
    }

  }, [user.id, socket, usersList, activeUser, firstRender]);

  async function markRead(id){
    await fetch('/api/dms/read', {
      method: 'PUT',
      headers: {
        "Content-Type": 'application/json'
      },
      body: JSON.stringify({id})
    })
  }

  const handleActive = (activeUser) => {
    setactiveUser(activeUser);
    dispatch(deleteNotification(activeUser.id))
    markRead(activeUser.id)

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
              <div className="profile-pic user-notification-pic">
                <img
                  src={
                    user.image_url ||
                    "https://discord.com/assets/6debd47ed13483642cf09e832ed0bc1b.png"
                  }
                  alt=""
                />
                <div className={notifications[user.id] ? "user-notification-ping" : ''}></div>
              </div>
              <span className="user-username">{user.username}</span>
            </div>
          );
        })}
      </div>
      <div className="profile-footer">
        <div className="profile-info">
          <div className="profile-pic">
            <img
              src={
                user.image_url ||
                "https://discord.com/assets/6debd47ed13483642cf09e832ed0bc1b.png"
              }
              alt=""
            />
          </div>
          <div className="profile-name">{user.username}</div>
          <div
            className="profile-settings"
            onClick={() => history.push(`/users/${user.id}`)}
          >
            <svg aria-hidden="false" width="20" height="20" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M19.738 10H22V14H19.739C19.498 14.931 19.1 15.798 18.565 16.564L20 18L18 20L16.565 18.564C15.797 19.099 14.932 19.498 14 19.738V22H10V19.738C9.069 19.498 8.203 19.099 7.436 18.564L6 20L4 18L5.436 16.564C4.901 15.799 4.502 14.932 4.262 14H2V10H4.262C4.502 9.068 4.9 8.202 5.436 7.436L4 6L6 4L7.436 5.436C8.202 4.9 9.068 4.502 10 4.262V2H14V4.261C14.932 4.502 15.797 4.9 16.565 5.435L18 3.999L20 5.999L18.564 7.436C19.099 8.202 19.498 9.069 19.738 10ZM12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z"
              ></path>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UsersBar;
