import React, { useState } from "react";
import {
  login,
  googlelogin,
  sendPasswordReset,
} from "../../utils/FirebaseFunctions";
import { Link } from "react-router-dom";
import "./Login.scss";
import loginSVG from "../../assets/images/login.svg";
import googlePNG from "../../assets/logos/google.png";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = ({ user }) => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  return (
    <>
      {user ? (
        <>
          <section className="login">
            <div className="profile__wrapper">
              <div className="profile__left"></div>
              <div className="profile__right">
                <h2 className="profile__title">You are logged in already</h2>
                <Link to="/profile">Take me to my profile page</Link>
              </div>
            </div>
          </section>
        </>
      ) : (
        <section className="login">
          <ToastContainer theme="colored" />
          <div className="login__wrapper">
            <div className="login__left">
              <img className="login__image" src={loginSVG} alt="login" />
            </div>
            <div className="login__right">
              <h2 className="login__title">Login to myFlights</h2>
              <form className="login__form">
                <label className="login__form-label" htmlFor="email">
                  Email Address
                </label>
                <input
                  className="login__form-input"
                  type="email"
                  id="email"
                  onChange={(event) => {
                    setLoginEmail(event.target.value);
                  }}
                />
                <label className="login__form-label" htmlFor="password">
                  Password
                </label>
                <input
                  className="login__form-input"
                  type="password"
                  id="password"
                  onChange={(event) => {
                    setLoginPassword(event.target.value);
                  }}
                />
                <p
                  onClick={() => sendPasswordReset(loginEmail)}
                  className="login__form-password-reset"
                >
                  Forgot password?
                </p>
                <button
                  className="login__form-button"
                  onClick={(event) => login(loginEmail, loginPassword, event)}
                >
                  Login
                </button>
              </form>
              <button className="login__google-button" onClick={googlelogin}>
                <img
                  src={googlePNG}
                  alt="google"
                  className="login__google-button-image"
                />
                <h4>Sign In with Google</h4>
              </button>
              {/* <button onClick={logout}>logout</button>
              <button onClick={() => sendPasswordReset(registerEmail)}>
                reset password
              </button> */}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Login;
