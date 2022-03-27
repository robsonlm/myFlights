import React from "react";
import MobileNavigation from "../MobileNavigation/MobileNavigation";
import "./Header.scss";
import { Link } from "react-router-dom";
import logoSVG from "../../assets/logos/myflight-white.svg";

const Header = () => {
  return (
    <section className="header">
      <div className="header__mobile">
        <MobileNavigation />
      </div>
      <Link to="/">
        <img src={logoSVG} alt="myFlights Logo" className="header__logo" />
      </Link>
      <div className="header__desktop">
        <Link id="home" className="header__link" to="/home">
          Home
        </Link>
        <Link id="signin" className="header__link" to="/signin">
          Sign In
        </Link>
        <Link id="signup" className="header__link" to="/signup">
          Sign Up
        </Link>
      </div>
    </section>
  );
};

export default Header;
