import React, { createContext, useContext, useState } from "react";

import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  getDoc,
  where,
  getDocs,
  query,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBOVcvCwpIeAj3zS2TIrKBdXI_g5bA4SMs",
  authDomain: "push-my-motive.firebaseapp.com",
  projectId: "push-my-motive",
  storageBucket: "push-my-motive.appspot.com",
  messagingSenderId: "1008844708030",
  appId: "1:1008844708030:web:71a907be6d3b453b7b66ef",
  databaseURL: "https://push-my-motive-default-rtdb.firebaseio.com",
};

const app = initializeApp(firebaseConfig);
const appAuth = getAuth(app);
const userInfodb = getFirestore(app);

const SisoContext = createContext(null);

export const useSiso = () => {
  return useContext(SisoContext);
};

export const SisoProvider = (props) => {
  const [user, setUser] = useState("");
  const [userInfo, setUserInfo] = useState(null);

  const sign_up_user = (email, password) => {
    try {
      return createUserWithEmailAndPassword(appAuth, email, password);
    } catch (error) {
      alert("Enter valid email address");
    }
  };

  const sign_in_user = (username, password) => {
    signInWithEmailAndPassword(appAuth, username, password)
      .then(() => {
        setUser(username);
        get_user_info(username);
      })
      .catch((err) => alert("Wrong credintials"));
  };

  const add_user = async ({ ...userData }) => {
    try {
      const userDocRef = collection(userInfodb, "users");
      await addDoc(userDocRef, {
        first_name: userData.firstName,
        last_name: userData.lastName,
        email: userData.email,
      });
    } catch (error) {
      alert("Error while adding document");
    }
  };

  const get_user_info = async (username) => {
    const userDocRef = collection(userInfodb, "users");
    const q = query(userDocRef, where("email", "==", username));
    const info = await getDocs(q);
    if (info) {
      info.forEach((doc) => {
        setUserInfo((userInfo) => ({
          ...userInfo,
          first_name: doc.data().first_name,
          last_name: doc.data().last_name,
          email: doc.data().email,
        }));
      })
    } else {
      alert("Internal server error");
    }
  };

  return (
    <SisoContext.Provider
      value={{ sign_up_user, sign_in_user, user, add_user, userInfo }}
    >
      {props.children}
    </SisoContext.Provider>
  );
};

//ujjwal13818@gmail.com
//ujjwal@123
