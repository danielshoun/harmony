import React, { useEffect, useState } from "react";
import "./SideBar.css";
import { useSelector, useDispatch } from "react-redux";
import { fetchMemberServers } from "../../../store/Servers";
import {
  fetchNewMessages,
  addNotification,
} from "../../../store/notifications";
import { useHistory, useLocation } from "react-router-dom";
import Modal from "react-modal";
import CreateVC from "../../Modals/CreateVC";
import { setPeerConn } from "../../../store/peerConnection";
import createPeerConn from "../../../utils/createPeerConn";
import createStream from "../../../utils/createStream";
import { deletePeerConn } from "../../../store/peerConnection";

const SideBar = () => {
  const user = useSelector((state) => state.session.user);
  let peerCon = useSelector((state) => state.peerCon.peerCon);
  const socket = user.socket;
  const servers = useSelector((state) => state.servers);
  const notifications = useSelector((state) => state.notifications);
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const [activeServer, setActiveServer] = useState(null);
  const [call, setCall] = useState(false);
  const [acceptedCall, setAcceptedCall] = useState(false);
  const [otherUser, setotherUser] = useState("");
  const [offer, setOffer] = useState(undefined);
  const [newPeerCon, setNewPeerCon] = useState(false);
  console.log(peerCon?.signalingState);
  useEffect(() => {
    dispatch(fetchNewMessages());
  }, [dispatch]);

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

  useEffect(() => {
    socket.emit("join_notifications");
    socket.emit("join_vc");

    socket.on("receive_vc", (data) => {
      setOffer(data["offer"]);
      setotherUser(data["user"]);
      setCall(true);
    });

    socket.on("receive_notifications", (notification) => {
      const location = window.location.href.split("/");
      if (
        parseInt(location[location.length - 1]) !== notification.sender_id &&
        parseInt(location[location.length - 3]) !== notification.sender_id
      ) {
        dispatch(addNotification(notification));
      }
    });
  }, [otherUser]);

  useEffect(() => {
    if (peerCon) {
      socket.once("accepted_vc", async (data) => {
        console.log(peerCon);
        if (
          peerCon.signalingState !== "closed" &&
          peerCon.remoteDescription === null
        ) {
          await peerCon.setRemoteDescription(
            new RTCSessionDescription(data["answer"])
          );

          setAcceptedCall(true);
        }
      });
    }
  }, [peerCon, socket]);

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

  function closeModal() {
    setCall(false);
    setAcceptedCall(false);
  }

  function handleDisconnect() {
    peerCon.close();
    setAcceptedCall(false);
    dispatch(deletePeerConn());
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
          {user.image_url ? (
            <img
              className="side-bar-image"
              src={user.image_url}
              alt={user.username}
            />
          ) : (
            <i className="fas fa-user" />
          )}
          {Object.values(notifications).length > 0 && (
            <div className="notification-ping">
              {Object.values(notifications).length}
            </div>
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
            {server.pictureUrl ? (
              <img
                className="side-bar-image"
                src={server.pictureUrl}
                alt={server.name}
              />
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
      <Modal isOpen={call} onRequestClose={closeModal} closeTimeoutMS={120}>
        <CreateVC
          closeModal={closeModal}
          other_user={otherUser}
          setAcceptedCall={setAcceptedCall}
          offer={offer}
        />
      </Modal>

      <div className="video-container">
        <video
          hidden={peerCon?.connectionState === undefined ? true : false}
          autoPlay
          playsInline
          controls={false}
          id="videochat"
        ></video>
        <div hidden={peerCon?.remoteDescription ? false : true}>
          <i onClick={handleDisconnect} class="fas fa-phone-slash"></i>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
