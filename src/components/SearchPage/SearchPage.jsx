import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./SearchPage.scss";
import axios from "axios";
import {
  GET_AUTOCOMPLETE_API_URL,
  GET_FUTUREFLIGHT_API_URL,
} from "../../api/endpoint";
import SearchModal from "../SearchModal/SearchModal";
import loadingGIF from "../../assets/icons/loading.gif";

const SearchPage = ({ user }) => {
  const [origin, setOrigin] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
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
    }
  };

  const loadDestination = async (destination) => {
    setTextDestination(destination);
    if (destination.length > 3) {
      const response = await axios.get(GET_AUTOCOMPLETE_API_URL(destination));
      setDestination(response.data.airportsByCities);
    }
  };

  const searchFlight = async (departure, arrival, number, event) => {
    event.preventDefault();
    if (!textOrigin) {
      toast.error("Origin should not be empty");
      event.target.origin.className = "search__input--error";
      return;
    }
    event.target.origin.className = "search__input";

    if (!departureDate) {
      toast.error("Date is required");
      event.target.date.className = "search__input--error";
      return;
    }

    event.target.date.className = "search__input";

    setIsLoading(true);
    try {
      const response = await axios.get(
        GET_FUTUREFLIGHT_API_URL(departure, arrival, number)
      );
      if (response.data.data.length === 0) {
        setResultList([
          {
            empty: "No flights found! Please check your entry and try again!",
          },
        ]);
      } else {
        setResultList(response.data.data);
      }
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
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
                  <label className="search__form-label" htmlFor="firstName">
                    Search by Route:
                  </label>
                  <input
                    className="search__input"
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
                    placeholder="Flight #"
                    onChange={(e) => setFlight(e.target.value)}
                  ></input>
                  <input
                    className="search__input"
                    type="date"
                    name="date"
                    value={departureDate}
                    onChange={(e) => setDepartureDate(e.target.value)}
                  />

                  <button className="search__button" type="submit">
                    Search{" "}
                    {!!isLoading && (
                      <img
                        className="search__button-loading"
                        src={loadingGIF}
                        alt="loading results"
                      ></img>
                    )}
                  </button>
                </form>
              )}
              {resultList[0]?.airline && !isLoading && (
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
                        <th className="search__results-title">Time:</th>
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
                            {flight.airline.iata}
                            {flight.flight.number}
                          </td>
                          <td className="search__results-text">
                            {flight.departure.time}
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
              )}{" "}
              {!isLoading && resultList[0]?.empty && (
                <section className="search__results">
                  <button
                    className="search__button"
                    onClick={() => setResultList([])}
                  >
                    Back to Search
                  </button>
                  <p className="search__results-text">
                    Sorry! we coundn't find any route for your query.
                  </p>
                </section>
              )}
            </div>
          </div>
        </section>
      ) : (
        <>
          {
            <section className="search-flights">
              <div className="profile__wrapper">
                <div className="search__left"></div>
                <div className="profile__right">
                  <h2 className="profile__title">You are not logged in</h2>
                  <Link to="/login">Take me to the login page</Link>
                </div>
              </div>
            </section>
          }{" "}
        </>
      )}
    </div>
  );
};

export default SearchPage;
