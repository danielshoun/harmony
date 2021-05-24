import React, {useEffect, useState} from "react";
import "./AuthPage.css";

const AuthPage = () => {
  const [servers, setServers] = useState([])

  useEffect(() => {
    const tempServers = [
      {id: 1, name: 'Test Server 2', ownerName: 'Demo User', userCount: 100, imageUrl: null},
      {id: 2, name: 'Test Server 3', ownerName: 'Demo User', userCount: 50, imageUrl: null},
      {id: 3, name: 'Test Server 1', ownerName: 'Demo User', userCount: 200, imageUrl: null},
      {id: 4, name: 'Test Server 4', ownerName: 'Demo User', userCount: 300, imageUrl: null},
      {id: 5, name: 'Test Server 5', ownerName: 'Demo User', userCount: 40, imageUrl: null},
      {id: 6, name: 'Test Server 6', ownerName: 'Demo User', userCount: 1, imageUrl: null},
      {id: 7, name: 'Test Server 7', ownerName: 'Demo User', userCount: 10, imageUrl: null},
      {id: 8, name: 'Test Server 8', ownerName: 'Demo User', userCount: 25, imageUrl: null},
    ]

    setServers(tempServers)
  }, [])

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
            />
          </div>
        </div>
      </div>
      <div className="auth-page-servers-container">
        {servers.map(server => {
          return (
              <div className="server-card" key={server.id}>
                {server.imageUrl ? <img className="server-image" src={server.imageUrl} alt={server.name}/> : <div className="server-image">{server.name[0]}</div>}
                <div className="server-name">{server.name}</div>
                <div className="server-owner">{server.ownerName}</div>
                <div className="server-count">{server.userCount} users</div>
                <button className="button-primary join-button">Join</button>
              </div>
          )
        })}
      </div>
    </div>
  );
};

export default AuthPage;
