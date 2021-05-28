import React from "react";
import { useHistory } from "react-router-dom";
import "./WelcomePage.css";
import { login } from "../../store/session";
import { useSelector, useDispatch } from "react-redux";

const WelcomePage = () => {
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();

  async function handleDemo() {
    const data = await dispatch(login("demo@aa.io", "password"));
    return data;
  }
  async function handleDemo2() {
    const data = await dispatch(login("demo2@aa.io", "password"));
    return data;
  }

  return (
    <div className="welcome-page-container">
      <div className="welcome-header">
        <div className="background-image">
          <img
            className="bg-10"
            src="https://discord.com/assets/5cc3db60569965c8bd92a05f6cb09b8d.svg"
          />
          <img
            className="bg-11"
            src="https://discord.com/assets/5cc3db60569965c8bd92a05f6cb09b8d.svg"
          />
          <img
            className="bg-6"
            src="https://discord.com/assets/690c2345bcaaaa50b71548231a26b696.svg"
          />
          <img
            className="bg-5"
            src="https://discord.com/assets/9c0629769616f9629689a0e68a2e57b7.svg"
          />
          <img
            className="bg-7"
            src="https://discord.com/assets/4bdac631250f5f9e8a4b928d5efa22c8.svg"
          />
          <img
            className="bg-8"
            src="https://discord.com/assets/94acf432b564660994742251c2a5f222.svg"
          />
          <img
            className="bg-3"
            src="https://discord.com/assets/1d9b04db64569bf18409a59a32ffd256.svg"
            alt="background3"
          />
          <img
            className="bg-9"
            src="https://discord.com/assets/1d9b04db64569bf18409a59a32ffd256.svg"
            alt="background3"
          />
          <img
            className="bg-1"
            src="https://discord.com/assets/7b01f72a2054561145b6dd04add417c0.svg"
            alt="background1"
          />
          <img
            className="bg-2"
            src="https://discord.com/assets/e92fcc9ab6e63c1a17e954af347a1f1d.svg"
            alt="background2"
          />
          <img
            className="bg-4"
            src="https://discord.com/assets/31fde13d3508b8ddb01cf817ad09c690.svg"
          />
        </div>
        <div className="welcome-content-container">
          <div className="logo-header">
            <i className="fas fa-peace header-logo" />
            <label>Harmony</label>
          </div>
          <h1>Welcome to Harmony!</h1>
          <div className="welcome-subheader">
            The peaceful chat app for you and your friends.
          </div>
          <div className="buttons-container">
            {user ? (
              <button
                className="header-button header-button-large"
                onClick={() => history.push("/")}
              >
                Go To App
              </button>
            ) : (
              <div>
                <div className="button-row-container">
                  <button
                    className="header-button small-btn"
                    onClick={() => history.push("/login")}
                  >
                    Login
                  </button>
                  <button
                    className="header-button"
                    onClick={() => history.push("/sign-up")}
                  >
                    Sign Up
                  </button>
                </div>
                <div>
                  <button
                    className="header-button small-btn"
                    onClick={() => handleDemo()}
                  >
                    Demo
                  </button>
                  <button
                    className="header-button"
                    onClick={() => handleDemo2()}
                  >
                    Demo 2
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="large-info-container">
        <div className="info-container">
          <div className="info-card">
            <h3>Find your place</h3>
            <div className="card-description">
              Our server browser will help you find somewhere to call home. Use
              the search bar to make it easier! Are your friends already waiting
              for you? Have them send an invite link to join directly.
            </div>
          </div>
          <div className="info-card">
            <h3>Chat in real time</h3>
            <div className="card-description">
              Email is so 20th century. With the power of WebSockets, friends in
              your server can reach you instantly without having to wait! Keep
              the conversation going for as long as you want.
            </div>
          </div>
          <div className="info-card">
            <h3>Get in touch</h3>
            <div className="card-description">
              Have something to say but don't want to broadcast it to the world?
              Start a conversation with a friend and keep it between the two of
              you. We won't share your secrets, but they might!
            </div>
          </div>
        </div>
        <div className="info-container-channel">
          <img src="https://discord.com/assets/c01c644bc9fa2a28678ae2f44969d248.svg" />
          <div className="info-channel-text">
            <h2>Public servers with plenty of room to talk</h2>
            <div className="info-channel-small">
              Harmony servers are organized into topic-based channels where you
              can collaborate, share, and just talk about your day!
            </div>
            <a
              className="repo-redirect"
              href="https://github.com/danielshoun/harmony"
            >
              Github Repo
            </a>
          </div>
        </div>
      </div>
      <div className="about-container">
        <h2>Meet The Developers</h2>
        <div className="dev-info-container">
          <div className="dev-image">Image Placeholder</div>
          <div className="dev-about-content">
            <h3>Kevin Zheng</h3>
            <span className="about-links-container">
              (&nbsp;
              <a href="/" className="about-link  left-link">
                Github
              </a>
              ,&nbsp;
              <a href="/" className="about-link">
                LinkedIn
              </a>
              &nbsp;)
            </span>
            <div className="dev-about-description">
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum."
            </div>
          </div>
        </div>
        <div className="dev-info-container">
          <div className="dev-image">Image Placeholder</div>
          <div className="dev-about-content">
            <h3>David Kim</h3>
            <span className="about-links-container">
              (&nbsp;
              <a href="/" className="about-link  left-link">
                Github
              </a>
              ,&nbsp;
              <a href="/" className="about-link">
                LinkedIn
              </a>
              &nbsp;)
            </span>
            <div className="dev-about-description">
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum."
            </div>
          </div>
        </div>
        <div className="dev-info-container">
          <div className="dev-image">Image Placeholder</div>
          <div className="dev-about-content">
            <h3>Elias Eichen</h3>
            <span className="about-links-container">
              (&nbsp;
              <a href="/" className="about-link  left-link">
                Github
              </a>
              ,&nbsp;
              <a href="/" className="about-link">
                LinkedIn
              </a>
              &nbsp;)
            </span>
            <div className="dev-about-description">
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum."
            </div>
          </div>
        </div>
        <div className="dev-info-container">
          <div className="dev-image">Image Placeholder</div>
          <div className="dev-about-content">
            <h3>Danny Shoun</h3>
            <span className="about-links-container">
              (&nbsp;
              <a href="/" className="about-link  left-link">
                Github
              </a>
              ,&nbsp;
              <a href="/" className="about-link">
                LinkedIn
              </a>
              &nbsp;)
            </span>
            <div className="dev-about-description">
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum."
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
