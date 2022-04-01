import React, { useEffect, useState } from "react";
import "./RealTimeModal.scss";
import axios from "axios";
import { GET_REALTIMEFLIGHT_API_URL } from "../../api/endpoint";
import { skeletonClasses } from "@mui/material";

const RealTimeModal = ({ closeModal, selectedFlight }) => {
  const [flightInfo, setFlightInfo] = useState([]);

  function ChangeFormateDate(oldDate) {
    return oldDate.toString().split("-").reverse().join("/");
  }

  console.log(selectedFlight);
  console.log(flightInfo);

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
    };

    getRealTimeInfo();
  }, [selectedFlight]);

  return (
    <>
      {flightInfo?.flight_status ? (
        <div className="search-modal">
          <div className="search-modal__container">
            <p
              className="search-modal__close"
              onClick={() => closeModal(false)}
            >
              &times;
            </p>
            <div className="search-modal__body">
              <h3 className="search-modal__title">
                Add to your myFlights list?
              </h3>
              <p className="search-modal__label">Flight - Airline:</p>
              <p className="search-modal__text">
                {flightInfo?.flight.iata} - {flightInfo?.airline.name}
              </p>
              <p className="search-modal__label">Origin:</p>
              <p className="search-modal__text">
                {flightInfo?.departure.airport}
              </p>
              <p className="search-modal__label">Destination:</p>
              <p className="search-modal__text">
                {flightInfo?.arrival.airport}
              </p>
              <p className="search-modal__label">Date:</p>
              <p className="search-modal__text">
                {`${ChangeFormateDate(flightInfo?.departure.scheduled)}`}
              </p>
              <div className="search-modal__button">
                <button
                  className="search-modal__button-cancel"
                  onClick={() => closeModal(false)}
                >
                  Cancel
                </button>
                {/* <button
              className="search-modal__button-add"
              onClick={() => handleAdd()}
            >
              Add to myFlights
            </button> */}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="search-modal">
          <p className="search-modal__close" onClick={() => closeModal(false)}>
            &times;
          </p>
          <div className="search-modal__container">Loading!!!</div>
        </div>
      )}
    </>
  );
};

export default RealTimeModal;
