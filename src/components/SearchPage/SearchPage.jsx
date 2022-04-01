import React, { useState } from "react";
import { onSnapshot, doc } from "@firebase/firestore";
import db from "../../utils/firebaseInit";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./SearchPage.scss";
import axios from "axios";
import {
  GET_AUTOCOMPLETE_API_URL,
  GET_FUTUREFLIGHT_API_URL,
} from "../../api/endpoint";
import SearchModal from "../SearchModal/SearchModal";

const SearchPage = ({ user }) => {
  const [origin, setOrigin] = useState([]);
  const [destination, setDestination] = useState([]);
  const [textOrigin, setTextOrigin] = useState("");
  const [textDestination, setTextDestination] = useState("");
  const [flight, setFlight] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [resultList, setResultList] = useState([]);
  const [modal, setModal] = useState(false);
  const [selectedFlight, setSelectedFlight] = useState("");

  const loadOrigins = async (origin) => {
    setTextOrigin(origin);
    if (origin.length > 3) {
      const response = await axios.get(GET_AUTOCOMPLETE_API_URL(origin));
      setOrigin(response.data.airportsByCities);
      console.log(response.data.airportsByCities);
    }
  };

  const loadDestination = async (destination) => {
    setTextDestination(destination);
    if (destination.length > 3) {
      const response = await axios.get(GET_AUTOCOMPLETE_API_URL(destination));
      setDestination(response.data.airportsByCities);
      console.log(response.data.airportsByCities);
    }
  };

  const searchFlight = async (departure, arrival, number, event) => {
    event.preventDefault();

    console.log(departure, arrival, number);
    const response = await axios.get(
      GET_FUTUREFLIGHT_API_URL(departure, arrival, number)
    );

    console.log(response.data.data);
    setResultList(response.data.data);
  };

  let showModal = <></>;
  if (modal) {
    console.log(selectedFlight);
    showModal = (
      <SearchModal
        flight={selectedFlight}
        closeModal={setModal}
        user={user}
        departureDate={departureDate}
      />
    );
  }

  return (
    <div>
      {showModal}
      {user?.uid ? (
        <section className="search">
          <ToastContainer theme="colored" />
          <div className="search__wrapper">
            <div className="search__left"> </div>
            <div className="search__right">
              {!resultList[0] && (
                <form
                  className="search__form"
                  onSubmit={(event) => {
                    searchFlight(
                      textOrigin,
                      textDestination || "",
                      flight || "",
                      event
                    );
                  }}
                >
                  <label className="profile__form-label" htmlFor="firstName">
                    Search by Route:
                  </label>
                  <input
                    className="search__input"
                    required="required"
                    type="text"
                    name="origin"
                    placeholder="Origin city"
                    onChange={(e) => loadOrigins(e.target.value)}
                    value={textOrigin}
                    onBlur={() =>
                      setTimeout(() => {
                        setOrigin([]);
                      }, 100)
                    }
                  ></input>
                  <div className="search__input-box-origin">
                    {origin &&
                      origin.map((airport, i) => (
                        <div
                          className="search__input-option"
                          key={i}
                          onClick={() => {
                            setTextOrigin(airport.codeIataAirport);
                            setOrigin([]);
                          }}
                        >
                          <span>
                            {airport.codeIataAirport} - {airport.nameAirport}
                          </span>
                        </div>
                      ))}
                  </div>
                  <input
                    className="search__input"
                    type="text"
                    name="destination"
                    placeholder="Destination city"
                    onChange={(e) => loadDestination(e.target.value)}
                    value={textDestination}
                    onBlur={() =>
                      setTimeout(() => {
                        setDestination([]);
                      }, 100)
                    }
                  ></input>
                  <div className="search__input-box-destination">
                    {destination &&
                      destination.map((airport, i) => (
                        <div
                          className="search__input-option"
                          key={i}
                          onClick={() => {
                            setTextDestination(airport.codeIataAirport);
                            setDestination([]);
                          }}
                        >
                          <span>
                            {airport.codeIataAirport} - {airport.nameAirport}
                          </span>
                        </div>
                      ))}
                  </div>
                  <input
                    className="search__input"
                    type="number"
                    name="fnumber"
                    placeholder="Fligth #"
                    onChange={(e) => setFlight(e.target.value)}
                  ></input>
                  <input
                    className="search__input"
                    type="date"
                    name="fnumber"
                    placeholder="Fligth #"
                    required="required"
                    value={departureDate}
                    onChange={(e) => setDepartureDate(e.target.value)}
                  />

                  <button className="search__button" type="submit">
                    Search
                  </button>
                </form>
              )}
              {resultList[0] && (
                <section className="search__results">
                  <button
                    className="search__button"
                    onClick={() => setResultList([])}
                  >
                    Back to Search
                  </button>
                  <table className="search__results-table">
                    <thead className="search__results-head">
                      <tr className="search__results-line">
                        <th className="search__results-title">Flight#</th>
                        <th className="search__results-title">Airline</th>
                        <th className="search__results-title">From:</th>
                        <th className="search__results-title">To:</th>
                      </tr>
                    </thead>
                    <tbody className="search__results-body">
                      {resultList.map((flight, i) => (
                        <tr
                          onClick={() => {
                            setModal(true);
                            setSelectedFlight(flight);
                          }}
                          className="search__results-line"
                          key={i}
                        >
                          <td className="search__results-text">
                            {flight.flight.number}
                          </td>
                          <td className="search__results-text">
                            {flight.airline.iata}
                          </td>
                          <td className="search__results-text">
                            {flight.departure.iata}
                          </td>
                          <td className="search__results-text">
                            {" "}
                            {flight.arrival.iata}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </section>
              )}
            </div>
          </div>
        </section>
      ) : (
        <>{<Link to="/login">Loading!!! Back to login page.</Link>} </>
      )}
    </div>
  );
};

export default SearchPage;
