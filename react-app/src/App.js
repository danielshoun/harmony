import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import WelcomePage from "./components/WelcomePage";
import LoginForm from "./components/auth/LoginForm/LoginForm";
import SignUpForm from "./components/auth/SignUpForm/SignUpForm";
import AuthPage from "./components/auth/AuthPage/AuthPage";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/UserProfile/UserProfile";
import { authenticate } from "./store/session";
import SideBar from "./components/auth/SideBar";
import ServerView from "./components/auth/ServerView";
import Invitation from "./components/auth/Invitation";
import ServerBaseRedirect from "./components/auth/ServerView/ServerBaseRedirect";
import {fetchMemberServers} from "./store/Servers";
import PrivateDmContainer from "./components/auth/ServerView/PrivateDmContainer";
import UsersBar from "./components/auth/ServerView/UsersBar";
import MainContentWrapper from "./components/MainContentWrapper";

function App() {
  const [userLoaded, setUserLoaded] = useState(false);
  const [serversLoaded, setServersLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setUserLoaded(true);
    })();
  }, [dispatch]);
  useEffect(() => {
    (async () => {
      await dispatch(fetchMemberServers())
      setServersLoaded(true);
    })();
  }, [dispatch])

  if (!userLoaded || !serversLoaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/welcome" exact={true}>
          <WelcomePage />
        </Route>
        <Route path="/login" exact={true}>
          <LoginForm />
        </Route>
        <Route path="/sign-up" exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path="">
          <MainContentWrapper />
        </ProtectedRoute>
        {/* <div className="main-content">
          <ProtectedRoute path="/">
            <SideBar />
          </ProtectedRoute>
          <ProtectedRoute path="/users" exact={true}>
            <UsersList />
          </ProtectedRoute>
          <ProtectedRoute path="/users/:userId" exact={true}>
            <User />
          </ProtectedRoute>
          <ProtectedRoute path="/users/:userId/dms">
            <UsersBar />
          </ProtectedRoute>
          <ProtectedRoute path="/users/:userId/dms/:recipientId">
            <PrivateDmContainer />
          </ProtectedRoute>
          <ProtectedRoute path="/" exact={true}>
            <AuthPage />
          </ProtectedRoute>
          <ProtectedRoute path="/invitation/:serverId">
            <Invitation />
          </ProtectedRoute>
          <ProtectedRoute path="/servers/:serverId/:channelId">
            <ServerView />
          </ProtectedRoute>
          <ProtectedRoute path="/servers/:serverId">
            <ServerBaseRedirect />
          </ProtectedRoute>
        </div> */}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
