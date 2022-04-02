import React from "react";
import "./AboutPage.scss";

import "react-toastify/dist/ReactToastify.css";
import linkedinPNG from "../../assets/icons/linkedin.png";
import githubPNG from "../../assets/icons/github.png";

const About = () => {
  return (
    <>
      <section className="about">
        <div className="about__wrapper">
          <div className="about__left"></div>
          <div className="about__right">
            <h1 className="about__title">Robson Maraia's</h1>
            <h2 className="about__subtitle">
              BrainStation WebDev Bootcamp Capstone project
            </h2>
            <div className="about__link">
              <a
                className="about__link-wrapper"
                href="https://linkedin.com/in/robson-maraia"
                target="_blank"
              >
                <img className="about__icon" src={linkedinPNG} alt="linkedin" />
              </a>
              <a
                className="about__link-wrapper"
                href="https://github.com/robsonlm"
                target="_blank"
              >
                <img className="about__icon" src={githubPNG} alt="github" />
              </a>
            </div>
            <h2 className="about__design">
              Design inspired by:{" "}
              <a
                href="https://www.figma.com/@Angelinalim"
                className="about__text"
                target="_blank"
              >
                @Angelinalim
              </a>
            </h2>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
