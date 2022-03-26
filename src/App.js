import { collection, onSnapshot } from "@firebase/firestore";
import { useEffect, useState } from "react";
import "./App.scss";
import db from "./utils/firebaseInit";
import {
  handleDelete,
  handleEdit,
  handleNew,
  handleQueryDelete,
} from "./utils/FirebaseFunctions";
import { Redirect, Route, Switch } from "react-router-dom";
import HomePage from "./components/HomePage/HomePage";
import ProfilePage from "./components/ProfilePage/ProfilePage";
import SearchPage from "./components/SearchPage/SearchPage";
import MyFlightsPage from "./components/MyFlightsPage/MyFlightsPage";
import PastFlightsPage from "./components/PastFlightsPage/PastFlightsPage";
import AboutPage from "./components/AboutPage/AboutPage";

function App() {
  return (
    <div className="app">
      <Switch>
        <Route path="/" exact>
          <Redirect to="/home" />
        </Route>
        <Route
          path="/home"
          exact
          render={(renderProps) => <HomePage {...renderProps} />}
        />
        <Route
          path="/profile"
          exact
          render={(renderProps) => <ProfilePage {...renderProps} />}
        />
        <Route
          path="/search"
          exact
          render={(renderProps) => <SearchPage {...renderProps} />}
        />
        <Route
          path="/myflights"
          exact
          render={(renderProps) => <MyFlightsPage {...renderProps} />}
        />
        <Route
          path="/pastflights"
          exact
          render={(renderProps) => <PastFlightsPage {...renderProps} />}
        />
        <Route
          path="/about"
          exact
          render={(renderProps) => <AboutPage {...renderProps} />}
        />
      </Switch>
    </div>
  );
}

export default App;
