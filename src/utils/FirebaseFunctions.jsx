import {
  collection,
  setDoc,
  doc,
  addDoc,
  deleteDoc,
  query,
  where,
  getDocs,
} from "@firebase/firestore";
import db from "./firebaseInit";

export const handleQueryDelete = async (col) => {
  //await setDoc(docRef, payload);
  const userInputTitle = prompt("Enter title you want to delete");
  const collectionRef = collection(db, col);
  const q = query(collectionRef, where("title", "==", userInputTitle));
  const snapshot = await getDocs(q);
  const results = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

  results.forEach(async (result) => {
    const docRef = doc(db, col, result.id);
    await deleteDoc(docRef);
  });
};

export const handleDelete = async (id, col) => {
  //await setDoc(docRef, payload);
  const docRef = doc(db, col, id);
  await deleteDoc(docRef); //overwrite existing document
};

export const handleEdit = async (id, col) => {
  //await setDoc(docRef, payload);
  const title = prompt("Enter title");
  const docRef = doc(db, col, id);
  const payload = { title: title };
  await setDoc(docRef, payload); //overwrite existing document
};

export const handleNew = async (col) => {
  //await addDoc(collectionRef, payload);
  const title = prompt("Enter title");
  const collectionRef = collection(db, col);
  const payload = {
    title: title,
    description: "ahhh",
    timestamp: Date.now(),
  };
  await addDoc(collectionRef, payload); //overwrite existing document
};
