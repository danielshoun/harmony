import React from "react";
import { useHistory } from "react-router-dom";
import "./WelcomePage.css";
import { login } from "../../store/session";
import { useSelector, useDispatch } from "react-redux";
import danny from "./Headshots/danny.png";
import kevin from "./Headshots/kevin.jpg";
import elias from "./Headshots/elias.jpeg";
import david from "./Headshots/david.jpg";

const WelcomePage = () => {
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();

  document.title = "Harmony"

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
        {/*<div className="background-image">*/}
        {/*  <img*/}
        {/*    className="bg-10"*/}
        {/*    src="https://discord.com/assets/5cc3db60569965c8bd92a05f6cb09b8d.svg"*/}
        {/*    alt='Header Banner Background Component'*/}
        {/*  />*/}
        {/*  <img*/}
        {/*    className="bg-11"*/}
        {/*    src="https://discord.com/assets/5cc3db60569965c8bd92a05f6cb09b8d.svg"*/}
        {/*    alt='Header Banner Background Component'*/}
        {/*  />*/}
        {/*  <img*/}
        {/*    className="bg-6"*/}
        {/*    src="https://discord.com/assets/690c2345bcaaaa50b71548231a26b696.svg"*/}
        {/*    alt='Header Banner Background Component'*/}
        {/*  />*/}
        {/*  <img*/}
        {/*    className="bg-5"*/}
        {/*    src="https://discord.com/assets/9c0629769616f9629689a0e68a2e57b7.svg"*/}
        {/*    alt='Header Banner Background Component'*/}
        {/*  />*/}
        {/*  <img*/}
        {/*    className="bg-7"*/}
        {/*    src="https://discord.com/assets/4bdac631250f5f9e8a4b928d5efa22c8.svg"*/}
        {/*    alt='Header Banner Background Component'*/}
        {/*  />*/}
        {/*  <img*/}
        {/*    className="bg-8"*/}
        {/*    src="https://discord.com/assets/94acf432b564660994742251c2a5f222.svg"*/}
        {/*    alt='Header Banner Background Component'*/}
        {/*  />*/}
        {/*  <img*/}
        {/*    className="bg-3"*/}
        {/*    src="https://discord.com/assets/1d9b04db64569bf18409a59a32ffd256.svg"*/}
        {/*    alt="background3"*/}
        {/*  />*/}
        {/*  <img*/}
        {/*    className="bg-9"*/}
        {/*    src="https://discord.com/assets/1d9b04db64569bf18409a59a32ffd256.svg"*/}
        {/*    alt="background3"*/}
        {/*  />*/}
        {/*  <img*/}
        {/*    className="bg-1"*/}
        {/*    src="https://discord.com/assets/7b01f72a2054561145b6dd04add417c0.svg"*/}
        {/*    alt="background1"*/}
        {/*  />*/}
        {/*  <img*/}
        {/*    className="bg-2"*/}
        {/*    src="https://discord.com/assets/e92fcc9ab6e63c1a17e954af347a1f1d.svg"*/}
        {/*    alt="background2"*/}
        {/*  />*/}
        {/*  <img*/}
        {/*    className="bg-4"*/}
        {/*    src="https://discord.com/assets/31fde13d3508b8ddb01cf817ad09c690.svg"*/}
        {/*    alt='Header Banner Background Component'*/}
        {/*  />*/}
        {/*</div>*/}
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
                Launch Harmony
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
          <img src="https://discord.com/assets/c01c644bc9fa2a28678ae2f44969d248.svg" alt=''/>
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
          <img src={kevin} className="dev-image" alt=''/>
          <div className="dev-about-content">
            <h3>Kevin Zheng</h3>
            <span className="about-links-container">
              (&nbsp;
              <a
                href="https://github.com/jiezheng2020"
                className="about-link  left-link"
              >
                Github
              </a>
              ,&nbsp;
              <a
                href="https://www.linkedin.com/in/kevin-zheng-1387a7138"
                className="about-link"
              >
                LinkedIn
              </a>
              &nbsp;)
            </span>
            <div className="dev-about-description">
              I graduated from Northwestern University in 2020 with a bachelors
              in Mechanical Engineering. During my time there, I realized that
              my passions didn't align with what I was learning. I was always
              drawn to the design and problem solving aspect of MechE more so
              than the theory behind it. I believe that the tech industry is the
              future and can impact people's lives in ways the traditional
              manufacturing industry cannot, and I hope to become someone that
              can do that through software and technology.
            </div>
          </div>
        </div>
        <div className="dev-info-container">
          <img src={david} className="dev-image" alt=''/>
          <div className="dev-about-content">
            <h3>David Kim</h3>
            <span className="about-links-container">
              (&nbsp;
              <a
                href="https://github.com/hye-kim"
                className="about-link  left-link"
              >
                Github
              </a>
              ,&nbsp;
              <a
                href="https://www.linkedin.com/in/hye-kim"
                className="about-link"
              >
                LinkedIn
              </a>
              &nbsp;)
            </span>
            <div className="dev-about-description">
              I graduated from Northwestern University in 2019 with a degree in
              Economics. After working in the finance industry for a year, I
              realized that I wanted to pursue something that I was more
              heartfelt about. As a hobby artist, I like making beautiful designs
              and channeling my inner creativity, and I felt that I could
              channel these passions into my work. From sleek single-page apps
              to interesting games, I enjoy making things that allow others to
              feel joy and be inspired.
            </div>
          </div>
        </div>
        <div className="dev-info-container">
          <img src={elias} className="dev-image" alt=''/>
          <div className="dev-about-content">
            <h3>Elias Eichen</h3>
            <span className="about-links-container">
              (&nbsp;
              <a
                href="https://github.com/EEichen"
                className="about-link  left-link"
              >
                Github
              </a>
              ,&nbsp;
              <a
                href="http://linkedin.com/in/elias-eichen-bb15a4198"
                className="about-link"
              >
                LinkedIn
              </a>
              &nbsp;)
            </span>
            <div className="dev-about-description">
              I have always loved to build and solve problems. Programming
              allows me to do both.
            </div>
          </div>
        </div>
        <div className="dev-info-container">
          <img src={danny} className="dev-image" alt=''/>
          <div className="dev-about-content">
            <h3>Danny Shoun</h3>
            <span className="about-links-container">
              (&nbsp;
              <a
                href="https://github.com/danielshoun"
                className="about-link  left-link"
              >
                Github
              </a>
              ,&nbsp;
              <a
                href="https://www.linkedin.com/in/daniel-shoun/"
                className="about-link"
              >
                LinkedIn
              </a>
              &nbsp;)
            </span>
            <div className="dev-about-description">
              I have always had a passion for innovation and creativity. I enjoy
              doing anything and everything artistic, and I see software
              development as a natural extension of that. I first began coding
              as a hobby in elementary school when I learned how to make simple
              modifications for my favorite video game. I received my bachelor's
              degree in Biomedical Sciences from the University of South
              Florida, where I did (now published) research in molecular
              medicine. My dream is to one day combine what I have learned about
              medicine in school with my technological skills.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
