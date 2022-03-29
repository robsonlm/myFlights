import React from "react";
import MobileNavigation from "../MobileNavigation/MobileNavigation";
import "./Header.scss";
import { Link } from "react-router-dom";
import whitelogoSVG from "../../assets/logos/myflight-white.svg";
import blacklogoSVG from "../../assets/logos/myflight-black.svg";

const Header = ({ ...renderProps }) => {
  return (
    <section className="header">
      <div className="header__mobile">
        <MobileNavigation />
      </div>
      {renderProps.location.pathname == "/signup" ||
      renderProps.location.pathname == "/login" ? (
        <>
          <Link to="/">
            <img
              src={blacklogoSVG}
              alt="myFlights Logo"
              className="header__logo"
            />
          </Link>
          {renderProps.location.pathname == "/signup" ? (
            <div className="header__desktop">
              <Link className="header__signup-link" to="/login">
                Already have an account?{" "}
                <span className="header__signup-link-color">Login</span>
              </Link>
            </div>
          ) : (
            <div className="header__desktop">
              <Link className="header__login-link" to="/signup">
                Not a member yet?{" "}
                <span className="header__login-link-color">Sign Up</span>
              </Link>
            </div>
          )}
        </>
      ) : (
        <>
          <Link to="/">
            <img
              src={whitelogoSVG}
              alt="myFlights Logo"
              className="header__logo"
            />
          </Link>
          <div className="header__desktop">
            <Link id="home" className="header__link" to="/home">
              Home
            </Link>
            <Link id="signin" className="header__link" to="/login">
              Login
            </Link>
            <Link id="signup" className="header__link" to="/signup">
              Sign Up
            </Link>
          </div>
        </>
      )}
    </section>
  );
};

export default Header;
