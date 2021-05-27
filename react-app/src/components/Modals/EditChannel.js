import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateChannel } from "../../store/Servers";
import "./CreateChannel.css";

function EditChannel({ server, closeModal }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { channelId } = useParams();
  const channel = server.channels.find(
    (channel) => channel.id === Number(channelId)
  );
  const [name, setName] = useState(channel.name);
  const [description, setDescription] = useState(channel.description || "");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const edit_channel = {
      channel_id: channel.id,
      name,
      description,
    };
    dispatch(updateChannel(edit_channel));
    closeModal(e);
  };

  return (
    <div className="create-channel-container">
      <div className="create-channel-header">
        <span>Edit Text Channel</span>
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
            <div>Edit Channel</div>
          </button>
          <button className="cancel-button" onClick={closeModal}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditChannel;
