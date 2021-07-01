const SET_PEER_CONN = "peerConn/SET_PEER_CONN";
const GET_PEER_CONN = "peerConn/GET_PEER_CONN";

export const setPeerConn = (peerCon) => ({
  type: SET_PEER_CONN,
  peerCon,
});

const initialState = {};

export default function peerConnReducer(state = initialState, action) {
  switch (action.type) {
    case SET_PEER_CONN:
      return { peerCon: action.peerCon };
    default:
      return state;
  }
}
