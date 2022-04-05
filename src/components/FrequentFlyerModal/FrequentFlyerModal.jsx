import React, { useState } from "react";
import "./FrequentFlyerModal.scss";
import deleteSVG from "../../assets/icons/delete-outline-24px.svg";
import { addFFNumber, removeFFNumber } from "../../utils/FirebaseFunctions";
import { toast } from "react-toastify";

const FrequentFlyerModal = ({ userProfile, closeModal }) => {
  const [airline, setAirline] = useState("");
  const [number, setNumber] = useState("");

  const handleAdd = (event) => {
    const payload = { airline: airline, number: number };

    event.preventDefault();
    if (!airline) {
      toast.error("Airline name is required");
      event.target.airline.className = "ff-modal__input--error";
      return;
    }
    event.target.airline.className = "ff-modal__input";

    if (!number) {
      toast.error("Number is required");
      event.target.number.className = "ff-modal__input--error";
      return;
    }

    event.target.number.className = "ff-modal__input";

    addFFNumber("users", payload, userProfile.useruid);
    event.target.reset();
  };

  return (
    <>
      <div className="ff-modal">
        <div className="ff-modal__container">
          <p onClick={() => closeModal(false)} className="ff-modal__close">
            &times;
          </p>
          <div className="ff-modal__body">
            <h3 className="ff-modal__title">Add New Frequent Flyer:</h3>
            <form
              className="ff-modal__form"
              onSubmit={(event) => handleAdd(event)}
            >
              <div className="ff-modal__input-container">
                <input
                  className="ff-modal__input"
                  type="text"
                  id="airline"
                  placeholder="Airline Name"
                  onChange={(event) => {
                    setAirline(event.target.value);
                  }}
                />

                <input
                  className="ff-modal__input"
                  type="text"
                  id="number"
                  placeholder="Frequent Flyer Number"
                  onChange={(event) => {
                    setNumber(event.target.value);
                  }}
                />
              </div>
              <button className="ff-modal__button">Add new number</button>
            </form>
            <h3 className="ff-modal__title">Current numbers:</h3>
            <ul className="ff-modal__list">
              {userProfile?.frequentFlyer &&
                userProfile?.frequentFlyer.map((frequentFlyer, i) => (
                  <li className="ff-modal__item" key={i}>
                    <h1 className="ff-modal__airline">
                      {frequentFlyer.airline}
                    </h1>
                    <h1 className="ff-modal__number">{frequentFlyer.number}</h1>
                    <img
                      className="ff-modal__delete"
                      src={deleteSVG}
                      alt="delete"
                      onClick={() =>
                        removeFFNumber(
                          "users",
                          frequentFlyer,
                          userProfile.useruid
                        )
                      }
                    />
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default FrequentFlyerModal;
