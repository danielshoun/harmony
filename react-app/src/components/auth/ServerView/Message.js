import React, {useState} from 'react';
import {useSelector} from "react-redux";

const Message = ({message, messages, i}) => {
    const user = useSelector((state) => state.session.user);
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
        if(message.sender.id === user.id) {
            setShowingOptions(true);
        }
    }

    if (i === 0 || message.sender.id !== messages[i - 1].sender.id) {
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
                                value={editText}
                                onChange={(e) => setEditText(e.target.value)}
                            /> :
                            `${message.body}`}
                    </div>
                </div>
                <div className='options-container' hidden={!showingOptions}>
                    <i
                        className="fas fa-pencil-alt message-edit-icon"
                        onClick={() => setIsEditing(true)}
                    />
                    <i className="far fa-trash-alt message-delete-icon"/>
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
                <div className="profile-pic" />
            </div>
            <div className="message-text-container">
                <div className="message-body">
                    {isEditing ?
                        <input>
                        </input> :
                        `${message.body}`}
                </div>
            </div>
            <div className='options-container' hidden={!showingOptions}>
                <i
                    className="fas fa-pencil-alt message-edit-icon"
                    onClick={() => setIsEditing(true)}
                />
                <i className="far fa-trash-alt message-delete-icon"/>
            </div>
        </div>
    );
}

export default Message;
