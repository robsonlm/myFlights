import React, { useState, useEffect } from "react";
import "./HomePage.scss";
import db from "../../utils/firebaseInit";
import {
  handleDelete,
  handleEdit,
  handleQueryDelete,
  handleNew,
} from "../../utils/FirebaseFunctions";
import { onSnapshot, collection } from "@firebase/firestore";

const HomePage = ({ user }) => {
  const [arrayTest, setArrayTest] = useState([]);

  const col = "test";

  // //onSnapshot will update data automatically
  // useEffect(() => {
  //   onSnapshot(collection(db, "test"), (snapshot) => {
  //     return setArrayTest(
  //       snapshot.docs.map((doc) => ({ ...doc.data(), idFireStore: doc.id }))
  //     );
  //   });
  // }, []);

  // function dynamicSort(property) {
  //   let sortOrder = 1;
  //   if (property[0] === "-") {
  //     sortOrder = -1;
  //     property = property.substr(1);
  //   }
  //   return function (a, b) {
  //     let result =
  //       a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
  //     return result;
  //   };
  // }

  return (
    <section className="home">
      {/* <h1>{user?.email}</h1>

      <button onClick={() => handleNew(col)}>New</button>

      <ul>
        {arrayTest.sort(dynamicSort("timestamp")).map((item) => {
          return (
            <li key={item.idFireStore}>
              {" "}
              <h3>{item.title}</h3>
              <p>{item.idFireStore}</p>
              <button onClick={() => handleEdit(item.idFireStore, col)}>
                edit
              </button>
              <button onClick={() => handleDelete(item.idFireStore, col)}>
                delete
              </button>
            </li>
          );
        })}
      </ul>
      <button onClick={() => handleQueryDelete(col)}>query delete</button> */}
    </section>
  );
};

export default HomePage;
