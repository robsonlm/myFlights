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

function App() {
  return <div className="App"></div>;
}

export default App;
