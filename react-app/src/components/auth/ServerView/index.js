import React from "react";
import { useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import ChannelsBar from "./ChannelsBar";
import ChatContainer from "./ChatContainer";
import "./ServerView.css";

const ServerView = () => {
  const { serverId } = useParams();
  const servers = useSelector((state) => state.servers.userServers);
  const server = servers.find((serv) => serv.id === parseInt(serverId));
  const history = useHistory();

  if(!server) {
    history.push('/')
  }

  return (
    <div className="server-view">
      {server && <ChannelsBar server={server} />}
      {server && <ChatContainer server={server} />}
    </div>
  );
};

export default ServerView;
