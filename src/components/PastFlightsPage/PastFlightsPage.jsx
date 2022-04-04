import React, { useState, useEffect } from "react";
import MyFlightsCards from "../MyFlightsCards/MyFlightsCards";
import { collection, query, where, getDocs } from "@firebase/firestore";
import db from "../../utils/firebaseInit";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "./PastFlightsPage.scss";

const PastFlightsPage = ({ user }) => {
  const [pastFlightList, setPastFlightList] = useState([]);

  const formatDate = (date) => {
    let d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  };

  console.log(user);

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

        const past = await results.filter(
          (flight) => flight.flight_date < currentDate
        );

        const sortedPast = past.sort((a, b) => {
          if (a.flight_date > b.flight_date) {
            return -1;
          } else if (a.flight_date < b.flight_date) {
            return 1;
          }
          return 0;
        });

        setPastFlightList(sortedPast);
      }
    };
    getCurrentFlightList();
  }, [user]);

  return (
    <div>
      {user?.uid ? (
        <section className="past-flights">
          <div className="past-flights__wrapper">
            <div className="past-flights__left"></div>
            <div className="past-flights__right">
              <article className="past-flights__header">
                <h1 className="past-flights__title">Past Flights List</h1>
                <div className="past-flights__search-wrapper">
                  <Link to="/search">
                    <button className="past-flights__add-button">
                      Search for Flights
                    </button>
                  </Link>
                </div>
              </article>

              <div className="past-flights__cards">
                {pastFlightList ? (
                  pastFlightList.map((flight, i) => (
                    <div className="past-flights__cards-item" key={i}>
                      <MyFlightsCards flight={flight} page="past-flights" />
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
            <section className="past-flights">
              <div className="profile__wrapper">
                <div className="past-flights__left"></div>
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

export default PastFlightsPage;
