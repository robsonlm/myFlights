import { elastic as Menu } from "react-burger-menu";
import "./MobileNavigation.scss";
import { Link } from "react-router-dom";
import React, { useState, useContext } from "react";

const MobileNavigation = () => {
  const [isOpen, setOpen] = useState(false);

  const handleIsOpen = () => {
    setOpen(!isOpen);
  };

  const closeSideBar = () => {
    setOpen(false);
  };

  // NOTE: You also need to provide styles, see https://github.com/negomi/react-burger-menu#styling
  return (
    <Menu
      className="mobile-navigation"
      isOpen={isOpen}
      onOpen={handleIsOpen}
      onClose={handleIsOpen}
    >
      <Link
        id="home"
        className="menu-item mobile-navigation__link"
        to="/home"
        onClick={closeSideBar}
      >
        HOME
      </Link>
      <Link
        id="profile"
        className="menu-item mobile-navigation__link"
        to="/profile"
        onClick={closeSideBar}
      >
        PROFILE
      </Link>
      <Link
        id="search"
        className="menu-item mobile-navigation__link"
        to="/search"
        onClick={closeSideBar}
      >
        FLIGHT SEARCH
      </Link>
      <Link
        id="myflights"
        className="menu-item mobile-navigation__link"
        to="/myflights"
        onClick={closeSideBar}
      >
        MY FLIGHTS
      </Link>
      <Link
        id="pastflights"
        className="menu-item mobile-navigation__link"
        to="/pastflights"
        onClick={closeSideBar}
      >
        PAST FLIGHTS
      </Link>
      <Link
        id="about"
        className="menu-item mobile-navigation__link"
        to="/about"
        onClick={closeSideBar}
      >
        ABOUT
      </Link>
    </Menu>
  );
};

export default MobileNavigation;
