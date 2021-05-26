import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import {fetchMemberServers, serverJoin} from "../../../store/Servers";
import { useHistory, useParams } from "react-router-dom";
import "./Invitation.css";

const Invitation = () => {
    const dispatch = useDispatch();
    const { serverId } = useParams();
    const servers = useSelector((state) => state.servers);
    const server = servers.allServers.find(server => server.id === Number(serverId)) ||
        {
            name: '',
            image_url: ''
        }
    const history = useHistory();

    if(servers.userServers.find(userServer => userServer.id === server.id)) {
        history.push(`/servers/${serverId}/${server.channels[0].id}`)
    }

    useEffect(() => {
        dispatch(fetchMemberServers());
    }, [dispatch]);

    const handleAccept = () => {
        dispatch(serverJoin(server.id))
        history.push(`/servers/${serverId}/${server.channels[0].id}`)
    }

    return (
        <div className="invitation-container">
            <h3>You've been invited to join {server.name}!</h3>
            {server.pictureUrl ? (
                <img className="server-image invitation-image" src={server.pictureUrl} alt={server.name} />
            ) : (
                <div className="server-image invitation-image">{server.name[0]}</div>
            )}
            <div className="accept-text">Click Accept to go there right away!</div>
            <div className="decline-text">Don't know who this is? Click Decline to go home.</div>
                <button
                    className="create-btn"
                    onClick={handleAccept}
                >
                    Accept
                </button>
                <button
                    className="decline-btn"
                    onClick={() => history.push("/")}
                >
                    Decline
                </button>
        </div>
    );
};

export default Invitation;
