import React from "react";
import MobileNavigation from "../MobileNavigation/MobileNavigation";
import "./Header.scss";
import { Link } from "react-router-dom";
import whitelogoSVG from "../../assets/logos/myflight-white.svg";
import blacklogoSVG from "../../assets/logos/myflight-black.svg";
import logoutPNG from "../../assets/icons/logout.png";
import { logout } from "../../utils/FirebaseFunctions";

const Header = ({ user, ...renderProps }) => {
  return (
    <section className="header">
      <div className="header__mobile">
        <MobileNavigation user={user} />
      </div>
      {renderProps.location.pathname === "/signup" ||
      renderProps.location.pathname === "/login" ? (
        <>
          <Link to="/">
            <img
              src={blacklogoSVG}
              alt="myFlights Logo"
              className="header__logo"
            />
          </Link>
          {renderProps.location.pathname === "/signup" ? (
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
          {user ? (
            <div className="header__desktop">
              <Link id="profile" className="header__link" to="/profile">
                Profile
              </Link>{" "}
              <Link id="Search" className="header__link" to="/search">
                Search
              </Link>{" "}
              <Link id="myflights" className="header__link" to="/myflights">
                MyFlights
              </Link>{" "}
              <Link id="pastflights" className="header__link" to="/pastflights">
                Past Flights
              </Link>{" "}
              <img
                src={logoutPNG}
                alt="logout"
                className="header__logout"
                onClick={logout}
              />
            </div>
          ) : (
            <div className="header__desktop">
              <Link id="home" className="header__link" to="/about">
                About
              </Link>{" "}
              <Link id="signin" className="header__link" to="/login">
                Login
              </Link>
              <Link id="signup" className="header__link" to="/signup">
                Sign Up
              </Link>
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default Header;
