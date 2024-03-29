import { useState, useEffect } from "react";
import "./App.scss";
import { Redirect, Route, Switch } from "react-router-dom";
import HomePage from "./components/HomePage/HomePage";
import ProfilePage from "./components/ProfilePage/ProfilePage";
import SearchPage from "./components/SearchPage/SearchPage";
import MyFlightsPage from "./components/MyFlightsPage/MyFlightsPage";
import PastFlightsPage from "./components/PastFlightsPage/PastFlightsPage";
import AboutPage from "./components/AboutPage/AboutPage";
import Header from "./components/Header/Header";
import Signup from "./components/Signup/Signup";
import { auth } from "./utils/firebaseInit";
import { onAuthStateChanged } from "firebase/auth";
import Login from "./components/Login/Login";
import { onSnapshot, doc } from "@firebase/firestore";
import db from "./utils/firebaseInit";

function App() {
  const [user, setUser] = useState({});
  const [userProfile, setUserProfile] = useState({});

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  useEffect(() => {
    if (!!user?.uid) {
      onSnapshot(doc(db, "users", user.uid), (snapshot) => {
        setUserProfile(snapshot.data());
      });
    }
  }, [user]);

  return (
    <div className="app">
      <Route
        path="/"
        render={(renderProps) => <Header user={user} {...renderProps} />}
      />
      <Switch>
        <Route path="/" exact>
          <Redirect to="/home" />
        </Route>
        <Route
          path="/home"
          exact
          render={(renderProps) => (
            <HomePage user={user} userProfile={userProfile} {...renderProps} />
          )}
        />
        <Route
          path="/profile"
          exact
          render={(renderProps) => (
            <ProfilePage
              user={user}
              userProfile={userProfile}
              setUserProfile={setUserProfile}
              {...renderProps}
            />
          )}
        />
        <Route
          path="/search"
          exact
          render={(renderProps) => <SearchPage user={user} {...renderProps} />}
        />
        <Route
          path="/myflights"
          exact
          render={(renderProps) => (
            <MyFlightsPage user={user} {...renderProps} />
          )}
        />
        <Route
          path="/pastflights"
          exact
          render={(renderProps) => (
            <PastFlightsPage user={user} {...renderProps} />
          )}
        />
        <Route
          path="/about"
          exact
          render={(renderProps) => <AboutPage {...renderProps} />}
        />
        <Route
          path="/signup"
          exact
          render={(renderProps) => (
            <Signup user={user} setuser={setUser} {...renderProps} />
          )}
        />
        <Route
          path="/login"
          exact
          render={(renderProps) => (
            <Login user={user} setuser={setUser} {...renderProps} />
          )}
        />
      </Switch>
    </div>
  );
}

export default App;
