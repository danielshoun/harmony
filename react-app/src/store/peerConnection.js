const SET_PEER_CONN = "peerConn/SET_PEER_CONN";
const DEL_PEER_CONN = "peerConn/DEL_PEER_CONN";

export const setPeerConn = (peerCon) => ({
  type: SET_PEER_CONN,
  peerCon,
});

export const deletePeerConn = () => ({
  type: DEL_PEER_CONN,
});

const initialState = {};

export default function peerConnReducer(state = initialState, action) {
  switch (action.type) {
    case SET_PEER_CONN:
      return { peerCon: action.peerCon };

    case DEL_PEER_CONN:
      const newState = { ...state };
      newState.peerCon = {};
      return newState;
    default:
      return state;
  }
}
