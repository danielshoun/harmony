import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import { useHistory, useParams } from "react-router-dom";
import "./ChatContainer.css";
import Message from "./Message";

let socket;

function ChatContainer({ server }) {
  const user = useSelector((state) => state.session.user);
  const { channelId } = useParams();
  const history = useHistory()
  const channel = server.channels.find(
    (channel) => channel.id === parseInt(channelId)
  );
  const [messages, setMessages] = useState([]);
  const [initialMessages, setInitialMessages] = useState(true);
  const [showMembers, setShowMembers] = useState(true);
  const [chatInput, setChatInput] = useState("");
  const messageContainerRef = useRef(null);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`/api/messages/${channel.id}`);
      if (res.ok) {
        const data = await res.json();
        setMessages(data);
      }
    }
    fetchData();
  }, [channel]);

  useEffect(() => {
    socket = io();

    socket.emit("join", { type: "public", channel_id: channel.id });

    socket.on("message", (chat) => {
      setMessages((messages) => [...messages, chat]);
    });

    socket.on("public_edit", (newMessage) => {
      const messageIdx = messages.findIndex(message => message.id === newMessage.id);
      setMessages(messages => [...messages.slice(0, messageIdx), newMessage, ...messages.slice(messageIdx + 1, messages.length)])
    })

    socket.on("public_delete", ({messageId}) => {
      const messageIdx = messages.findIndex(message => message.id === messageId);
      setMessages(messages => [...messages.slice(0, messageIdx), ...messages.slice(messageIdx + 1, messages.length)])
    })

    return () => {
      socket.disconnect();
    };
  }, [channel, messages]);

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
    socket.emit("public_chat", {
      sender_id: user.id,
      channel_id: channel.id,
      body: chatInput,
    });
    setChatInput("");
  }

  function editMessage(messageId, newBody) {
    const messageIdx = messages.findIndex(message => message.id === messageId);
    const newMessage = {...messages[messageIdx]}
    newMessage.body = newBody
    socket.emit("public_edit", newMessage)
    // setMessages(messages => [...messages.slice(0, messageIdx), newMessage, ...messages.slice(messageIdx + 1, messages.length)])
  }

  function deleteMessage(messageId) {
    socket.emit("public_delete", {id: messageId})
    // const messageIdx = messages.findIndex(message => message.id === messageId);
    // setMessages(messages => [...messages.slice(0, messageIdx), ...messages.slice(messageIdx + 1, messages.length)])
  }

  async function handelDm(memberId){
    const res = await fetch(`/api/dms/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({memberId})
    })

    history.push(`/users/${user.id}/dms/${memberId}`)

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
          <span>{channel?.name}</span>
        </div>
        <div className="chat-toolbar">
          <div
            className="toolbar-member-button"
            onClick={() => setShowMembers(!showMembers)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24">
              <path d="M14 8.00598C14 10.211 12.206 12.006 10 12.006C7.795 12.006 6 10.211 6 8.00598C6 5.80098 7.794 4.00598 10 4.00598C12.206 4.00598 14 5.80098 14 8.00598ZM2 19.006C2 15.473 5.29 13.006 10 13.006C14.711 13.006 18 15.473 18 19.006V20.006H2V19.006Z"></path>
              <path d="M14 8.00598C14 10.211 12.206 12.006 10 12.006C7.795 12.006 6 10.211 6 8.00598C6 5.80098 7.794 4.00598 10 4.00598C12.206 4.00598 14 5.80098 14 8.00598ZM2 19.006C2 15.473 5.29 13.006 10 13.006C14.711 13.006 18 15.473 18 19.006V20.006H2V19.006Z"></path>
              <path d="M20.0001 20.006H22.0001V19.006C22.0001 16.4433 20.2697 14.4415 17.5213 13.5352C19.0621 14.9127 20.0001 16.8059 20.0001 19.006V20.006Z"></path>
              <path d="M14.8834 11.9077C16.6657 11.5044 18.0001 9.9077 18.0001 8.00598C18.0001 5.96916 16.4693 4.28218 14.4971 4.0367C15.4322 5.09511 16.0001 6.48524 16.0001 8.00598C16.0001 9.44888 15.4889 10.7742 14.6378 11.8102C14.7203 11.8418 14.8022 11.8743 14.8834 11.9077Z"></path>
            </svg>
          </div>
        </div>
      </div>
      <div className="chat-area">
        <div className="chat-messages-container">
          <div className="message-container" ref={messageContainerRef}>
            {messages.map((message, i) => (
                <Message
                    key={i}
                    message={message}
                    messages={messages}
                    i={i}
                    editMessage={editMessage}
                    deleteMessage={deleteMessage}
                />
            ))}
          </div>
          <form action="" className="send-message-form" onSubmit={sendChat}>
            <input
              name=""
              id=""
              placeholder={`Message #${channel.name}`}
              // rows="1"
              contentEditable="true"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
            />
          </form>
        </div>
        {showMembers && (
          <div className="members-list-container">
            <div className="members-list">
              <div>
                <span className="members-group">All</span>
                <div className="member-container">
                  {server.members.map((member) => (
                    <div 
                      className="member-info"
                      onClick={()=> handelDm(member.id)}
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
        )}
      </div>
    </div>
  );
}

export default ChatContainer;
