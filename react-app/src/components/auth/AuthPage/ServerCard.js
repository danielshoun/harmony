import React from "react";
import {serverJoin} from "../../../store/Servers";
import {useDispatch, useSelector} from "react-redux";

const ServerCard = ({server}) => {
    const dispatch = useDispatch();
    const servers = useSelector((state) => state.servers);

    function handleJoin() {
        dispatch(serverJoin(server.id))
    }

    return (
        <div className="server-card">
            {server.pictureUrl ? (
                <img
                    className="server-image"
                    src={server.pictureUrl}
                    alt={server.name}
                />
            ) : (
                <div className="server-image">{server.name[0]}</div>
            )}
            <div className="server-name">{server.name}</div>
            <div className="server-owner">{server.ownerName}</div>
            <div className="server-count">
                {server.members.length} users
            </div>
            {servers.userServers
                .map((server) => server.id)
                .includes(server.id) ? (
                <div className="joined-text">Joined</div>
            ) : (
                <button
                    className="button-primary join-button"
                    onClick={() => handleJoin()}
                >
                    Join
                </button>
            )}
        </div>
    )
}

export default ServerCard;
