import React from "react";
import "./AuthPage.css";

const AuthPage = () => {
  return (
    <div className="auth-page-home">
      <div className="auth-page-hero-container">
        <div className="auth-page-hero-image">
          <div className="hero-banner-content">
            <h3>Find your community on Harmony</h3>
            <div>
              From gaming, to music, to learning, there's a place for you.
            </div>
            <input
              className="hero-search-bar"
              placeholder="Explore communities"
              type="text"
            ></input>
          </div>
        </div>
      </div>
      <div className="auth-page-servers-container">
        <div className="servers-list-row">
          <div className="server-row-container">Server 1</div>
          <div className="server-row-container">Server 2</div>
          <div className="server-row-container">Server 3</div>
          <div className="server-row-container">Server 4</div>
        </div>
        <div className="servers-list-row">
          <div className="server-row-container">Server 1</div>
          <div className="server-row-container">Server 2</div>
          <div className="server-row-container">Server 3</div>
          <div className="server-row-container">Server 4</div>
        </div>
        <div className="servers-list-row">
          <div className="server-row-container">Server 1</div>
          <div className="server-row-container">Server 2</div>
          <div className="server-row-container">Server 3</div>
          <div className="server-row-container">Server 4</div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
