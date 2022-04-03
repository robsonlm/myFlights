import React, { useState, useEffect } from "react";
import { onSnapshot, doc } from "@firebase/firestore";
import db from "../../utils/firebaseInit";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { handleEdit, logout } from "../../utils/FirebaseFunctions";
import "./ProfilePage.scss";

const ProfilePage = ({ user }) => {
  //onSnapshot will update data automatically
  const [userProfile, setUserProfile] = useState({});

  useEffect(() => {
    if (!!user?.uid) {
      onSnapshot(doc(db, "users", user.uid), (snapshot) => {
        setUserProfile(snapshot.data());
      });
    }
  }, [user]);

  return (
    <div>
      {user?.uid ? (
        <section className="profile">
          <ToastContainer theme="colored" />
          <div className="profile__wrapper">
            <div className="profile__left"></div>
            <div className="profile__right">
              <h2 className="profile__title">Update Your Profile:</h2>
              <form className="profile__form">
                <label className="profile__form-label" htmlFor="firstName">
                  First name:
                </label>
                <input
                  className="profile__form-input"
                  type="text"
                  id="firstName"
                  defaultValue={userProfile?.firstName}
                  onChange={(event) => {
                    setUserProfile({
                      ...userProfile,
                      firstName: event.target.value,
                    });
                  }}
                />
                <label className="profile__form-label" htmlFor="lastName">
                  Last name:
                </label>
                <input
                  className="profile__form-input"
                  type="text"
                  id="firstName"
                  defaultValue={userProfile?.lastName}
                  onChange={(event) => {
                    setUserProfile({
                      ...userProfile,
                      lastName: event.target.value,
                    });
                  }}
                />
                <label className="profile__form-label" htmlFor="gender">
                  Gender:
                </label>
                <select
                  className="profile__form-input"
                  id="gender"
                  value={`${userProfile?.gender}`}
                  onChange={(event) => {
                    setUserProfile({
                      ...userProfile,
                      gender: event.target.value,
                    });
                  }}
                >
                  <option value="">Please choose one</option>
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                  <option value="Non-binary">Non-binary</option>
                  <option value="Transgender">Transgender</option>
                  <option value="Intersex">Intersex</option>
                  <option value="Other">Other</option>
                  <option value="PreferNotToSay">I prefer not to say</option>
                </select>
                <button
                  className="profile__form-button"
                  onClick={(event) =>
                    handleEdit(user.uid, "users", userProfile, event)
                  }
                >
                  Update
                </button>
                <button
                  className="profile__form-button-logout"
                  onClick={logout}
                >
                  logout
                </button>
              </form>
            </div>
          </div>
        </section>
      ) : (
        <>
          {
            <section className="profile">
              <div className="profile__wrapper">
                <div className="profile__left"></div>
                <div className="profile__right">
                  <h2 className="profile__title">You are not logged in</h2>
                  <Link to="/login">Take me to the login page</Link>
                </div>
              </div>
            </section>
          }
        </>
      )}
    </div>
  );
};

export default ProfilePage;
