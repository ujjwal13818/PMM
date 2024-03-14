import React, { createContext, useContext, useEffect, useState } from "react";
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
  updateProfile,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  getDoc,
  where,
  getDocs,
  query,
  doc,
  setDoc,
  updateDoc,
  onSnapshot,
} from "firebase/firestore";
import { Navigate, useNavigate } from "react-router-dom";
import { getStorage , ref , uploadBytesResumable , getDownloadURL } from "firebase/storage";

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
const storage = getStorage();

export const useSiso = () => {
  return useContext(SisoContext);
};

export const SisoProvider = (props) => {
  const [user, setUser] = useState("");
  const [userInfo, setUserInfo] = useState(null); //use this to reference the user
  const [verifiedUser, setVerifiedUser] = useState(false);
  const [receivedData, setReceivedData] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [allPosts, setAllPosts] = useState([]); // all user posts.
  const navigate = useNavigate();
  const [allFriendsPosts, setAllFriendsPosts] = useState([]); // all friends post of the user;
  const [usersLiked, setUsersLiked] = useState([]);
  const [refreshFeed, setRefreshFeed] = useState(false);

  //adding user name and email to his database
  const add_user = async ({ ...userData }) => {
    try {
       const date = new Date().getTime();
       const storageRef = ref(storage, `${userData.email + date}`);
      const userDocRef = doc(userInfodb, "users", userData.email);
      await uploadBytesResumable(storageRef, userData.profilePic).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          await setDoc(userDocRef, {
            first_name: userData.firstName,
            last_name: userData.lastName,
            email: userData.email,
            profilePic: downloadURL,
          });
        });
      });
      
    } catch (error) {
      alert("Error while adding document");
    }
  };

  //data is stored at firestore;
  const getData = async ({ ...data }) => {
    console.log(data);
    setUserData((userData) => (userData, data));
    await sign_up_user(data.email, data.password);
    add_user(data);
    await sign_in_user(data.email, data.password);
  };

  //handling login and logout
  useEffect(() => {
    onAuthStateChanged(appAuth, (user) => {
      if (user) {
        get_user_info(user.email);
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
        ).then(
          () => {

          }
        );
      } catch (error) {
        alert("Enter valid email address");
      }
    });
  };

  const sign_in_user = async (username, password) => {
    setPersistence(appAuth, browserSessionPersistence)
      .then(async () => {
        const userCred = await signInWithEmailAndPassword(
          appAuth,
          username,
          password
        );
        const user1 = userCred.user;
        if (user1) {
          setUser(user1);
        }
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
          profilePic: doc.data().profilePic,
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
    });
  };

  //posting
  const postMotive = async (motive) => {
    try {
      const postId = Date.now().toString();
      const userMotivesRef = doc(
        userInfodb,
        "users",
        userInfo.email,
        "userMotives",
        postId
      );
      await setDoc(userMotivesRef, {
        Motive: motive,
        Likes: 0,
        Comments: [],
        emailId: userInfo.email,
        postId: postId,
        fullName: userInfo.first_name + " " + userInfo.last_name,
        likedBy: [],
        profilePic : userInfo.profilePic,
      });
      console.log("Success");
    } catch (err) {
      console.error("Error adding document: ", err);
    }
  };

  //users own posts
  useEffect(() => {
    const getAllPosts = async () => {
      const allPosts = await getDocs(
        collection(userInfodb, "users", user.email, "userMotives")
      );
      allPosts.forEach((doc) => {
        setAllPosts((prevPosts) => {
          return [...prevPosts, doc.data()];
        });
      });
    };
    getAllPosts();
  }, []);

  //all friend's posts;
  useEffect(async () => {
    const get_all_friends_posts = async () => {
      const allUsers = await getDocs(collection(userInfodb, "users"));
      allUsers.forEach(async (userDoc) => {
        const userId = userDoc.id;
        const thisUserMotives = await getDocs(
          collection(userInfodb, "users", userId, "userMotives")
        );
        thisUserMotives.forEach((motives) => {
          setAllFriendsPosts((prev) => {
            const allPosts = [...prev, motives.data()];
            return allPosts.sort((a, b) => b.postId - a.postId);
          });
        });
      });
    };
    get_all_friends_posts();
  }, []);

  const likedUsers = async (userId, postId) => {
    // const thePostRef = doc(userInfodb, "users", userId, "userMotives", postId);
    // const thePost = await getDoc(thePostRef);
    // thePost.data().likedBy.forEach(async (likedEmail, index) => {
    //   const docRef = doc(userInfodb, "users", likedEmail);
    //   const userData = await getDoc(docRef);
    //   setUsersLiked((prev) => {
    //     return [
    //       ...prev,
    //       userData.data().first_name + " " + userData.data().last_name,
    //     ];
    //   });
    // });
    const unsub = onSnapshot(
      doc(userInfodb, "users", userId, "userMotives", postId),
      (thePost) => {
        setUsersLiked([]);
        thePost.data().likedBy.forEach(async (likedEmail, index) => {
          const docRef = doc(userInfodb, "users", likedEmail);
          const userData = await getDoc(docRef);

          setUsersLiked((prev) => {
            return [
              ...prev,
              userData.data().first_name + " " + userData.data().last_name,
            ];
          });
        });
      }
    );
    return () => {
      unsub();
    };
  };

  const updatePushes = async (userId, postId, flag, likedBy) => {
    const thePostRef = doc(userInfodb, "users", userId, "userMotives", postId);
    const thePost = await getDoc(thePostRef);
    var newLike = thePost.data().Likes;
    var likedByArray = thePost.data().likedBy;
    if (flag) {
      newLike = newLike + 1;
      likedByArray = [...likedByArray, likedBy];
    }
    if (!flag) {
      newLike = newLike - 1;
      likedByArray = likedByArray.filter((item) => item !== likedBy);
    }
    await updateDoc(thePostRef, {
      Likes: newLike,
      likedBy: likedByArray,
    });
  };
  const clearLikedBy = () => {
    setUsersLiked([]);
  };
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
        postMotive,
        allPosts,
        allFriendsPosts,
        updatePushes,
        usersLiked,
        clearLikedBy,
        likedUsers,
      }}
    >
      {props.children}
    </SisoContext.Provider>
  );
};
