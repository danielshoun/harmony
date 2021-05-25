import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import WelcomePage from "./components/WelcomePage";
import LoginForm from "./components/auth/LoginForm/LoginForm";
import SignUpForm from "./components/auth/SignUpForm/SignUpForm";
import AuthPage from "./components/auth/AuthPage/AuthPage";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/UserProfile/UserProfile";
import { authenticate } from "./store/session";
import SideBar from "./components/auth/SideBar";
import ServerView from "./components/auth/ServerView";

function App() {
  const user = useSelector((state) => state.session.user);
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, []);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      {user && !window.location.href.includes("welcome") && <SideBar />}
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
        <div className="main-content">
          <ProtectedRoute path="/users" exact={true}>
            <UsersList />
          </ProtectedRoute>
          <ProtectedRoute path="/users/:userId" exact={true}>
            <User />
          </ProtectedRoute>
          <ProtectedRoute path="/" exact={true}>
            <AuthPage />
          </ProtectedRoute>
          <ProtectedRoute path="/servers/:serverId">
            <ServerView />
          </ProtectedRoute>
        </div>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
