import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./AuthPage.css";
import { serverJoin } from "../../../store/Servers";

const AuthPage = () => {
  const servers = useSelector((state) => state.servers);
  const dispatch = useDispatch();

  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);

  const handleSearch = (e) => {
    if (e.target.value === "") {
      setSearchInput("");
      setSearchResults([]);
      setShowSearchResults(false);
    } else {
      setSearchInput(e.target.value);
      let filteredResults = servers.allServers.filter((server) =>
        server.name.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setShowSearchResults(true);
      setSearchResults(filteredResults);
    }
  };

  return (
    <div className="auth-page-home">
      <div className="auth-page-hero-container">
        <div className="auth-page-hero-image">
          <div className="hero-banner-content">
            <h3>Find your community on Harmony</h3>
            <div>
              From gaming, to music, to learning, there's a place for you.
            </div>
            <div className="search-container">
              <input
                className="hero-search-bar"
                placeholder="Explore communities"
                type="text"
                value={searchInput}
                onChange={handleSearch}
              />
              <button className="search-button">
                <i className="fas fa-search" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="auth-page-servers-container">
        {!showSearchResults &&
          servers.allServers.map((server) => {
            return (
              <div className="server-card" key={server.id}>
                {server.pictureUrl ? (
                  <img
                    className="server-image"
                    src={server.pictureUrl}
                    alt={server.name}
                  />
                ) : (
                  <div className="server-image">{server.name[0]}</div>
                )}
                <div className="server-name">{server.name}</div>
                <div className="server-owner">{server.ownerName}</div>
                <div className="server-count">
                  {server.members.length} users
                </div>
                {servers.userServers
                  .map((server) => server.id)
                  .includes(server.id) ? (
                  <div className="joined-text">Joined</div>
                ) : (
                  <button
                    className="button-primary join-button"
                    onClick={() => dispatch(serverJoin(server.id))}
                  >
                    Join
                  </button>
                )}
              </div>
            );
          })}
        {showSearchResults &&
          searchResults.map((server) => {
            return (
              <div className="server-card" key={server.id}>
                {server.pictureUrl ? (
                  <img
                    className="server-image"
                    src={server.pictureUrl}
                    alt={server.name}
                  />
                ) : (
                  <div className="server-image">{server.name[0]}</div>
                )}
                <div className="server-name">{server.name}</div>
                <div className="server-owner">{server.ownerName}</div>
                <div className="server-count">
                  {server.members.length} users
                </div>
                {servers.userServers
                  .map((server) => server.id)
                  .includes(server.id) ? (
                  <div className="joined-text">Joined</div>
                ) : (
                  <button
                    className="button-primary join-button"
                    onClick={() => dispatch(serverJoin(server.id))}
                  >
                    Join
                  </button>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default AuthPage;
