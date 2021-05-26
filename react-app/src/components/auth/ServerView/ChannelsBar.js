import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import Modal from "react-modal";
import "./ChannelsBar.css";
import LeaveServer from "../../Modals/LeaveServer";
import CreateChannel from "../../Modals/CreateChannel";
import DeleteServer from "../../Modals/DeleteServer";
import InviteServer from "../../Modals/InviteServer";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#36393f",
    border: "none",
    padding: "0",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.75)",
  },
};

Modal.setAppElement("#root");

const ChannelsBar = ({ server }) => {
  const user = useSelector((state) => state.session.user);
  const channels = server.channels;
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const [activeChannel, setActiveChannel] = useState(null);
  const [showServerSettings, setShowServerSettings] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(null);

  const openMenu = () => {
    if (showServerSettings) return;
    setShowServerSettings(true);
  };

  useEffect(() => {
    if (!showServerSettings) return;

    const closeMenu = () => {
      setShowServerSettings(false);
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showServerSettings]);

  useEffect(() => {
    if(!location.pathname.includes('create') && location.pathname.includes('servers')) {
      const channelId = location.pathname.split('/')[3];
      const firstActive = channels.find(channel => channel.id === Number(channelId));
      console.log(firstActive)
      setActiveChannel(firstActive)
    }
  }, [channels, location])

  function openModal(type) {
    setIsOpen(type);
  }

  function closeModal(e) {
    e.stopPropagation();
    setIsOpen(false);
  }

  const handleActive = (channel) => {
    setActiveChannel(channel);
    history.push(`/servers/${server.id}/${channel.id}`);
  };

  return (
    <div id="sidebar" className="sidebar">
      <div
        className="server-header"
        onClick={openMenu}
      >
        <h1>{server.name}</h1>
        <svg
          width="18"
          height="18"
          className={
            showServerSettings === false
              ? "settings-button"
              : "settings-button settings-button-active"
          }
        >
          <g fill="none">
            <path d="M0 0h18v18H0"></path>
            <path
              stroke="currentColor"
              d="M4.5 4.5l9 9"
              stroke-linecap="round"
            ></path>
            <path
              stroke="currentColor"
              d="M13.5 4.5l-9 9"
              stroke-linecap="round"
            ></path>
          </g>
        </svg>
        {showServerSettings && (
          <div className="server-settings-container">
            <div className="server-settings">
              <div className="server-settings-menu">
                <div
                    className="server-settings-menu-item"
                    onClick={() => openModal("invite")}
                >
                  <div>Invite User</div>
                  <div class="menu-item-icon">
                    <svg
                      aria-hidden="false"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="M19.738 10H22V14H19.739C19.498 14.931 19.1 15.798 18.565 16.564L20 18L18 20L16.565 18.564C15.797 19.099 14.932 19.498 14 19.738V22H10V19.738C9.069 19.498 8.203 19.099 7.436 18.564L6 20L4 18L5.436 16.564C4.901 15.799 4.502 14.932 4.262 14H2V10H4.262C4.502 9.068 4.9 8.202 5.436 7.436L4 6L6 4L7.436 5.436C8.202 4.9 9.068 4.502 10 4.262V2H14V4.261C14.932 4.502 15.797 4.9 16.565 5.435L18 3.999L20 5.999L18.564 7.436C19.099 8.202 19.498 9.069 19.738 10ZM12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z"
                      ></path>
                    </svg>
                  </div>
                </div>
                {server.owner.id === user.id && (
                  <div
                    className="server-settings-menu-item"
                    onClick={() => openModal("channel")}
                  >
                    <div>Create Channel</div>
                    <div class="menu-item-icon">
                      <svg width="16" height="16" viewBox="0 0 24 24">
                        <path
                          fill="currentColor"
                          d="M12 2.00098C6.486 2.00098 2 6.48698 2 12.001C2 17.515 6.486 22.001 12 22.001C17.514 22.001 22 17.515 22 12.001C22 6.48698 17.514 2.00098 12 2.00098ZM17 13.001H13V17.001H11V13.001H7V11.001H11V7.00098H13V11.001H17V13.001Z"
                        ></path>
                      </svg>
                    </div>
                  </div>
                )}
                {server.owner.id === user.id ?
                    <div
                        className="server-settings-menu-item leave-server"
                        onClick={() => openModal("delete")}
                    >
                      <div>Delete Server</div>
                      <div className="menu-item-icon">
                        <svg
                            className="icon-LYJorE"
                            aria-hidden="false"
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                        >
                          <path
                              fill="currentColor"
                              d="M10.418 13L12.708 15.294L11.292 16.706L6.586 11.991L11.294 7.292L12.707 8.708L10.41 11H21.949C21.446 5.955 17.177 2 12 2C6.486 2 2 6.487 2 12C2 17.513 6.486 22 12 22C17.177 22 21.446 18.046 21.949 13H10.418Z"
                          ></path>
                        </svg>
                      </div>
                    </div> :
                    <div
                        className="server-settings-menu-item leave-server"
                        onClick={() => openModal("leave")}
                    >
                      <div>Leave Server</div>
                      <div className="menu-item-icon">
                        <svg
                            className="icon-LYJorE"
                            aria-hidden="false"
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                        >
                          <path
                              fill="currentColor"
                              d="M10.418 13L12.708 15.294L11.292 16.706L6.586 11.991L11.294 7.292L12.707 8.708L10.41 11H21.949C21.446 5.955 17.177 2 12 2C6.486 2 2 6.487 2 12C2 17.513 6.486 22 12 22C17.177 22 21.446 18.046 21.949 13H10.418Z"
                          ></path>
                        </svg>
                      </div>
                    </div>
                }
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="channels-bar">
        {channels.map((channel) => {
          return (
            <div
              key={`channel-${channel.id}`}
              className={`channel${
                activeChannel === channel ? " active-channel" : ""
              }`}
              onClick={() => handleActive(channel)}
            >
              <svg width="24" height="24" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M5.88657 21C5.57547 21 5.3399 20.7189 5.39427 20.4126L6.00001 17H2.59511C2.28449 17 2.04905 16.7198 2.10259 16.4138L2.27759 15.4138C2.31946 15.1746 2.52722 15 2.77011 15H6.35001L7.41001 9H4.00511C3.69449 9 3.45905 8.71977 3.51259 8.41381L3.68759 7.41381C3.72946 7.17456 3.93722 7 4.18011 7H7.76001L8.39677 3.41262C8.43914 3.17391 8.64664 3 8.88907 3H9.87344C10.1845 3 10.4201 3.28107 10.3657 3.58738L9.76001 7H15.76L16.3968 3.41262C16.4391 3.17391 16.6466 3 16.8891 3H17.8734C18.1845 3 18.4201 3.28107 18.3657 3.58738L17.76 7H21.1649C21.4755 7 21.711 7.28023 21.6574 7.58619L21.4824 8.58619C21.4406 8.82544 21.2328 9 20.9899 9H17.41L16.35 15H19.7549C20.0655 15 20.301 15.2802 20.2474 15.5862L20.0724 16.5862C20.0306 16.8254 19.8228 17 19.5799 17H16L15.3632 20.5874C15.3209 20.8261 15.1134 21 14.8709 21H13.8866C13.5755 21 13.3399 20.7189 13.3943 20.4126L14 17H8.00001L7.36325 20.5874C7.32088 20.8261 7.11337 21 6.87094 21H5.88657ZM9.41045 9L8.35045 15H14.3504L15.4104 9H9.41045Z"
                ></path>
              </svg>
              {channel.name}
            </div>
          );
        })}
      </div>
      <div className="profile-footer">
        <div className="profile-info">
          <div className="profile-pic">
            <img
              src={
                user.image_url ||
                "https://discord.com/assets/6debd47ed13483642cf09e832ed0bc1b.png"
              }
              alt=""
            />
          </div>
          <div className="profile-name">{user.username}</div>
          <div
            className="profile-settings"
            onClick={() => history.push(`/users/${user.id}`)}
          >
            <svg aria-hidden="false" width="20" height="20" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M19.738 10H22V14H19.739C19.498 14.931 19.1 15.798 18.565 16.564L20 18L18 20L16.565 18.564C15.797 19.099 14.932 19.498 14 19.738V22H10V19.738C9.069 19.498 8.203 19.099 7.436 18.564L6 20L4 18L5.436 16.564C4.901 15.799 4.502 14.932 4.262 14H2V10H4.262C4.502 9.068 4.9 8.202 5.436 7.436L4 6L6 4L7.436 5.436C8.202 4.9 9.068 4.502 10 4.262V2H14V4.261C14.932 4.502 15.797 4.9 16.565 5.435L18 3.999L20 5.999L18.564 7.436C19.099 8.202 19.498 9.069 19.738 10ZM12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z"
              ></path>
            </svg>
          </div>
        </div>
      </div>
      <Modal
          isOpen={modalIsOpen === "invite"}
          onRequestClose={closeModal}
          style={customStyles}
      >
        <InviteServer server={server} closeModal={closeModal} />
      </Modal>
      <Modal
        isOpen={modalIsOpen === "leave"}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <LeaveServer server={server} closeModal={closeModal} />
      </Modal>
      <Modal
        isOpen={modalIsOpen === "channel"}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <CreateChannel server={server} closeModal={closeModal} />
      </Modal>
      <Modal
          isOpen={modalIsOpen === "delete"}
          onRequestClose={closeModal}
          style={customStyles}
      >
        <DeleteServer server={server} closeModal={closeModal} />
      </Modal>
    </div>
  );
};

export default ChannelsBar;
