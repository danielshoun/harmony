import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import "./PrivateDmContainer.css";
import Message from "./Message";

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
  const [otherUser, setOtherUser] = useState('')


  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`/api/dms/${recipientId}`);
      if (res.ok) {
        let data = await res.json();
        if(data[0]=== 'empty') data = []
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
        console.log(convo)
        if(convo.length > 0){
          if (convo[0].user_1.id === parseInt(recipientId)) setOtherUser(convo[0].user_1.username)
          else setOtherUser(convo[0].user_2.username)
        }

        setConversations(convo);
        setLoaded(true);
        console.log(loaded);
      }
    }
    fetchDMs();
  }, [recipientId]);

  //   console.log(conversations);

  useEffect(() => {
    socket = io();
    // console.log(conversations);

    // console.log(conversations[0].id)
    if (loaded) {
      console.log("are we loaded", loaded);
      socket.emit("join", {
        type: "private",
        conversation_id: conversations[0] ? conversations[0].id : "",
        recipient_id: recipientId,
      });

      setjoinedRoom(true);
      console.log('joined')
      console.log('conversations', conversations)

      socket.on("message", (chat) => {
        setMessages((messages) => [...messages, chat]);
      });

      socket.on("private_edit", (newMessage) => {
        const messageIdx = messages.findIndex(message => message.id === newMessage.id);
        setMessages(messages => [...messages.slice(0, messageIdx), newMessage, ...messages.slice(messageIdx + 1, messages.length)])
      })

      socket.on("private_delete", ({messageId}) => {
        const messageIdx = messages.findIndex(message => message.id === messageId);
        setMessages(messages => [...messages.slice(0, messageIdx), ...messages.slice(messageIdx + 1, messages.length)])
      })

      return () => {
        socket.disconnect();
      };
    }
  }, [recipientId, conversations, loaded, messages]);


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

  function editMessage(messageId, newBody) {
    const messageIdx = messages.findIndex(message => message.id === messageId);
    const newMessage = {...messages[messageIdx]}
    newMessage.body = newBody
    socket.emit("private_edit", newMessage)
    // setMessages(messages => [...messages.slice(0, messageIdx), newMessage, ...messages.slice(messageIdx + 1, messages.length)])
  }

  function deleteMessage(messageId) {
    socket.emit("private_delete", {id: messageId, conversation_id: conversations[0].id})
    // const messageIdx = messages.findIndex(message => message.id === messageId);
    // setMessages(messages => [...messages.slice(0, messageIdx), ...messages.slice(messageIdx + 1, messages.length)])
  }

  return (
    <div className="chat-container">
      <div className="channel-header">
        <div className="channel-title">
          <svg x="0" y="0" class="icon-22AiRD" aria-hidden="false" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.486 2 2 6.486 2 12C2 17.515 6.486 22 12 22C14.039 22 15.993 21.398 17.652 20.259L16.521 18.611C15.195 19.519 13.633 20 12 20C7.589 20 4 16.411 4 12C4 7.589 7.589 4 12 4C16.411 4 20 7.589 20 12V12.782C20 14.17 19.402 15 18.4 15L18.398 15.018C18.338 15.005 18.273 15 18.209 15H18C17.437 15 16.6 14.182 16.6 13.631V12C16.6 9.464 14.537 7.4 12 7.4C9.463 7.4 7.4 9.463 7.4 12C7.4 14.537 9.463 16.6 12 16.6C13.234 16.6 14.35 16.106 15.177 15.313C15.826 16.269 16.93 17 18 17L18.002 16.981C18.064 16.994 18.129 17 18.195 17H18.4C20.552 17 22 15.306 22 12.782V12C22 6.486 17.514 2 12 2ZM12 14.599C10.566 14.599 9.4 13.433 9.4 11.999C9.4 10.565 10.566 9.399 12 9.399C13.434 9.399 14.6 10.565 14.6 11.999C14.6 13.433 13.434 14.599 12 14.599Z"></path></svg>
          <span>{otherUser}</span>
        </div>
        <div className="chat-toolbar">
        </div>
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
              )
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
