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
  const [loaded, setLoaded] = useState(false);

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
  );
}
export default PrivateDmContainer;
