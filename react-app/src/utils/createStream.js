export default async function createStream(peerCon) {
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
  peerCon.remoteStream = remoteStream;

  peerCon.addEventListener("track", async (e) => {
    remoteStream.addTrack(e.track, remoteStream);
  });

  return peerCon;
}
