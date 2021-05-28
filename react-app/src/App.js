import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import WelcomePage from "./components/WelcomePage";
import LoginForm from "./components/auth/LoginForm/LoginForm";
import SignUpForm from "./components/auth/SignUpForm/SignUpForm";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import NotFound from "./components/NotFound"
import { authenticate } from "./store/session";
import {fetchMemberServers} from "./store/Servers";
import MainContentWrapper from "./components/MainContentWrapper";

function App() {
  const user = useSelector(state => state.session.user)
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
    if(user) {
      (async () => {
        await dispatch(fetchMemberServers())

      })();
    }
    setServersLoaded(true);
  }, [dispatch, user])

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
        <Route path="/not-found" exact={true}>
          <NotFound />
        </Route>
        <Route path="">
          <MainContentWrapper />
        </Route>
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
