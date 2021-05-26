import React from "react";
import {Redirect, useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import CreateServer from "../CreateServer";

const ServerBaseRedirect = () => {
    const { serverId } = useParams();
    const servers = useSelector((state) => state.servers);
    const server = servers.allServers.find(server => server.id === Number(serverId));

    if(server) {
        return (
            <Redirect to={`/servers/${serverId}/${server.channels[0].id}`} />
        )
    }
    if(serverId === 'create') {
        return (
            <CreateServer />
        )
    }
    return (
        <Redirect to="/"/>
    )
}

export default ServerBaseRedirect;
