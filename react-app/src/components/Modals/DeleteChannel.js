import React, { useState } from "react";
import "./LeaveServer.css";
import { useDispatch } from "react-redux";
import { deleteChannel } from "../../store/Servers";
import { useHistory, useParams } from "react-router-dom";

function DeleteChannel({ server, closeModal }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { channelId } = useParams();
  const channel = server.channels.find(
    (channel) => channel.id === Number(channelId)
  );
  const [showError, setShowError] = useState(false);

  const handleDelete = (e) => {
    if (server.channels.length > 1) {
      dispatch(deleteChannel(channel));
      closeModal(e);
      history.push(`/servers/${server.id}/${server.channels[0].id}`);
    } else {
      setShowError(true);
    }
  };

  return (
    <div className="leave-server-container">
      <div className="leave-server-header">
        <span>Delete #{channel.name} </span>
      </div>
      <div className="leave-server-body">
        <span>
          Are you sure you want to delete{" "}
          <span style={{ fontWeight: "bold" }}>{channel.name}</span>? This
          action cannot be undone!
        </span>
        {showError && (
          <div>
            <span style={{ color: "red", fontWeight: "bold" }}>
              Cannot delete the only channel in a server!
            </span>
          </div>
        )}
      </div>
      <div className="leave-server-buttons">
        <button className="leave-button" onClick={handleDelete}>
          <div>Delete Channel</div>
        </button>
        <button className="cancel-button" onClick={closeModal}>
          Cancel
        </button>
      </div>
    </div>
  );
}

export default DeleteChannel;
