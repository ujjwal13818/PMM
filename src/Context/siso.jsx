import React, { createContext, useContext, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  setPersistence,
  browserSessionPersistence,
  sendEmailVerification,
  signOut,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
  deleteUser,
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
  deleteDoc,
} from "firebase/firestore";
import { Navigate, useNavigate } from "react-router-dom";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

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
  const [allComments, setAllComments] = useState([]);
  const [allUsers, setAllUsers] = useState([]);

  //adding user name and email to his database
  const add_user = async ({ ...userData }) => {
    try {
      const date = new Date();
      const time = new Date().getTime();
      const day = date.getDate();
      const month = date.toLocaleString("default", { month: "long" });
      const year = date.getFullYear();
      const storageRef = ref(storage, `${userData.email + time}`);
      const userDocRef = doc(userInfodb, "users", userData.email);
      await uploadBytesResumable(storageRef, userData.profilePic).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          await setDoc(userDocRef, {
            uniqueUserName: userData.email.split("@")[0],
            first_name: userData.firstName,
            last_name: userData.lastName,
            email: userData.email,
            profilePic: downloadURL,
            posts: 0,
            accomplishments: 0,
            peers: [],
            joinedOn: `${day}-${month}-${year}`,
            supportive: 0,
            supportiveMarkedBy: [],
            supportiveMarkedTo: [],
            BlockedUsers: [],
          });
        });
      });
    } catch (error) {
      alert("Error while adding document");
      console.log(error);
    }
  };

  //updating profile photo

  const removeProfilePic = async () => {
    const userDocRef = doc(userInfodb, "users", userInfo.email);
    await updateDoc(userDocRef, {
      profilePic: "",
    });
    allPosts.forEach(async (post) => {
      const thePostRef = doc(
        userInfodb,
        "users",
        userInfo.email,
        "userMotives",
        post.postId
      );
      await updateDoc(thePostRef, {
        profilePic: "",
      });
    });
    if (userInfo.profilePic) {
      const imageRef = ref(storage, userInfo.profilePic);
      await deleteObject(imageRef);
    }
    setUserInfo({
      ...userInfo,
      profilePic: "",
    });
    console.log(userInfo);
    alert("successfully deleted, please go back");
  };

  const updateProfilePic = async (newPhoto) => {
    if(newPhoto === null)return;
    const time = new Date().getTime();
    const storageRef = ref(storage, `${userInfo.email + time}`);
    const userDocRef = doc(userInfodb, "users", userInfo.email);
    if (userInfo.profilePic.length > 0) {
      const imageRef = ref(storage, userInfo.profilePic);
      await deleteObject(imageRef);
    }
    await uploadBytesResumable(storageRef, newPhoto)
      .then(() => {
        getDownloadURL(storageRef).then(async (downloadUrl) => {
          await updateDoc(userDocRef, {
            profilePic: downloadUrl,
          });
          setUserInfo({
            ...userInfo,
            profilePic: downloadUrl,
          });
          allPosts.forEach(async (post) => {
            const thePostRef = doc(
              userInfodb,
              "users",
              userInfo.email,
              "userMotives",
              post.postId
            );
            await updateDoc(thePostRef, {
              profilePic: downloadUrl,
            });
          });
          alert("successfully updated, please go back");
        });
      })
      .catch((err) => console.log(err));
  };

  //deleting account
  const deleteAccount = async (username , password) => {
    if (userInfo.profilePic) {
      const imageRef = ref(storage, userInfo.profilePic);
      await deleteObject(imageRef);
    }
    const credentials = EmailAuthProvider.credential(username , password);
    reauthenticateWithCredential(appAuth.currentUser, credentials)
      .then(async () => {
        await deleteUser(appAuth.currentUser);
        setUserInfo(null);
        alert("Account deleted successfully");
      })
      .catch((err) => alert("Wrong credentials"));
  };

  //handling supportive marking
  const handleSupportiveMarking = async (peerId) => {
    if (userInfo.email === peerId) return;
    const peerDocRef = doc(userInfodb, "users", peerId);
    const peerDoc = await getDoc(peerDocRef);
    const userDocRef = doc(userInfodb, "users", userInfo.email);
    const userDoc = await getDoc(userDocRef);
    const peerArray = peerDoc.data().supportiveMarkedBy;
    if (peerArray.includes(userInfo.email)) return;
    const userArray = userDoc.data().supportiveMarkedTo;
    if (userArray.includes(peerId)) return;
    const newSupportive =
      ((peerArray.length + 1) / peerDoc.data().peers.length) * 100;

    await updateDoc(peerDocRef, {
      supportiveMarkedBy: [...peerArray, userInfo.email],
      supportive: newSupportive,
    });
    await updateDoc(userDocRef, {
      supportiveMarkedTo: [...userArray, peerId],
    });
  };

  const handleSupportedUnmarking = async (peerId) => {
    if (userInfo.email === peerId) return;
    const peerDocRef = doc(userInfodb, "users", peerId);
    const peerDoc = await getDoc(peerDocRef);
    const userDocRef = doc(userInfodb, "users", userInfo.email);
    const userDoc = await getDoc(userDocRef);
    const peerArray = peerDoc.data().supportiveMarkedBy;
    if (!peerArray.includes(userInfo.email)) return;
    const userArray = userDoc.data().supportiveMarkedTo;
    if (!userArray.includes(peerId)) return;
    const newSupportive =
      ((peerArray.length - 1) / peerDoc.data().peers.length) * 100;
    await updateDoc(peerDocRef, {
      supportiveMarkedBy: peerArray.filter((x) => x !== userInfo.email),
      supportive: newSupportive,
    });
    await updateDoc(userDocRef, {
      supportiveMarkedTo: userArray.filter((x) => x !== peerId),
    });
  };

  //blocking user

  const handleBlocking = async (peerId) => {
    if (peerId === userInfo.email) return;
    const userDocRef = doc(userInfodb, "users", userInfo.email);
    const userDoc = await getDoc(userDocRef);
    await removePeer(peerId);
    await updateDoc(userDocRef, {
      BlockedUsers: [...userDoc.data().BlockedUsers, peerId],
    });
  };

  //unblocking user
  const unBlockUser = async (peerId) => {
    if (peerId === userInfo.email) return;
    const userDocRef = doc(userInfodb, "users", userInfo.email);
    const userDoc = await getDoc(userDocRef);
    await updateDoc(userDocRef, {
      BlockedUsers: userDoc.data().BlockedUsers.filter((x) => x !== peerId),
    });
  };

  //data is stored at firestore;
  const getData = async ({ ...data }) => {
    setUserData((userData) => (userData, data));
    await sign_up_user(data.email, data.password);
    await add_user(data);
    await sign_in_user(data.email, data.password);
  };

  //geting user photo
  const getUserPhoto = async (userId) => {
    const docRef = doc(userInfodb, "users", userId);
    const theDocRef = await getDoc(docRef);
    return theDocRef.data().profilePic;
  };

  //getting user details of requested user
  const getUserDetails = async (userId) => {
    const docRef = doc(userInfodb, "users", userId);
    const theDocRef = await getDoc(docRef);
    return theDocRef.data();
  };

  //getting no of posts
  const getNoOfPosts = async (userId) => {
    const docRef = doc(userInfodb, "users", userId);
    const theDocRef = await getDoc(docRef);
    const posts = theDocRef.data().posts;
    return posts;
  };

  //getting no of accomplishments
  const getNoOfAccomplishments = async (userId) => {
    const docRef = doc(userInfodb, "users", userId);
    const theDocRef = await getDoc(docRef);
    return theDocRef.data().accomplishments;
  };

  //getting supportive percentage
  const getSupportivePercentage = async (userId) => {
    const docRef = doc(userInfodb, "users", userId);
    const theDocRef = await getDoc(docRef);
    return theDocRef.data().supportive;
  };

  //handling login and logout
  useEffect(() => {
    onAuthStateChanged(appAuth, async (user) => {
      if (user) {
        await get_user_info(user.email);
        setLoggedIn(!loggedIn);
      } else {
        // console.log("logged out");
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
        await createUserWithEmailAndPassword(appAuth, email, password)
          .then(() => {
            sendEmailVerification(appAuth.currentUser).then(() => {
              alert("Please verify your email via a link sent on your email");
            });
          })
          .then(() => {});
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

  //*******************Userinfo is feed here*******************;
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
          posts: doc.data().posts,
          accomplishments: doc.data().accomplishments,
          peers: doc.data().peers,
          joinedOn: doc.data().joinedOn,
          supportive: doc.data().supportive,
          supportiveMarkedBy: doc.data().supportiveMarkedBy,
          supportiveMarkedTo: doc.data().supportiveMarkedTo,
          BlockedUsers: doc.data().BlockedUsers,
        }));
      });
    } else {
      alert("Internal server error");
    }
  };

  //updating password;

  const updatePass = async (oldPass, newPass) => {
    const credentials = EmailAuthProvider.credential(userInfo.email, oldPass);
    reauthenticateWithCredential(appAuth.currentUser, credentials)
      .then(async () => {
        await updatePassword(appAuth.currentUser, newPass);
        alert("Password updated successfully");
      })
      .catch((err) => alert("Wrong old password"));
  };

  const updateName = async (first_name, last_name) => {
    const userDocRef = doc(userInfodb, "users", userInfo.email);
    await updateDoc(userDocRef, {
      first_name: first_name,
      last_name: last_name,
    });
    alert("successfully updated");
  };

  //*****************peer details is feed here********************** */
  const get_peer_info = async (emailId) => {
    const userDocRef = doc(userInfodb, "users", emailId);
    const theDocRef = await getDoc(userDocRef);
    return {
      profileUrl: theDocRef.data().uniqueUserName,
      first_name: theDocRef.data().first_name,
      last_name: theDocRef.data().last_name,
      email: theDocRef.data().email,
      profilePic: theDocRef.data().profilePic,
      posts: theDocRef.data().posts,
      accomplishments: theDocRef.data().accomplishments,
      peers: theDocRef.data().peers,
      joinedOn: theDocRef.data().joinedOn,
      supportive: theDocRef.data().supportive,
      supportiveMarkedBy: theDocRef.data().supportiveMarkedBy,
      supportiveMarkedTo: theDocRef.data().supportiveMarkedTo,
    };
  };

  const sign_out = () => {
    signOut(appAuth).then(() => {
      setUser("");
      setUserInfo(null);
    });
  };
  //posting
  const postMotive = async (motive, deadline) => {
    try {
      const postId = Date.now().toString();
      const theUserRef = doc(userInfodb, "users", userInfo.email);
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
        profilePic: userInfo.profilePic,
        deadline: deadline,
        isAccomplished: false,
      });
      var posts = userInfo.posts;
      await updateDoc(theUserRef, {
        posts: posts + 1,
      });
      // await get_user_info(userInfo.email);
      console.log("Success");
    } catch (err) {
      console.error("Error adding document: ", err);
    }
  };

  //users own posts
  const getAllPosts = async () => {
    const allPosts =
      userInfo &&
      (await getDocs(
        collection(userInfodb, "users", userInfo.email, "userMotives")
      ));
    allPosts &&
      allPosts.forEach((doc) => {
        setAllPosts((prevPosts) => {
          return [...prevPosts, doc.data()];
        });
      });
  };

  useEffect(() => {
    getAllPosts();
  }, [userInfo]);

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

  //all users
  useEffect(async () => {
    const usersList = await getDocs(collection(userInfodb, "users"));
    usersList.forEach((user) => {
      setAllUsers((prev) => {
        return [...prev, user.data()];
      });
    });
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
          const profilePic = await getUserPhoto(likedEmail);
          setUsersLiked((prev) => {
            return [
              ...prev,
              {
                fullName:
                  userData.data().first_name + " " + userData.data().last_name,
                profilePic: profilePic,
              },
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

  //add comment code
  const addComment = async (userId, postId, cmntObj) => {
    const thePostRef = doc(userInfodb, "users", userId, "userMotives", postId);
    const thePost = await getDoc(thePostRef);
    var newComments = thePost.data().Comments;
    newComments = [...newComments, cmntObj];
    await updateDoc(thePostRef, {
      Comments: newComments,
    });
    console.log("success");
  };

  //get comment  code
  const getComments = async (userId, postId) => {
    const unsub = onSnapshot(
      doc(userInfodb, "users", userId, "userMotives", postId),
      (thePost) => {
        setAllComments([]);
        thePost.data().Comments.forEach(async (Comment, index) => {
          const docRef = doc(userInfodb, "users", Comment.commentedBy);
          const userData = await getDoc(docRef);
          setAllComments((prev) => {
            return [
              ...prev,
              {
                fullName:
                  userData.data().first_name + " " + userData.data().last_name,
                date: Comment.date,
                Comment: Comment.comment,
                profilePic: userData.data().profilePic,
              },
            ];
          });
        });
      }
    );
    // console.log(allComments);
    return () => {
      unsub();
    };
  };

  //clear comments;
  const clearComments = () => {
    setAllComments([]);
  };

  //delete motives
  const deleteMotives = async (postId) => {
    const theUserRef = doc(userInfodb, "users", userInfo.email);
    const thePostRef = doc(
      userInfodb,
      "users",
      userInfo.email,
      "userMotives",
      postId
    );
    const post = await getDoc(thePostRef);
    const f = post.data().isAccomplished;
    await deleteDoc(thePostRef);
    var posts = userInfo.posts;
    var accomplishments = userInfo.accomplishments;
    await updateDoc(theUserRef, {
      posts: posts - 1,
      accomplishments: f ? accomplishments - 1 : accomplishments,
    });
    console.log("success");
  };

  //update motives
  const updateMotives = async (postId, motive) => {
    const thePostRef = doc(
      userInfodb,
      "users",
      userInfo.email,
      "userMotives",
      postId
    );
    await updateDoc(thePostRef, {
      Motive: motive,
    });
    console.log("success");
  };

  //update deadline
  const updateDeadline = async (postId, deadline) => {
    const thePostRef = doc(
      userInfodb,
      "users",
      userInfo.email,
      "userMotives",
      postId
    );
    await updateDoc(thePostRef, {
      deadline: deadline,
    });
    console.log("success");
  };

  const accomplished = async (postId) => {
    const theUserRef = doc(userInfodb, "users", userInfo.email);
    const thePostRef = doc(
      userInfodb,
      "users",
      userInfo.email,
      "userMotives",
      postId
    );
    const post = await getDoc(thePostRef);
    const isAccomplished = post.data().isAccomplished;
    const accomplishments = userInfo.accomplishments;
    if (!isAccomplished) {
      await updateDoc(theUserRef, {
        accomplishments: accomplishments + 1,
      });
      await updateDoc(thePostRef, {
        isAccomplished: true,
      });
    }
  };

  //adding peer
  const addPeer = async (peerId) => {
    const theUserRef = doc(userInfodb, "users", userInfo.email);
    const theUserData = await getDoc(theUserRef);
    const peerDocRef = doc(userInfodb, "users", peerId);
    const peerDoc = await getDoc(peerDocRef);
    const userspeers = theUserData.data().peers;
    const peerspeers = peerDoc.data().peers;
    if (userspeers.includes(peerId)) return;
    if (peerspeers.includes(userInfo.email)) return;
    const peerArray = peerDoc.data().supportiveMarkedBy;
    const userArray = theUserData.data().supportiveMarkedBy;
    const newUserSupportive =
      (userArray.length / (theUserData.data().peers.length + 1)) * 100;
    const newPeerSupportive =
      (peerArray.length / (peerDoc.data().peers.length + 1)) * 100;
    await updateDoc(theUserRef, {
      peers: [...userspeers, peerId],
      supportive: newUserSupportive,
    });
    await updateDoc(peerDocRef, {
      peers: [...peerspeers, userInfo.email],
      supportive: newPeerSupportive,
    });
  };

  //remove peer
  const removePeer = async (peerId) => {
    const theUserRef = doc(userInfodb, "users", userInfo.email);
    const theUserData = await getDoc(theUserRef);
    const peerDocRef = doc(userInfodb, "users", peerId);
    const peerDoc = await getDoc(peerDocRef);
    const userspeers = theUserData.data().peers;
    const peerspeers = peerDoc.data().peers;
    if (!userspeers.includes(peerId)) return;
    if (!peerspeers.includes(userInfo.email)) return;
    const peerArrayBy = peerDoc.data().supportiveMarkedBy;
    const userArrayBy = theUserData.data().supportiveMarkedBy;
    const peerArrayTo = peerDoc.data().supportiveMarkedTo;
    const userArrayTo = theUserData.data().supportiveMarkedTo;
    var newUserSupportive = theUserData.data().supportive;
    var newPeerSupportive = peerDoc.data().supportive;
    if (userArrayBy.includes(peerId) || userArrayBy.includes(peerId)) {
      if (userArrayBy.includes(peerId))
        newUserSupportive =
          ((userArrayBy.length - 1) / (theUserData.data().peers.length - 1)) *
          100;
      await updateDoc(theUserRef, {
        supportiveMarkedBy: userArrayBy.filter((x) => x !== peerId),
        supportiveMarkedTo: userArrayTo.filter((x) => x !== peerId),
      });
    }
    if (
      peerArrayBy.includes(userInfo.email) ||
      peerArrayTo.includes(userInfo.email)
    ) {
      if (peerArrayBy.includes(userInfo.email))
        newPeerSupportive =
          ((peerArrayBy.length - 1) / (peerDoc.data().peers.length - 1)) * 100;
      await updateDoc(peerDocRef, {
        supportiveMarkedBy: peerArrayBy.filter((x) => x !== userInfo.email),
        supportiveMarkedTo: peerArrayTo.filter((x) => x !== userInfo.email),
      });
    }

    await updateDoc(theUserRef, {
      peers: userspeers.filter((peer) => peer !== peerId),
      supportive: newUserSupportive,
    });
    await updateDoc(peerDocRef, {
      peers: peerspeers.filter((peer) => peer !== userInfo.email),
      supportive: newPeerSupportive,
    });
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
        addComment,
        getComments,
        allComments,
        clearComments,
        deleteMotives,
        updateMotives,
        updateDeadline,
        accomplished,
        getNoOfPosts,
        getNoOfAccomplishments,
        getSupportivePercentage,
        allUsers,
        addPeer,
        removePeer,
        getUserDetails,
        handleSupportiveMarking,
        handleSupportedUnmarking,
        get_peer_info,
        handleBlocking,
        unBlockUser,
        updatePass,
        updateName,
        removeProfilePic,
        updateProfilePic,
        deleteAccount,
      }}
    >
      {props.children}
    </SisoContext.Provider>
  );
};
