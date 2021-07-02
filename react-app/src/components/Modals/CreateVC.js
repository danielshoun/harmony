import React from "react";
import { useSelector } from "react-redux";
import "./CreateVC.css";

function CreateVC({ closeModal, other_user, setAcceptedCall, offer }) {
  const user = useSelector((state) => state.session.user);
  const peerCon = useSelector((state) => state.peerCon.peerCon);
  const socket = user.socket;

  const handleAccept = async () => {
    //logic for RTCPeerConnection\
    peerCon.setRemoteDescription(new RTCSessionDescription(offer));
    const answer = await peerCon.createAnswer();
    await peerCon.setLocalDescription(answer);
    socket.emit("send_accepted_vc", { other_user: other_user, answer });
    closeModal();
    setAcceptedCall(true);
    setTimeout(() => {
      // console.log(peerCon)
      peerCon.close()
      // peerCon.setLocalDescription(null)
      // peerCon.setRemoteDescription(new RTCSessionDescription())
      // peerCon.signalingState = "stable"
      // console.log(peerCon)

    }, 300)
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
