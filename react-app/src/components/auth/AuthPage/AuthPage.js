import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./AuthPage.css";
import ServerCard from "./ServerCard";

const AuthPage = () => {
  const servers = useSelector((state) => state.servers);

  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);

  document.title = "Harmony | Explore"

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
          servers.allServers.map((server, i) => {
            return (
              <ServerCard server={server} key={i}/>
            );
          })}
        {showSearchResults &&
          searchResults.map((server, i) => {
            return (
              <ServerCard server={server} key={i}/>
            );
          })}
      </div>
    </div>
  );
};

export default AuthPage;
