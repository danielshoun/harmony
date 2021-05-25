import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from 'react-router';
import { fetchMemberServers } from "../../../store/Servers";
import ChannelsBar from "./ChannelsBar";


const ServerView = () => {
    const {serverId} = useParams()
    const servers = useSelector(state => state.servers.userServers)
    const server = servers.find(serv => serv.id === parseInt(serverId))
    const dispatch = useDispatch()
    // console.log(server)

    useEffect(() => {
        if(!servers){
            dispatch(fetchMemberServers())
        }
    }, [dispatch])

    return(
        <div className='server-view'>
            {server && <ChannelsBar server={server}/>}
        </div>
    )
}

export default ServerView