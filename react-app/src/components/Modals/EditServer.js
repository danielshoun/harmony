import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { editAServer } from "../../store/Servers";
import "./EditServer.css";

const EditServer = ({ server, closeModal }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [name, setName] = useState(server.name);
  const [imageUrl, setImageUrl] = useState(server.pictureUrl);
  const [imageLoading, setImageLoading] = useState(false);

  const handleEdit = async (e) => {
    e.preventDefault();
    const edit_server = {
      id: server.id,
      name,
      picture_url: imageUrl,
    };
    const new_server = await dispatch(editAServer(edit_server));
    closeModal(e)
    history.push(`/servers/${new_server.id}/${new_server.channels[0].id}`);
  };

  const uploadImage = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    setImageLoading(true);
    const res = await fetch("/api/images/", {
      method: "POST",
      body: formData,
    });
    if (res.ok) {
      const data = await res.json();
      setImageUrl(data.url);
      setImageLoading(false);
    }
  };

  return (
    <div className="edit-server-container">
      <h3>Edit Server</h3>
      <form onSubmit={handleEdit}>
        <div className="create-server-field">
          <label className="create-server-label">Name</label>
          <input
            className="server-name-input"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="create-server-field">
          <label className="create-server-label">Server Image (optional)</label>
          {imageUrl ? (
            <img className="server-image" src={imageUrl} alt={name} />
          ) : (
            <div className="server-image">{name[0]}</div>
          )}
          <input
            className="server-image-input"
            type="file"
            accept="image/*"
            onChange={(e) => uploadImage(e)}
          />
        </div>
        <button className="create-btn" type="submit" disabled={imageLoading}>
          {imageLoading ? "Loading..." : "Edit"}
        </button>
      </form>
    </div>
  );
};

export default EditServer;
