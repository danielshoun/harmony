import React, { useState } from "react";
import "./CreateChannel.css";

function InviteServer({ server, closeModal }) {
    const [inviteLink] = useState(
        process.env.NODE_ENV === "production" ?
            "REPLACE THIS WITH HEROKU LINK" :
            `http://localhost:3000/invitation/${server.id}`
    );

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
