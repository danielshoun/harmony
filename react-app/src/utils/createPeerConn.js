export default function createPeerConn() {
  let peerCon = new RTCPeerConnection({
    iceServers: [{ urls: "stun:stun3.l.google.com:19302" }],
  });

  return peerCon;
}
