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
  const [conversations, setConversations] = useState([]);
  const [chatInput, setChatInput] = useState("");

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`api/dms/${recipientId}`);
      if (res.ok) {
        const data = await res.json();
        setMessages(data);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchDMs() {
      const res = await fetch(`api/dms/`);
      if (res.ok) {
        const data = await res.json();
        setConversations(data);
      }
    }
  });

  console.log(conversations);

  //   useEffect(() => {
  //     socket = io();

  //     socket.emit("join", { type: "private" });
  //   });

  return <></>;
}
export default PrivateDmContainer;
