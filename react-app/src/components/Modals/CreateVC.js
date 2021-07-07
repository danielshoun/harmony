import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "./CreateVC.css";
import createPeerConn from "../../utils/createPeerConn";
import { deletePeerConn, setPeerConn } from "../../store/peerConnection";
import createStream from "../../utils/createStream";

function CreateVC({ closeModal, other_user, setAcceptedCall, offer }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  // const peerCon = useSelector((state) => state.peerCon.peerCon);
  const socket = user.socket;

  const handleAccept = async () => {
    //logic for RTCPeerConnection\
    const peerCon = createPeerConn();

    peerCon.onconnectionstatechange = async function (event) {
      const conState = event.target.connectionState;
      if (conState === "disconnected") {
        peerCon.close();
        dispatch(deletePeerConn());
      }
    };

    await createStream(peerCon);
    dispatch(setPeerConn(peerCon));

    peerCon.setRemoteDescription(new RTCSessionDescription(offer));
    const answer = await peerCon.createAnswer();
    await peerCon.setLocalDescription(answer);
    socket.emit("send_accepted_vc", { other_user: other_user, answer });
    console.log(peerCon, "accepted call");
    closeModal();
    setAcceptedCall(true);
    // setTimeout(() => {
    //   // console.log(peerCon)
    //   peerCon.close()
    //   // peerCon.setLocalDescription(null)
    //   // peerCon.setRemoteDescription(new RTCSessionDescription())
    //   // peerCon.signalingState = "stable"
    //   // console.log(peerCon)

    // }, 300)
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
