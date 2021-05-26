import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
import { fetchMemberServers } from "../../../store/Servers";
import ChannelsBar from "./ChannelsBar";
import ChatContainer from "./ChatContainer";
import "./ServerView.css";

const ServerView = () => {
  const { serverId } = useParams();
  const servers = useSelector((state) => state.servers.userServers);
  const server = servers.find((serv) => serv.id === parseInt(serverId));
  const dispatch = useDispatch();

  useEffect(() => {
    if (!servers) {
      dispatch(fetchMemberServers());
    }
  }, [dispatch]);

  return (
    <div className="server-view">
      {server && <ChannelsBar server={server} />}
      {server && <ChatContainer server={server} />}
    </div>
  );
};

export default ServerView;
