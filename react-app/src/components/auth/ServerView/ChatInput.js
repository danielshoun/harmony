import React, {useState} from "react";
import {useSelector} from "react-redux";

const ChatInput = ({channel}) => {
    const user = useSelector((state) => state.session.user);
    const socket = user.socket;
    const [chatInput, setChatInput] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        sendChat(chatInput);
        setChatInput("");
    }

    function sendChat(body) {
        socket.emit("public_chat", {
            sender_id: user.id,
            channel_id: channel.id,
            body
        });
    }

    return (
        <form action="" className="send-message-form" onSubmit={handleSubmit}>
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
    );
};

export default ChatInput;
