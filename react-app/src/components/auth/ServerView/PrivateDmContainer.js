import React, { useState, useEffect } from "react";
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

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`/api/dms/${recipientId}`);
      if (res.ok) {
        const data = await res.json();
        setMessages(data);
        console.log(data);
      }
    }
    fetchData();
  }, []);

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
      }
    }
    fetchDMs();
  }, [joinedRoom]);

  //   console.log(conversations);

  useEffect(() => {
    socket = io();

    socket.emit("join", {
      type: "private",
      conversation_id: conversations[0] ? conversations[0].id : null,
    });

    setjoinedRoom(true);

    socket.on("message", (chat) => {
      setMessages((messages) => [...messages, chat]);
    });

    return () => {
      socket.disconnect();
    };
  }, [recipientId]);

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
    <div>
      {messages.map((message) => (
        <div>
          {message.sender_id}:{message.body}
        </div>
      ))}
    </div>
  );
}
export default PrivateDmContainer;
