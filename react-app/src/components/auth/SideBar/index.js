import React, { useEffect, useState } from "react";
import "./SideBar.css";
import { useSelector, useDispatch } from "react-redux";
import { fetchMemberServers } from "../../../store/Servers";
import { useHistory } from "react-router";

const SideBar = () => {
  const user = useSelector((state) => state.session.user);
  const servers = useSelector((state) => state.servers);
  const dispatch = useDispatch();
  const history = useHistory();
  // const [servers, setServers] = useState([]);
  const [activeServer, setActiveServer] = useState(null);

  useEffect(() => {
    // const tempServers = [
    //     {id: 1, name: 'Test Server 2', ownerName: 'Demo User', userCount: 100, imageUrl: null},
    //     {id: 2, name: 'Test Server 3', ownerName: 'Demo User', userCount: 50, imageUrl: null},
    //     {id: 3, name: 'Test Server 1', ownerName: 'Demo User', userCount: 200, imageUrl: null},
    //     {id: 4, name: 'Test Server 4', ownerName: 'Demo User', userCount: 300, imageUrl: null},
    //     {id: 5, name: 'Test Server 5', ownerName: 'Demo User', userCount: 40, imageUrl: null},
    //     {id: 6, name: 'Test Server 6', ownerName: 'Demo User', userCount: 1, imageUrl: null},
    //     {id: 7, name: 'Test Server 7', ownerName: 'Demo User', userCount: 10, imageUrl: null},
    //     {id: 8, name: 'Test Server 8', ownerName: 'Demo User', userCount: 25, imageUrl: null},
    // ]

    // setServers(tempServers)

    dispatch(fetchMemberServers());
  }, [dispatch]);

    function handleActive(server) {
        setActiveServer(server);
        //TODO: logic for going to a server's page can go here.
        if(server === "discover"){
            history.push("/")
        }
        else if (server === "create") {
            history.push("/servers/create")
        }
        else{
            history.push(`/servers/${server.id}/${server.channels[0].id}`);
        }
    }

    return (
        <div className="side-bar">
            <div className="default-icons">
                <div className="side-bar-icon">
                    {user.pictureUrl ? <img src={user.pictureUrl} alt={user.username}/> : <i className="fas fa-user"/>}
                </div>
                <div
                    className={`side-bar-icon bottom-default-icon${activeServer === "discover" ? " active-server" : ""}`}
                    onClick={() => handleActive("discover")}
                >
                    <i className="fas fa-compass"/>
                </div>
            </div>
            {servers.userServers.map(server => {
                return (
                    <div key={`server-${server.id}`} className={`side-bar-icon${activeServer === server ? " active-server" : ""}`} onClick={() => handleActive(server)}>
                        {server.image_url ? <img src={server.image_url} alt={server.name}/> : <div>{server.name[0]}</div>}
                    </div>
                )
            })}
            <div
                className={`side-bar-icon bottom-default-icon${activeServer === "create" ? " active-server" : ""}`}
                onClick={() => handleActive("create")}
            >
                <i className="fas fa-plus"/>
            </div>
        </div>
    )
};

export default SideBar;
