import {
  collection,
  setDoc,
  doc,
  addDoc,
  deleteDoc,
  query,
  where,
  getDocs,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "@firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  getAdditionalUserInfo,
  sendPasswordResetEmail,
  updatePassword,
} from "firebase/auth";
import db, { auth } from "./firebaseInit";
import { toast } from "react-toastify";

//Firestore Functions
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
  console.log(id, col);
  const docRef = doc(db, col, id);
  await deleteDoc(docRef); //overwrite existing document
};

export const handleEdit = async (id, col, payload, event) => {
  event.preventDefault();
  //await setDoc(docRef, payload);
  const docRef = doc(db, col, id);
  await setDoc(docRef, payload); //overwrite existing document
  toast.success("Profile successfully updated!", {
    theme: "colored",
  });
};

export const handleNew = async (col, payload) => {
  const collectionRef = collection(db, col);
  try {
    await addDoc(collectionRef, payload);
    toast.success("Flight added to the list", {
      theme: "colored",
    });
  } catch (error) {
    console.log(error.message);
    toast.error(error.message);
  }
};

export const addFFNumber = async (col, payload, id) => {
  const docRef = doc(db, col, id);

  try {
    await updateDoc(docRef, { frequentFlyer: arrayUnion(payload) });
    toast.success("Number added to the list", {
      theme: "colored",
    });
  } catch (error) {
    console.log(error.message);
    toast.error(error.message);
  }
};

export const removeFFNumber = async (col, payload, id) => {
  const docRef = doc(db, col, id);

  try {
    await updateDoc(docRef, { frequentFlyer: arrayRemove(payload) });
    toast.success("Number removed from the list", {
      theme: "colored",
    });
  } catch (error) {
    console.log(error.message);
    toast.error(error.message);
  }
};

//Auth Functions

const provider = new GoogleAuthProvider();

export const register = async (firstName, lastName, email, password, event) => {
  event.preventDefault();
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    const userUid = result.user.uid;
    const data = {
      useruid: userUid,
      firstName,
      lastName,
      frequentFlyer: [{ airline: "", number: "" }],
    };
    await setDoc(doc(db, "users", userUid), data);
    if (userUid) {
      window.location = `profile`; //After successful login, user will be redirected to home.html
    }
  } catch (error) {
    console.log(error.message);
    toast.error(error.message);
  }
};

export const login = async (email, password, event) => {
  event.preventDefault();
  try {
    const user = await signInWithEmailAndPassword(auth, email, password);
    window.location = `home`;
    return user;
  } catch (error) {
    console.log(error.message);
    toast.error(error.message);
  }
};

export const logout = async () => {
  await signOut(auth);
  window.location = `home`;
};

export const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    toast.info("Password reset link sent!", {
      theme: "colored",
    });
  } catch (error) {
    console.error(error);
    toast.error(error.message, {
      theme: "colored",
    });
  }
};

const addUser = async (userUid) => {
  console.log(userUid);
  const userRef = doc(db, "users", userUid);
  const data = {
    useruid: userUid,
    firstName: "",
    lastName: "",
    frequentFlyer: [{ airline: "", number: "" }],
  };
  await setDoc(userRef, data);
};

export const googlelogin = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      //const credential = GoogleAuthProvider.credentialFromResult(result);
      // const token = credential.accessToken;

      // The signed-in user info.
      const user = result.user;
      // ...
      const { isNewUser } = getAdditionalUserInfo(result);
      if (isNewUser) {
        addUser(user.uid).then(() => (window.location = `profile`));
      } else {
        window.location = `home`;
      }
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
      toast.error(errorCode, errorMessage, email, credential);
    });
};

export const changePassword = async (user, newPassword) => {
  try {
    await updatePassword(user, newPassword);
    toast.success("Password changed successfully!", {
      theme: "colored",
    });
  } catch (error) {
    console.log("Erro:", error);
  }
};
