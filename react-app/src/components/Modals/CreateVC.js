import React from "react";
import { useSelector } from "react-redux";
import "./CreateVC.css";

function CreateVC({ closeModal, other_user, setAcceptedCall }) {
  const user = useSelector((state) => state.session.user);
  const socket = user.socket;

  const handleAccept = () => {
    //logic for RTCPeerConnection
    socket.emit("send_accepted_vc", { other_user: other_user });
    closeModal();
    setAcceptedCall(true);
  };

  const handleDecline = () => {
    //logic for RTCPeerConnection
    closeModal();
  };

  return (
    <div style={{ height: "400px", width: "400px", backgroundColor: "white" }}>
      <button type="button" onClick={handleAccept}>
        Accept
      </button>
      <button type="button" onClick={handleDecline}>
        Decline
      </button>
    </div>
  );
}

export default CreateVC;
