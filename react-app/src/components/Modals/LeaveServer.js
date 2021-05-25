import React from "react";
import "./LeaveServer.css";

function LeaveServer({ server, closeModal }) {
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
        <button className="leave-button">
          <div>Leave Server</div>
        </button>
        <button className="cancel-button" onClick={closeModal}>Cancel</button>
      </div>
    </div>
  );
}

export default LeaveServer;
