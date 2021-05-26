import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import "./PrivateDmContainer.css";

let socket;

function PrivateDmContainer() {
  const { recipientId } = useParams();
  const user = useSelector((state) => state.session.user);
  const [messages, setMessages] = useState([]);
  const [joinedRoom, setjoinedRoom] = useState(false);
  const [conversations, setConversations] = useState([]);
  const [chatInput, setChatInput] = useState("");
  const [loaded, setLoaded] = useState(false);
  const messageContainerRef = useRef(null);
  const [initialMessages, setInitialMessages] = useState(true);


  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`/api/dms/${recipientId}`);
      if (res.ok) {
        const data = await res.json();
        setMessages(data);
        // console.log(data);
      }
    }
    fetchData();
  }, [recipientId]);

  useEffect(() => {
    async function fetchDMs() {
      const res = await fetch(`/api/dms/`);
      if (res.ok) {
        const data = await res.json();
        // console.log(data)
        const convo = data.filter(
          (conv) =>
            (conv.user_1.id === user.id &&
              conv.user_2.id === parseInt(recipientId)) ||
            (conv.user_2.id === user.id &&
              conv.user_1.id === parseInt(recipientId))
        );

        setConversations(convo);
        setLoaded(true);
        console.log(loaded);
      }
    }
    fetchDMs();
  }, []);

  //   console.log(conversations);

  useEffect(() => {
    socket = io();
    console.log(conversations);

    // console.log(conversations[0].id)
    if (loaded) {
      console.log("are we loaded", loaded);
      socket.emit("join", {
        type: "private",
        conversation_id: conversations[0] ? conversations[0].id : "",
        recipient_id: recipientId,
      });

      setjoinedRoom(true);
      // console.log(joinedRoom)

      socket.on("message", (chat) => {
        setMessages((messages) => [...messages, chat]);
      });

      return () => {
        socket.disconnect();
      };
    }
  }, [recipientId, conversations, loaded]);


  useEffect(() => {
    if (
      messages.length > 0 &&
      (initialMessages || messages[messages.length - 1].sender.id === user.id)
    ) {
      messageContainerRef.current.scroll({
        top: messageContainerRef.current.scrollHeight,
        behavior: "auto",
      });
      setInitialMessages(false);
    }
  }, [messageContainerRef, messages, initialMessages, user]);
  

  function sendChat(e) {
    e.preventDefault();
    socket.emit("private_chat", {
      sender_id: user.id,
      recipient_id: parseInt(recipientId),
      conversation_id: conversations[0].id,
      body: chatInput,
    });
    setChatInput("");
  }

  return (
    <div className="chat-container">
      <div className="channel-header">
        <div className="channel-title">
          <svg width="24" height="24" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M5.88657 21C5.57547 21 5.3399 20.7189 5.39427 20.4126L6.00001 17H2.59511C2.28449 17 2.04905 16.7198 2.10259 16.4138L2.27759 15.4138C2.31946 15.1746 2.52722 15 2.77011 15H6.35001L7.41001 9H4.00511C3.69449 9 3.45905 8.71977 3.51259 8.41381L3.68759 7.41381C3.72946 7.17456 3.93722 7 4.18011 7H7.76001L8.39677 3.41262C8.43914 3.17391 8.64664 3 8.88907 3H9.87344C10.1845 3 10.4201 3.28107 10.3657 3.58738L9.76001 7H15.76L16.3968 3.41262C16.4391 3.17391 16.6466 3 16.8891 3H17.8734C18.1845 3 18.4201 3.28107 18.3657 3.58738L17.76 7H21.1649C21.4755 7 21.711 7.28023 21.6574 7.58619L21.4824 8.58619C21.4406 8.82544 21.2328 9 20.9899 9H17.41L16.35 15H19.7549C20.0655 15 20.301 15.2802 20.2474 15.5862L20.0724 16.5862C20.0306 16.8254 19.8228 17 19.5799 17H16L15.3632 20.5874C15.3209 20.8261 15.1134 21 14.8709 21H13.8866C13.5755 21 13.3399 20.7189 13.3943 20.4126L14 17H8.00001L7.36325 20.5874C7.32088 20.8261 7.11337 21 6.87094 21H5.88657ZM9.41045 9L8.35045 15H14.3504L15.4104 9H9.41045Z"
            ></path>
          </svg>
          <span>{user?.username}</span>
        </div>
        <div className="chat-toolbar">
        </div>
      </div>
      <div className="chat-area">
        <div className="chat-messages-container">
          <div className="message-container" ref={messageContainerRef}>
            {messages.map((message, i) => {
              const messageDateObj = new Date(message.created_at);
              const today = new Date();
              let timeString;
              let hours = messageDateObj.getHours();
              let minutes = messageDateObj.getMinutes();
              let ampm = hours >= 12 ? "PM" : "AM";
              hours = hours % 12;
              hours = hours ? hours : 12;
              minutes = minutes < 10 ? `0${minutes}` : minutes;
              if (
                messageDateObj.getDate() === today.getDate() &&
                messageDateObj.getMonth() === today.getMonth() &&
                messageDateObj.getFullYear() === today.getFullYear()
              ) {
                timeString = `${hours}:${minutes} ${ampm}`;
              } else {
                timeString = `${messageDateObj.getMonth() + 1}/${messageDateObj.getDate() + 1
                  }/${messageDateObj.getFullYear()}, ${hours}:${minutes} ${ampm}`;
              }

              if (i === 0 || message.sender.id !== messages[i - 1].sender.id) {
                return (
                  <div className="message" key={i}>
                    <div className="message-image-container">
                      <div className="profile-pic">
                        <img
                          className="profile-pic"
                          src={
                            message.sender.image_url ||
                            "https://discord.com/assets/6debd47ed13483642cf09e832ed0bc1b.png"
                          }
                          alt={message.sender.username}
                        />
                      </div>
                    </div>
                    <div className="message-text-container">
                      <div className="message-username">
                        {`${message.sender.username}`}
                        <span className="message-time">{timeString}</span>
                      </div>
                      <div className="message-body">{`${message.body}`}</div>
                    </div>
                  </div>
                );
              }
              return (
                <div className="message subsequent-message" key={i}>
                  <div className="message-image-container">
                    <div className="profile-pic" />
                  </div>
                  <div className="message-text-container">
                    <div className="message-body">{`${message.body}`}</div>
                  </div>
                </div>
              );
            })}
          </div>
          <form action="" className="send-message-form" onSubmit={sendChat}>
            <input
              name=""
              id=""
              placeholder={`Message #${user.username}`}
              // rows="1"
              contentEditable="true"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
            />
          </form>
        </div>

      </div>
    </div>
  )
}
export default PrivateDmContainer;
