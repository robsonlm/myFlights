import React from "react";
import "./HomePage.scss";

const HomePage = ({ user }) => {
  console.log(user);
  return (
    <section className="home">
      <div className="home__wrapper">
        <div className="home__top"></div>
        <div className="home__bottom"></div>
      </div>
    </section>
  );
};

export default HomePage;
