import React, { useState, useEffect } from "react";
import MyFlightsCards from "../MyFlightsCards/MyFlightsCards";
import { collection, query, where, getDocs } from "@firebase/firestore";
import db from "../../utils/firebaseInit";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "./MyFlightsPage.scss";
import RealTimeModal from "../RealTimeModal/RealTimeModal";

const MyFlightsPage = ({ user }) => {
  const [currentFlightList, setCurrentFlightList] = useState([]);
  const [modal, setModal] = useState(false);
  const [selectedFlight, setSelectedFlight] = useState("");

  const formatDate = (date) => {
    let d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  };

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

        const date = new Date();
        const currentDate = formatDate(date);

        console.log(currentDate);

        const current = await results.filter(
          (flight) => flight.flight_date >= currentDate
        );

        const sortedCurrent = current.sort((a, b) => {
          if (a.flight_date > b.flight_date) {
            return 1;
          } else if (a.flight_date < b.flight_date) {
            return -1;
          }
          return 0;
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
                <h1 className="myflights__title">My Flights</h1>
                <div className="myflights__search-wrapper">
                  <Link to="/search">
                    <button className="myflights__add-button">
                      Search for Flights
                    </button>
                  </Link>
                </div>
              </article>

              <div className="myflights__cards">
                {currentFlightList ? (
                  currentFlightList.map((flight, i) => (
                    <div className="myflights__cards-item" key={i}>
                      <MyFlightsCards
                        flight={flight}
                        setModal={setModal}
                        setSelectedFlight={setSelectedFlight}
                        page="myflights"
                      />
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
        <>
          {
            <section className="myflights">
              <div className="profile__wrapper">
                <div className="myflights__left"></div>
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

export default MyFlightsPage;
