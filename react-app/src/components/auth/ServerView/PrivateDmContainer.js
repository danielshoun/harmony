import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "./PrivateDmContainer.css";
import createSocketUseEffect from "../../../utils/createSocketUseEffect";
import Message from "./Message";

function PrivateDmContainer() {
  const { recipientId } = useParams();
  const user = useSelector((state) => state.session.user);
  const peerCon = useSelector((state) => state.peerCon.peerCon);
  const socket = user.socket;
  const [messages, setMessages] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [chatInput, setChatInput] = useState("");
  const messageContainerRef = useRef(null);
  const [initialMessages, setInitialMessages] = useState(true);
  const [otherUser, setOtherUser] = useState("");
  const [userCalled, setuserCalled] = useState("");

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`/api/dms/${recipientId}`);
      if (res.ok) {
        let data = await res.json();
        if (data[0] === "empty") data = [];
        setMessages(data);
      }
    }
    fetchData();
  }, [recipientId]);

  useEffect(() => {
    async function fetchDMs() {
      const res = await fetch(`/api/dms/`);
      if (res.ok) {
        const data = await res.json();
        const convo = data.filter(
          (conv) =>
            (conv.user_1.id === user.id &&
              conv.user_2.id === parseInt(recipientId)) ||
            (conv.user_2.id === user.id &&
              conv.user_1.id === parseInt(recipientId))
        );
        if (convo.length > 0) {
          if (convo[0].user_1.id === parseInt(recipientId)) {
            setOtherUser(convo[0].user_1.username);
            setuserCalled(convo[0].user_1.id);
          } else {
            setOtherUser(convo[0].user_2.username);
            setuserCalled(convo[0].user_2.id);
          }
        }

        setConversations(convo);
      }
    }
    fetchDMs();
  }, [recipientId, user.id]);

  useEffect(
    createSocketUseEffect(
      "private",
      socket,
      setMessages,
      messages,
      null,
      conversations[0]?.id,
      recipientId
    ),
    [socket, conversations, recipientId, messages]
  );

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

    socket.emit("send_notifications", {
      recipient_id: parseInt(recipientId),
      sender_id: user.id,
      conversation_id: conversations[0].id,
    });

    setChatInput("");
  }

  function editMessage(messageId, newBody) {
    const messageIdx = messages.findIndex(
      (message) => message.id === messageId
    );
    const newMessage = { ...messages[messageIdx] };
    newMessage.body = newBody;
    socket.emit("private_edit", newMessage);
  }

  function deleteMessage(messageId) {
    socket.emit("private_delete", {
      id: messageId,
      conversation_id: conversations[0].id,
    });
  }

  async function handleCallUser() {
    const offer = await peerCon.createOffer();
    await peerCon.setLocalDescription(offer);
    socket.emit("send_vc", {
      other_user: userCalled,
      offer: offer,
    });
  }

  return (
    <div className="chat-container">
      <div className="channel-header">
        <div className="channel-title">
          <svg
            x="0"
            y="0"
            aria-hidden="false"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M12 2C6.486 2 2 6.486 2 12C2 17.515 6.486 22 12 22C14.039 22 15.993 21.398 17.652 20.259L16.521 18.611C15.195 19.519 13.633 20 12 20C7.589 20 4 16.411 4 12C4 7.589 7.589 4 12 4C16.411 4 20 7.589 20 12V12.782C20 14.17 19.402 15 18.4 15L18.398 15.018C18.338 15.005 18.273 15 18.209 15H18C17.437 15 16.6 14.182 16.6 13.631V12C16.6 9.464 14.537 7.4 12 7.4C9.463 7.4 7.4 9.463 7.4 12C7.4 14.537 9.463 16.6 12 16.6C13.234 16.6 14.35 16.106 15.177 15.313C15.826 16.269 16.93 17 18 17L18.002 16.981C18.064 16.994 18.129 17 18.195 17H18.4C20.552 17 22 15.306 22 12.782V12C22 6.486 17.514 2 12 2ZM12 14.599C10.566 14.599 9.4 13.433 9.4 11.999C9.4 10.565 10.566 9.399 12 9.399C13.434 9.399 14.6 10.565 14.6 11.999C14.6 13.433 13.434 14.599 12 14.599Z"
            ></path>
          </svg>
          <span>{otherUser}</span>
          <button type="button" onClick={handleCallUser}>
            Call
          </button>
        </div>
        <div className="chat-toolbar"></div>
      </div>
      <div className="chat-area">
        <div className="chat-messages-container">
          <div className="message-container" ref={messageContainerRef}>
            {messages.map((message, i) => {
              return (
                <Message
                  key={i}
                  message={message}
                  messages={messages}
                  i={i}
                  editMessage={editMessage}
                  deleteMessage={deleteMessage}
                />
              );
            })}
          </div>
          <form action="" className="send-message-form" onSubmit={sendChat}>
            <input
              name=""
              id=""
              placeholder={`Message @${otherUser}`}
              contentEditable="true"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
            />
          </form>
        </div>
      </div>
    </div>
  );
}
export default PrivateDmContainer;
