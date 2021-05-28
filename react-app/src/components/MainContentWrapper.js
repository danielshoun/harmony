import React from "react";
import AuthPage from "./auth/AuthPage/AuthPage";
import ProtectedRoute from "./auth/ProtectedRoute";
import UsersList from "./UsersList";
import User from "./UserProfile/UserProfile";
import SideBar from "./auth/SideBar";
import ServerView from "./auth/ServerView";
import Invitation from "./auth/Invitation";
import ServerBaseRedirect from "./auth/ServerView/ServerBaseRedirect";
import PrivateDmContainer from "./auth/ServerView/PrivateDmContainer";
import UsersBar from "./auth/ServerView/UsersBar";
import { Redirect, Switch } from "react-router-dom";

const MainContentWrapper = () => {
  return (
    <div className="main-content">
      <ProtectedRoute path="/" renderUnauthenticated={() => null}>
        <SideBar />
      </ProtectedRoute>
      <Switch>
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
        {/* <ProtectedRoute>
          <Redirect to="/" />
        </ProtectedRoute> */}
        <ProtectedRoute
          renderUnauthenticated={() => <Redirect to="/not-found" />}
        >
          <Redirect to="/" />
        </ProtectedRoute>
      </Switch>
    </div>
  );
};

export default MainContentWrapper;
