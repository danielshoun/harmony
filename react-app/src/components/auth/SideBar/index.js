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
import VoiceChat from "../../Modals/VoiceChat";
import { setPeerConn } from "../../../store/peerConnection";

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
  const [acceptedCall, setAcceptedCall] = useState(true);
  const [otherUser, setotherUser] = useState("");
  const [offer, setOffer] = useState(undefined);
  const [newPeerCon, setNewPeerCon] = useState(false)
  const [acceptedOn, setAcceptedOn] = useState(false)

  console.log(peerCon)

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
    peerCon = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun3.l.google.com:19302" }],
    },);

    peerCon.onconnectionstatechange = async function(event){
      const conState = event.target.connectionState
      if (conState === 'disconnected'){
        peerCon.close()
        // peerCon.setLocalDescription(null)
        // peerCon.setRemoteDescription(new RTCSessionDescription())
        // peerCon.signalingState = "stable"
        console.log(event.target)
        const peerCon1 = new RTCPeerConnection({
          iceServers: [{ urls: "stun:stun3.l.google.com:19302" }],
        });
        createStream(peerCon1)
        peerCon = peerCon1
        dispatch(setPeerConn(peerCon1));
        
      }
    }

    async function createStream(peerCon) {
      const localStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      localStream.getTracks().forEach((track) => {
        peerCon.addTrack(track, localStream);
      });

      const remoteStream = new MediaStream();
      const remoteVideo = document.querySelector("#videochat");
      remoteVideo.srcObject = remoteStream;
      // console.log(remoteVideo);
      peerCon.remoteStream = remoteStream

      peerCon.addEventListener("track", async (e) => {
        remoteStream.addTrack(e.track, remoteStream);
      });

      return peerCon;
    }

    createStream(peerCon);

    dispatch(setPeerConn(peerCon));
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
    if(peerCon && !acceptedOn){
      setAcceptedOn(true)

      socket.on("accepted_vc", async (data) => {
        console.log(peerCon);
        await peerCon.setRemoteDescription(
          new RTCSessionDescription(data["answer"])
        );
  
        setAcceptedCall(true);
      });
    }
  }, [peerCon, socket, acceptedOn])

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
      {/* <Modal
        isOpen={acceptedCall}
        onRequestClose={closeModal}
        closeTimeoutMS={120}
      ></Modal> */}
      <div className="video-container">
        <video autoPlay playsInline controls={false} id="videochat"></video>
      </div>
    </div>
  );
};

export default SideBar;
