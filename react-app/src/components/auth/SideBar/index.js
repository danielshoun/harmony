import React, { useEffect, useState } from "react";
import "./SideBar.css";
import { useSelector, useDispatch } from "react-redux";
import { fetchMemberServers } from "../../../store/Servers";
import { useHistory, useLocation } from "react-router-dom";

const SideBar = () => {
  const user = useSelector((state) => state.session.user);
  const servers = useSelector((state) => state.servers);
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const [activeServer, setActiveServer] = useState(null);

  useEffect(() => {
    if (location.pathname.includes("create")) {
      setActiveServer("create");
    } else if (location.pathname.includes("servers")) {
      const serverId = location.pathname.split("/")[2];
      const firstActive = servers.userServers.find(
        (server) => server.id === Number(serverId)
      );
      setActiveServer(firstActive);
    } else if (location.pathname.includes("dms")) {
      setActiveServer("dms");
    } else {
      setActiveServer("discover");
    }
  }, [location, servers]);

  useEffect(() => {
    dispatch(fetchMemberServers());
  }, [dispatch]);

  function handleActive(server) {
    setActiveServer(server);
    //TODO: logic for going to a server's page can go here.
    if (server === "discover") {
      history.push("/");
    } else if (server === "create") {
      history.push("/servers/create");
    } else if (server === "dms") {
      history.push(`/users/${user.id}/dms`);
    } else {
      history.push(`/servers/${server.id}/${server.channels[0].id}`);
    }
  }

  return (
    <div className="side-bar">
      <div className="default-icons">
        <div
          className={`side-bar-icon${
            activeServer === "dms" ? " active-server" : ""
          }`}
          onClick={() => handleActive("dms")}
        >
          {user.pictureUrl ? (
            <img src={user.pictureUrl} alt={user.username} />
          ) : (
            <i className="fas fa-user" />
          )}
        </div>
        <div
          className={`side-bar-icon${
            activeServer === "discover" ? " active-server" : ""
          }`}
          onClick={() => handleActive("discover")}
        >
          <i className="fas fa-compass" />
        </div>
      </div>
      {servers.userServers.map((server) => {
        return (
          <div
            key={`server-${server.id}`}
            className={`side-bar-icon${
              activeServer === server ? " active-server" : ""
            }`}
            onClick={() => handleActive(server)}
          >
            {server.image_url ? (
              <img src={server.image_url} alt={server.name} />
            ) : (
              <div>{server.name[0]}</div>
            )}
          </div>
        );
      })}
      <div
        className={`side-bar-icon${
          activeServer === "create" ? " active-server" : ""
        }`}
        onClick={() => handleActive("create")}
      >
        <i className="fas fa-plus" />
      </div>
    </div>
  );
};

export default SideBar;
