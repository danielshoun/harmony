import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {createAServer} from "../../../store/Servers";
import {useHistory} from 'react-router-dom';
import './CreateServer.css';

const CreateServer = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [name, setName] = useState('')
    const [image, setImage] = useState(null)
    const [imageUrl, setImageUrl] = useState('')
    const [imageLoading, setImageLoading] = useState(false)

    const handleCreate = async (e) => {
        e.preventDefault();
        const server = {
            name,
            picture_url: imageUrl
        }
        const new_server = await dispatch(createAServer(server))
        history.push(`/servers/${new_server.id}`)

    }

    const uploadImage = async (e) => {
        const formData = new FormData();
        formData.append("image", e.target.files[0])
        console.log(formData)
        setImageLoading(true)
        const res = await fetch('/api/images/', {
            method: "POST",
            body: formData
        });
        if (res.ok) {
            const data = await res.json()
            setImageUrl(data.url);
            setImageLoading(false);
        }
    }

    return (
        <div className="create-server-container">
            <h3>Create A Server</h3>
            <form onSubmit={handleCreate}>
                <div className="create-server-field">
                    <label className="create-server-label">Name</label>
                    <input className="server-name-input" type='text'
                           value={name}
                           onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="create-server-field">
                    <label className="create-server-label">Server Image (optional)</label>
                    {imageUrl ? <img className="server-image" src={imageUrl} alt={name}/> :
                        <div className="server-image">{name[0]}</div>
                    }
                    <input className="server-image-input" type="file"
                           accept="image/*"
                           onChange={(e) => uploadImage(e)}
                    />
                </div>
                <button
                    className="create-btn"
                    type="submit"
                    disabled={imageLoading}>{imageLoading ? "Loading..." : "Create"}</button>
            </form>
        </div>
    )
}

export default CreateServer;
