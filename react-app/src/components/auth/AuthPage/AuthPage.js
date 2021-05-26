import React, {useEffect, useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import "./AuthPage.css";
import { fetchMemberServers } from '../../../store/Servers'
import { serverJoin } from '../../../store/Servers';


const AuthPage = () => {
  // const [servers, setServers] = useState([])
  const servers = useSelector((state) => state.servers)
  const dispatch = useDispatch()
  // useEffect(() => {
  //   dispatch(fetchMemberServers())
  // }, [dispatch])

  return (
    <div className="auth-page-home">
      <div className="auth-page-hero-container">
        <div className="auth-page-hero-image">
          <div className="hero-banner-content">
            <h3>Find your community on Harmony</h3>
            <div>
              From gaming, to music, to learning, there's a place for you.
            </div>
            <div className='search-container'>
              <input
                  className="hero-search-bar"
                  placeholder="Explore communities"
                  type="text"
              />
              <button className="search-button">
                <i className="fas fa-search"/>
              </button>
            </div>

          </div>
        </div>
      </div>
      <div className="auth-page-servers-container">
        {servers.allServers.map(server => {
          return (
              <div className="server-card" key={server.id}>
                {server.pictureUrl ? <img className="server-image" src={server.pictureUrl} alt={server.name}/> : <div className="server-image">{server.name[0]}</div>}
                <div className="server-name">{server.name}</div>
                <div className="server-owner">{server.ownerName}</div>
                <div className="server-count">{server.members.length} users</div>
                {servers.userServers.map(server => server.id).includes(server.id) ? <div className="joined-text">Joined</div> :
                    <button className="button-primary join-button"
                            onClick={() => dispatch(serverJoin(server.id))}>Join</button>
                }
              </div>
          )
        })}
      </div>
    </div>
  );
};

export default AuthPage;
