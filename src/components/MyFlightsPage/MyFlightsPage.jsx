import React, { useState, useEffect } from "react";
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
import {
  GET_AUTOCOMPLETE_API_URL,
  GET_FUTUREFLIGHT_API_URL,
} from "../../api/endpoint";
import SearchModal from "../SearchModal/SearchModal";

const MyFlightsPage = ({ user }) => {
  const [flightList, setFlightList] = useState([]);

  useEffect(async () => {
    if (!!user?.uid) {
      const collectionRef = collection(db, "flights");
      const q = await query(collectionRef, where("uid", "==", user.uid));
      const snapshot = await getDocs(q);
      const results = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setFlightList(results);
    }
  }, [user]);

  // let showModal = <></>;
  // if (modal) {
  //   console.log(selectedFlight);
  //   showModal = (
  //     <SearchModal
  //       flight={selectedFlight}
  //       closeModal={setModal}
  //       user={user}
  //       departureDate={departureDate}
  //     />
  //   );
  // }

  console.log(flightList);

  return (
    <div>
      {/* {showModal} */}
      {user?.uid ? (
        <section className="search">
          <ToastContainer theme="colored" />
          <div className="search__wrapper">
            <div className="search__left"></div>
            <div className="search__right"></div>
          </div>
        </section>
      ) : (
        <>{<Link to="/login">Loading!!! Back to login page.</Link>} </>
      )}
    </div>
  );
};

export default MyFlightsPage;
