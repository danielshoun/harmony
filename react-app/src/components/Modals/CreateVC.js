import React from "react";
import "./CreateVC.css";

function CreateVC({ closeModal }) {
  const handleAccept = () => {
    //logic for RTCPeerConnection
    closeModal();
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
