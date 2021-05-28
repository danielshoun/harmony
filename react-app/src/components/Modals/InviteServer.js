import React, { useState } from "react";
import "./CreateChannel.css";

function InviteServer({ server, closeModal }) {
    const [inviteLink] = useState(
        process.env.NODE_ENV === "production" ?
            `https://harmony-app-aa.herokuapp.com/invitation/${server.id}` :
            `http://localhost:3000/invitation/${server.id}`
    );

    function handleChange() {

    }

    return (
        <div className="create-channel-container">
            <div className="create-channel-header">
                <span>Invite Other Users</span>
            </div>
            <div className="create-channel-form-input">
                <label>Invite Link</label>
                <input
                    type="text"
                    placeholder="new-channel"
                    value={inviteLink}
                    onChange={handleChange}
                />
            </div>
            <div className="create-channel-buttons">
                <button className="create-button" onClick={() => navigator.clipboard.writeText(inviteLink)}>
                    <div>Copy Text</div>
                </button>
                <button className="cancel-button" onClick={closeModal}>
                    Cancel
                </button>
            </div>
        </div>
    );
}

export default InviteServer;
