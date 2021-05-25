import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import { login } from "../../../store/session";
import "./LoginForm.css";

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data.errors) {
      setErrors(data.errors);
    }
  };
  const LoginDemo = async () => {
    setEmail("demo@aa.io");
    setPassword("password");
    const data = await dispatch(login("demo@aa.io", "password"));
  };
  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <div className="auth-background-img">
      <div className="login-form-container">
        <div className="login-form-contents">
          <h3>Welcome Back!</h3>
          <div>We're so excited to see you again!</div>
          <form onSubmit={onLogin}>
            <div className="login-form-fields">
              <label className="login-field-labels" htmlFor="email">
                EMAIL
              </label>
              <input
                name="email"
                type="text"
                value={email}
                onChange={updateEmail}
              />
            </div>
            <div className="login-form-fields">
              <label className="login-field-labels" htmlFor="password">
                PASSWORD
              </label>
              <input
                name="password"
                type="password"
                value={password}
                onChange={updatePassword}
              />

              <button className="login-btn" type="submit">
                Login
              </button>
              <button className="demo-btn" onClick={() => LoginDemo()}>
                Demo
              </button>
              <Link className="register-link" to="/sign-up">
                <div className="login-page-redirect">
                  Don't have an account? Register now!
                </div>
              </Link>
            </div>
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

export default LoginForm;
