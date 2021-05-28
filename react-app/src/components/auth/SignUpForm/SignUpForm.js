import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import { signUp } from "../../../store/session";
import "./SignUpForm.css";

const SignUpForm = () => {
  const [username, setUsername] = useState("");
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data.errors) {
        setErrors(data.errors);
      }
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <div className="auth-background-img">
      <a href="/welcome" className="header-logo-container">
        <i className="fas fa-peace header-logo" />
        <label>Harmony</label>
      </a>
      <div className="login-form-container">
        <div className="signup-form-contents">
          <h3>Create an account</h3>
          <form onSubmit={onSignUp}>
            <div className="login-form-fields">
              <label className="login-field-labels">USERNAME</label>
              <input
                type="text"
                name="username"
                onChange={updateUsername}
                value={username}
              ></input>
            </div>
            <div className="login-form-fields">
              <label className="login-field-labels">EMAIL</label>
              <input
                type="text"
                name="email"
                onChange={updateEmail}
                value={email}
              ></input>
            </div>
            <div className="login-form-fields">
              <label className="login-field-labels">PASSWORD</label>
              <input
                type="password"
                name="password"
                onChange={updatePassword}
                value={password}
              ></input>
            </div>
            <div className="login-form-fields">
              <label className="login-field-labels">REPEAT PASSWORD</label>
              <input
                type="password"
                name="repeat_password"
                onChange={updateRepeatPassword}
                value={repeatPassword}
                required={true}
              ></input>
            </div>
            <button className="signup-btn" type="submit">
              Sign Up
            </button>

            <Link className="register-link" to="/login">
              <div className="login-page-redirect">
                Already have an account? Login now!
              </div>
            </Link>
          </form>
        </div>
        {errors.length > 0 && (
          <div className="login-errors">
            {errors.map((error) => (
              <div>{error}</div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SignUpForm;
