import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  setPersistence,
  browserSessionPersistence,
  sendEmailVerification,
  signOut,
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
import { Navigate, useNavigate } from "react-router-dom";

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
const google_provider = new GoogleAuthProvider();
const SisoContext = createContext(null);

export const useSiso = () => {
  return useContext(SisoContext);
};

export const SisoProvider = (props) => {
  const [user, setUser] = useState("");
  const [userInfo, setUserInfo] = useState(null);
  const [verifiedUser, setVerifiedUser] = useState(false);
  const [receivedData, setReceivedData] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loggedIn , setLoggedIn] = useState(false);
  const navigate = useNavigate();

  const add_user = async ({ ...userData }) => {
    try {
      console.log("called");
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

  const getData = async ({ ...data }) => {
    setUserData((userData) => (userData, data));
    await sign_up_user(data.email, data.password);
    add_user(data);
    sign_in_user(data.email , data.password);
  };
  useEffect(() => {
    onAuthStateChanged(appAuth, (user) => {
      if (user) {
        setUser(user);
        setLoggedIn(!loggedIn);
      } else {
        console.log("logged out");
      }
    });
  }, []);

  useEffect(() => {
    if (user.emailVerified) {
      setVerifiedUser((verifiedUser) => true);
    }
  }, [user.emailVerified]);

  const sign_up_user = async (email, password) => {
    setPersistence(appAuth, browserSessionPersistence).then(async () => {
      try {
        await createUserWithEmailAndPassword(appAuth, email, password).then(
          () => {
            sendEmailVerification(appAuth.currentUser).then(() => {
              alert("Please verify your email via a link sent on your email");
            });
          }
        );
      } catch (error) {
        alert("Enter valid email address");
      }
    });
  };

  const sign_in_user = (username, password) => {
    setPersistence(appAuth, browserSessionPersistence)
      .then(() => {
        signInWithEmailAndPassword(appAuth, username, password);
        get_user_info(username);
        navigate("/home");
      })
      .catch((err) => {
        console.log(err.code);
        console.log(err.message);
      });
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
      });
    } else {
      alert("Internal server error");
    }
  };

  const sign_out = () => {
    signOut(appAuth).then(() => {
      setUser("");
      setUserInfo(null);
    })
  }

  return (
    <SisoContext.Provider
      value={{
        sign_in_user,
        user,
        userInfo,
        getData,
        verifiedUser,
        loggedIn,
        sign_out,
      }}
    >
      {props.children}
    </SisoContext.Provider>
  );
};

//ujjwal13818@gmail.com
//ujjwal@123
