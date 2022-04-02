import React from "react";
import { Link } from "react-router-dom";
import "./MyFlightsCards.scss";

const MyFlightsCards = ({ flight, page }) => {
  return (
    <section className="myflights-card">
      <div className="myflights-card__container">
        <h3 className="myflights-card__flight-name">
          {flight.flight_name ||
            `My flight to ${flight.flight.arrival.airport}`}
        </h3>
        <div className={`myflights-card__headers-${page}`}>
          <div className={`myflights-card__label-${page}`}>
            <div className="myflights-card__label-item">
              <h3 className="myflights-card__label-title">Flight #</h3>
            </div>
            <div className="myflights-card__label-item">
              <h3 className="myflights-card__label-title">Airline</h3>
            </div>
            <div className="myflights-card__label-item">
              <h3 className="myflights-card__label-title">Origin</h3>
            </div>
            <div className="myflights-card__label-item">
              <h3 className="myflights-card__label-title">Destination</h3>
            </div>
            <div className="myflights-card__label-item">
              <h3 className="myflights-card__label-title">Date</h3>
            </div>
            <div className="myflights-card__label-item">
              <h3 className="myflights-card__label-title">Time</h3>
            </div>
          </div>
        </div>
        <div className="myflights-card__wrapper">
          <div className="myflights-card__info">
            <h3 className="myflights-card__title">Flight #</h3>
            <div className="myflights-card__name">
              <p className="myflights-card__text">
                {flight.flight.airline.iata}
                {flight.flight_number}
              </p>
            </div>
          </div>

          <div className="myflights-card__info">
            <h3 className="myflights-card__title">Airline</h3>
            <p className="myflights-card__text">{flight.flight.airline.name}</p>
          </div>

          <div className="myflights-card__info">
            <h3 className="myflights-card__title">Origin</h3>
            <p className="myflights-card__text">
              {flight.flight.departure.airport}
            </p>
          </div>

          <div className="myflights-card__info">
            <h3 className="myflights-card__title">Destination</h3>
            <p className="myflights-card__text">
              {flight.flight.arrival.airport}
            </p>
          </div>

          <div className="myflights-card__info">
            <h3 className="myflights-card__title">Schedule date</h3>
            <p className="myflights-card__text">{flight.flight_date}</p>
          </div>
          <div className="myflights-card__info">
            <h3 className="myflights-card__title">Time</h3>
            <p className="myflights-card__text">
              {flight.flight.departure.time}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyFlightsCards;
