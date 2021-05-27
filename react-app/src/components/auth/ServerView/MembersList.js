import React from "react";
import {useSelector} from "react-redux";
import {useHistory} from "react-router-dom";

const MembersList = ({server}) => {
    const user = useSelector((state) => state.session.user);
    const history = useHistory();

    async function handleDm(memberId) {
        await fetch(`/api/dms/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({memberId})
        });
        history.push(`/users/${user.id}/dms/${memberId}`);
    }

    return (
        <div className="members-list-container">
            <div className="members-list">
                <div>
                    <span className="members-group">All</span>
                    <div className="member-container">
                        {server.members.map((member) => (
                            <div
                                className="member-info"
                                onClick={() => member.id === user.id ? null : handleDm(member.id)}
                                key={`member-${member.id}`}
                            >
                                <div className="profile-pic">
                                    <img
                                        src={
                                            member.image_url ||
                                            "https://discord.com/assets/6debd47ed13483642cf09e832ed0bc1b.png"
                                        }
                                        alt=""
                                    />
                                </div>
                                <div className="member-name">{member.username}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MembersList;
