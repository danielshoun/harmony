import React, {useState} from "react";
import {useSelector} from "react-redux";

const Message = ({message, messages, i}) => {
    const user = useSelector((state) => state.session.user);
    const socket = user.socket;
    const [showingOptions, setShowingOptions] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(message.body);

    const messageDateObj = new Date(message.created_at + "Z");
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
        timeString = `${messageDateObj.getMonth() + 1}/${
            messageDateObj.getDate() + 1
        }/${messageDateObj.getFullYear()}, ${hours}:${minutes} ${ampm}`;
    }

    const handleShowOptions = () => {
        if (message.sender.id === user.id) {
            setShowingOptions(true);
        }
    };

    const handleEdit = () => {
        const messageIdx = messages.findIndex(searchMessage => searchMessage.id === message.id);
        const newMessage = {...messages[messageIdx]};
        newMessage.body = editText;
        socket.emit(message.channel_id ? "public_edit" : "private_edit", newMessage);
        setIsEditing(false);
    };

    const handleDelete = () => {
        socket.emit(message.channel_id ? "public_delete" : "private_edit", {id: message.id});
    };

    if (i === 0 || message.sender.id !== messages[i - 1].sender.id || messageDateObj - new Date(messages[i - 1].created_at + "Z") > 300000) {
        return (
            <div
                className="message"
                onMouseEnter={handleShowOptions}
                onMouseLeave={() => setShowingOptions(false)}
            >
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
                    <div className="message-body">
                        {isEditing ?
                            <input
                                className="message-edit-input"
                                value={editText}
                                onChange={(e) => setEditText(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" ? handleEdit() : null}
                            /> :
                            `${message.body}`}
                    </div>
                </div>
                <div className="options-container" hidden={!showingOptions}>
                    <i
                        className="fas fa-pencil-alt message-edit-icon"
                        onClick={() => setIsEditing(true)}
                    />
                    <i
                        className="far fa-trash-alt message-delete-icon"
                        onClick={() => handleDelete()}
                    />
                </div>
            </div>
        );
    }
    return (
        <div
            className="message subsequent-message"
            onMouseEnter={handleShowOptions}
            onMouseLeave={() => setShowingOptions(false)}
        >
            <div className="message-image-container">
                <div className="profile-pic"/>
            </div>
            <div className="message-text-container">
                <div className="message-body">
                    {isEditing ?
                        <input
                            className="message-edit-input"
                            value={editText}
                            onChange={(e) => setEditText(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" ? handleEdit() : null}
                        /> :
                        `${message.body}`}
                </div>
            </div>
            <div className="options-container" hidden={!showingOptions}>
                <i
                    className="fas fa-pencil-alt message-edit-icon"
                    onClick={() => setIsEditing(true)}
                />
                <i
                    className="far fa-trash-alt message-delete-icon"
                    onClick={() => handleDelete()}
                />
            </div>
        </div>
    );
};

export default Message;
