import React, {useEffect, useRef} from "react";
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
  const firstRender = useRef(true)

  useEffect(() => {
    if(!firstRender) {
      if(!server) {
        history.push('/')
      }
    }
    firstRender.current = false;
  }, [server, history])

  return (
    <div className="server-view">
      {server && <ChannelsBar server={server} />}
      {server && <ChatContainer server={server} />}
    </div>
  );
};

export default ServerView;
