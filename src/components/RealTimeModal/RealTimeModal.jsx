import React, { useEffect, useState } from "react";
import "./RealTimeModal.scss";
import axios from "axios";
import {
  GET_REALTIMEFLIGHT_API_URL,
  GET_WEATHER_API_URL,
} from "../../api/endpoint";
import WeatherCard from "../WeatherCard/WeatherCard";

const RealTimeModal = ({ closeModal, selectedFlight }) => {
  const [flightInfo, setFlightInfo] = useState({});
  const [weatherInfo, setWeatherInfo] = useState({});

  function ChangeFormateDate(oldDate) {
    const timestamp = Date.parse(oldDate);
    const date = new Date(timestamp).toGMTString();
    const newDate = date.replace("GMT", "local time");

    return newDate;
  }

  useEffect(() => {
    const getRealTimeInfo = async () => {
      if (!!selectedFlight?.flight_number) {
        const response = await axios.get(
          GET_REALTIMEFLIGHT_API_URL(
            selectedFlight.dep_iata,
            selectedFlight.arr_iata,
            selectedFlight.flight_number,
            selectedFlight.flight_date
          )
        );
        setFlightInfo(response.data.data[0]);
      }
      const weather = await axios.get(
        GET_WEATHER_API_URL(selectedFlight.arr_iata)
      );
      setWeatherInfo(weather.data);
    };

    getRealTimeInfo();
  }, [selectedFlight]);

  return (
    <>
      {flightInfo?.flight_status ? (
        <div className="realtime-modal">
          <div className="realtime-modal__container">
            <p
              className="realtime-modal__close"
              onClick={() => closeModal(false)}
            >
              &times;
            </p>
            <div className="realtime-modal__body">
              <h3 className="realtime-modal__title">
                Information about your flight!
              </h3>
              <p className="realtime-modal__label">Flight - Airline:</p>
              <p className="realtime-modal__text">
                {flightInfo?.flight.iata} - {flightInfo?.airline.name}
              </p>
              <p className="realtime-modal__label">Status:</p>
              <p className="realtime-modal__text">
                {flightInfo?.flight_status}
              </p>
              <p className="realtime-modal__label">Origin:</p>
              <p className="realtime-modal__text">
                {flightInfo?.departure.airport}
              </p>
              <p className="realtime-modal__label">Destination:</p>
              <p className="realtime-modal__text">
                {flightInfo?.arrival.airport}
              </p>
              <p className="realtime-modal__label">
                Schedule Departure Date and Time:
              </p>
              <p className="realtime-modal__text">
                {`${ChangeFormateDate(flightInfo?.departure.scheduled)}`}
              </p>{" "}
              <p className="realtime-modal__label">Delay:</p>
              <p className="realtime-modal__text">
                {flightInfo?.departure.delay} mins
              </p>{" "}
              <p className="realtime-modal__label">Departure Terminal:</p>
              <p className="realtime-modal__text">
                {flightInfo?.departure.terminal}
              </p>
              <p className="realtime-modal__label">Gate:</p>
              <p className="realtime-modal__text">
                {flightInfo.departure.gate ? flightInfo.departure.gate : "N/A"}
              </p>{" "}
              <p className="realtime-modal__label">Estimated arrival time:</p>
              <p className="realtime-modal__text">
                {`${ChangeFormateDate(flightInfo?.arrival.estimated)}`}
              </p>
              <p className="realtime-modal__label">Arrival Terminal:</p>
              <p className="realtime-modal__text">
                {flightInfo?.arrival.terminal}
              </p>
              <p className="realtime-modal__label">Gate:</p>
              <p className="realtime-modal__text">
                {flightInfo.arrival.gate ? flightInfo.arrival.gate : "N/A"}
              </p>{" "}
              <p className="realtime-modal__label">Weather forecast:</p>
              <WeatherCard weatherInfo={weatherInfo} />
              <div className="realtime-modal__button">
                <button
                  className="realtime-modal__button-cancel"
                  onClick={() => closeModal(false)}
                >
                  Close
                </button>
                {/* <button
              className="realtime-modal__button-add"
              onClick={() => handleAdd()}
            >
              Add to myFlights
            </button> */}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="realtime-modal">
          <div className="realtime-modal__container">
            <p
              className="realtime-modal__close"
              onClick={() => closeModal(false)}
            >
              &times;
            </p>
            <div className="realtime-modal__body">
              <h3 className="realtime-modal__title">
                Information about your flight!
              </h3>

              {flightInfo === undefined ? (
                <>
                  <p className="realtime-modal__label">
                    No live information available for this flight
                  </p>
                  <p className="realtime-modal__text">
                    Please try again later!
                  </p>
                  <p className="realtime-modal__label">Weather forecast:</p>
                  <WeatherCard weatherInfo={weatherInfo} />
                </>
              ) : (
                <p className="realtime-modal__label">Loading</p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RealTimeModal;
