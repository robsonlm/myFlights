import React from "react";
import "./SearchModal.scss";
import { handleNew } from "../../utils/FirebaseFunctions";

const SearchModal = ({ closeModal, flight, departureDate, user }) => {
  function ChangeFormateDate(oldDate) {
    return oldDate.toString().split("-").reverse().join("/");
  }

  console.log(user);

  const handleAdd = async () => {
    const payload = {
      uid: user.uid,
      flight_number: flight.flight.number,
      dep_iata: flight.departure.iata,
      arr_iata: flight.arrival.iata,
      flight_date: departureDate,
      flight: flight,
      flight_name: "",
      flight_labels: {},
      shared_with: [],
    };
    await handleNew("flights", payload);
    closeModal(false);
    setTimeout(() => {
      window.location = `myflights`;
    }, 5000);
  };

  return (
    <div className="search-modal">
      <div className="search-modal__container">
        <p className="search-modal__close" onClick={() => closeModal(false)}>
          &times;
        </p>
        <div className="search-modal__body">
          <h3 className="search-modal__title">Add to your myFlights list?</h3>
          <p className="search-modal__label">Flight - Airline:</p>
          <p className="search-modal__text">
            {flight.airline.iata}
            {flight.flight.number} - {flight.airline.name}
          </p>
          <p className="search-modal__label">Origin:</p>
          <p className="search-modal__text">{flight.departure.airport}</p>
          <p className="search-modal__label">Destination:</p>
          <p className="search-modal__text">{flight.arrival.airport}</p>
          <p className="search-modal__label">Date:</p>
          <p className="search-modal__text">
            {`${ChangeFormateDate(departureDate)}`}
          </p>
          <div className="search-modal__button">
            <button
              className="search-modal__button-cancel"
              onClick={() => closeModal(false)}
            >
              Cancel
            </button>
            <button
              className="search-modal__button-add"
              onClick={() => handleAdd()}
            >
              Add to myFlights
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
