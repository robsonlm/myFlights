import React from "react";
import { Link } from "react-router-dom";
import "./MyFlightsCards.scss";

const MyFlightsCards = ({ flight }) => {
  return (
    <section className="myflights-card">
      <div className="myflights-card__container">
        <h3 className="myflights-card__flight-name">
          {flight.flight_name ||
            `My flight to ${flight.flight.arrival.airport}`}
        </h3>
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
            <h3 className="myflights-card__title">Status</h3>
            <p className="myflights-card__text">
              {(flight.status && flight.status) || "Not Available"}
            </p>
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
            <h3 className="myflights-card__title">Date</h3>
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
