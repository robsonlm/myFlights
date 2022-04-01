import React, { useState, useEffect } from "react";
import MyFlightsCards from "../MyFlightsCards/MyFlightsCards";
import {
  onSnapshot,
  doc,
  collection,
  query,
  where,
  getDocs,
} from "@firebase/firestore";
import db from "../../utils/firebaseInit";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./MyFlightsPage.scss";
import axios from "axios";
import { GET_REALTIMEFLIGHT_API_URL } from "../../api/endpoint";

import RealTimeModal from "../RealTimeModal/RealTimeModal";

const MyFlightsPage = ({ user }) => {
  const [currentFlightList, setCurrentFlightList] = useState([]);
  const [pastFlightList, setPastFlightList] = useState([]);
  const [modal, setModal] = useState(false);
  const [selectedFlight, setSelectedFlight] = useState("");

  const date = new Date();
  const formatDate = (date) => {
    let d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  };

  const currentDate = formatDate(date);

  useEffect(() => {
    const getCurrentFlightList = async () => {
      if (!!user?.uid) {
        const collectionRef = collection(db, "flights");
        const q = await query(collectionRef, where("uid", "==", user.uid));
        const snapshot = await getDocs(q);
        const results = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        const current = await results.filter(
          (flight) => flight.flight_date >= currentDate
        );
        const past = await results.filter(
          (flight) => flight.flight_date < currentDate
        );

        const sortedCurrent = current.sort((a, b) => {
          if (a.flight_date > b.flight_date) {
            return 1;
          } else if (a.flight_date < b.flight_date) {
            return -1;
          }
        });

        setCurrentFlightList(sortedCurrent);
      }
    };
    getCurrentFlightList();
  }, [user]);

  let showModal = <></>;
  if (modal) {
    showModal = (
      <RealTimeModal selectedFlight={selectedFlight} closeModal={setModal} />
    );
  }

  return (
    <div>
      {showModal}
      {user?.uid ? (
        <section className="myflights">
          <div className="myflights__wrapper">
            <div className="myflights__left"></div>
            <div className="myflights__right">
              <article className="myflights__header">
                <h1 className="myflights__title">My Flights List</h1>
                <div className="myflights__search-wrapper">
                  <Link to="/search">
                    <button className="myflights__add-button">
                      Search for Flights
                    </button>
                  </Link>
                </div>
              </article>
              <div className="myflights__main">
                <div className="myflights__label">
                  <div className="myflights__label-item">
                    <h3 className="myflights__label-title">Flight #</h3>
                  </div>
                  <div className="myflights__label-item">
                    <h3 className="myflights__label-title">Status</h3>
                  </div>
                  <div className="myflights__label-item">
                    <h3 className="myflights__label-title">Origin</h3>
                  </div>
                  <div className="myflights__label-item">
                    <h3 className="myflights__label-title">Destination</h3>
                  </div>
                  <div className="myflights__label-item">
                    <h3 className="myflights__label-title">Date</h3>
                  </div>
                  <div className="myflights__label-item">
                    <h3 className="myflights__label-title">Time</h3>
                  </div>
                </div>
              </div>
              <div className="myflights__cards">
                {currentFlightList ? (
                  currentFlightList.map((flight, i) => (
                    <div
                      key={i}
                      onClick={() => {
                        setModal(true);
                        setSelectedFlight(flight);
                      }}
                    >
                      <MyFlightsCards flight={flight} />
                    </div>
                  ))
                ) : (
                  <div />
                )}
              </div>
            </div>
          </div>
        </section>
      ) : (
        <>{<Link to="/login">Loading!!! Back to login page.</Link>} </>
      )}
    </div>
  );
};

export default MyFlightsPage;
