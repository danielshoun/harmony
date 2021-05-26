import React from "react";
import "./LeaveServer.css";
import {useDispatch} from "react-redux";
import {serverLeave} from "../../store/Servers";
import {useHistory} from 'react-router-dom';

function LeaveServer({ server, closeModal }) {
    const dispatch = useDispatch();
    const history = useHistory();

    const handleLeave = (e) => {
        dispatch(serverLeave(server.id));
        closeModal(e);
        history.push('/')
    }


  return (
    <div className="leave-server-container">
      <div className="leave-server-header">
        <span>Leave '{server.name}' </span>
      </div>
      <div className="leave-server-body">
        <span>
          Are you sure you want to leave{" "}
          <span style={{ fontWeight: "bold" }}>{server.name}</span>? You won't
          be able to rejoin this server unless you are re-invited.
        </span>
      </div>
      <div className="leave-server-buttons">
        <button className="leave-button" onClick={handleLeave}>
          <div>Leave Server</div>
        </button>
        <button className="cancel-button" onClick={closeModal}>Cancel</button>
      </div>
    </div>
  );
}

export default LeaveServer;
