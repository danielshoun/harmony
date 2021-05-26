import React from "react";
import "./LeaveServer.css";
import {useDispatch} from "react-redux";
import {deleteServer} from "../../store/Servers";
import {useHistory} from 'react-router-dom';

function DeleteServer({ server, closeModal }) {
    const dispatch = useDispatch();
    const history = useHistory();

    const handleDelete = (e) => {
        dispatch(deleteServer(server));
        closeModal(e);
        history.push('/')
    }


    return (
        <div className="leave-server-container">
            <div className="leave-server-header">
                <span>Delete '{server.name}' </span>
            </div>
            <div className="leave-server-body">
        <span>
          Are you sure you want to delete{" "}
            <span style={{ fontWeight: "bold" }}>{server.name}</span>? This action
            cannot be undone!
        </span>
            </div>
            <div className="leave-server-buttons">
                <button className="leave-button" onClick={handleDelete}>
                    <div>Delete Server</div>
                </button>
                <button className="cancel-button" onClick={closeModal}>Cancel</button>
            </div>
        </div>
    );
}

export default DeleteServer;
