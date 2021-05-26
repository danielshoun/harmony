import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createChannel } from "../../store/Channels";
import "./CreateChannel.css";

function CreateChannel({ server, closeModal }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const channel = {
      name,
      description,
      server_id: server.id,
    };
    const new_channel = await dispatch(createChannel(channel));
    history.push(`/servers/${server.id}/${new_channel.id}`);
  };

  return (
    <div className="create-channel-container">
      <div className="create-channel-header">
        <span>Create Text Channel</span>
      </div>
      <form action="" onSubmit={handleSubmit}>
        <div className="create-channel-form-input">
          <label>Channel Name</label>
          <input
            type="text"
            placeholder="new-channel"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="create-channel-form-input">
            <label>Channel Description</label>
          <input
            type="text"
            placeholder="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="create-channel-buttons">
          <button className="create-button" type="submit">
            <div>Create Channel</div>
          </button>
          <button className="cancel-button" onClick={closeModal}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateChannel;
