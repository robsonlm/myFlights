import React, { useState } from "react";
import { register, googlelogin } from "../../utils/FirebaseFunctions";
import { Link } from "react-router-dom";
import "./Signup.scss";
import signUpSVG from "../../assets/images/signup.svg";
import googlePNG from "../../assets/logos/google.png";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = ({ user }) => {
  const [registerFistName, setRegisterFirstName] = useState("");
  const [registerLastName, setRegisterLastName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

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
        <section className="signup">
          <ToastContainer theme="dark" />
          <div className="signup__wrapper">
            <div className="signup__left">
              <img className="signup__image" src={signUpSVG} alt="signup" />
            </div>
            <div className="signup__right">
              <h2 className="signup__title">Sign Up to myFlights</h2>
              <form className="signup__form">
                <label className="signup__form-label" htmlFor="firstname">
                  First Name
                </label>
                <input
                  className="signup__form-input"
                  type="text"
                  id="firstname"
                  onChange={(event) => {
                    setRegisterFirstName(event.target.value);
                  }}
                />
                <label className="signup__form-label" htmlFor="lastname">
                  Last Name
                </label>
                <input
                  className="signup__form-input"
                  type="text"
                  id="lastname"
                  onChange={(event) => {
                    setRegisterLastName(event.target.value);
                  }}
                />
                <label className="signup__form-label" htmlFor="email">
                  Email Address
                </label>
                <input
                  className="signup__form-input"
                  type="email"
                  id="email"
                  onChange={(event) => {
                    setRegisterEmail(event.target.value);
                  }}
                />
                <label className="signup__form-label" htmlFor="password">
                  Password
                </label>
                <input
                  className="signup__form-input"
                  type="password"
                  id="password"
                  onChange={(event) => {
                    setRegisterPassword(event.target.value);
                  }}
                />

                <button
                  className="signup__form-button"
                  onClick={(event) =>
                    register(
                      registerFistName,
                      registerLastName,
                      registerEmail,
                      registerPassword,
                      event
                    )
                  }
                >
                  Sign Up
                </button>
              </form>
              <button className="signup__google-button" onClick={googlelogin}>
                <img
                  src={googlePNG}
                  alt="google"
                  className="signup__google-button-image"
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

export default Signup;
