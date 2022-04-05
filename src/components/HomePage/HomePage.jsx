import React from "react";
import "./HomePage.scss";

const HomePage = ({ userProfile }) => {
  return (
    <section className="home">
      <div className="home__wrapper">
        <div className="home__left"></div>
        <div className="home__right">
          {userProfile.firstName ? (
            <>
              <h2 className="home__title">Welcome back,</h2>
              <h1 className="home__name">{userProfile?.firstName}!</h1>
            </>
          ) : (
            <div>
              <h2 className="home__title">Create a list of your next</h2>
              <h2 className="home__text">flights and access</h2>
              <h2 className="home__text">real-time information.</h2>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HomePage;
