import React, { createContext, useContext, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
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
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { Navigate, useNavigate } from "react-router-dom";
import { useSiso } from "./siso";

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
const userInfodb = getFirestore(app);
const ChatContext = createContext(null);

export const useChat = () => {
  return useContext(ChatContext);
};

export const ChatProvider = (props) => {
  const siso = useSiso();
  const [allChats, setAllChats] = useState();
  const [messages, setMessages] = useState();
  const [chatId, setChatId] = useState();
  const [currentPeer , setCurrentPeer] = useState();

  //getting all chats
  useEffect(() => {
    const getChats = async () => {
      const unsub = onSnapshot(
        doc(userInfodb, "userChats", siso.userInfo.uniqueUserName),
        (doc) => {
          setAllChats(doc.data());
        }
      );
      return () => {
        unsub();
      };
    };
    siso.userInfo && getChats();
  }, [siso.userInfo]);



  //adding chat if not there
  const addandopen = async (peer) => {
    if (siso.userInfo.email === peer.email) return;
    const combinedUserName =
      siso.userInfo.uniqueUserName > peer.uniqueUserName
        ? siso.userInfo.uniqueUserName + peer.uniqueUserName
        : peer.uniqueUserName + siso.userInfo.uniqueUserName; 
    setChatId(combinedUserName);
    setCurrentPeer(peer);
    try {
      const res = await getDoc(doc(userInfodb, "chats", combinedUserName));
      if (!res.exists()) {
        await setDoc(doc(userInfodb, "chats", combinedUserName), {
          messages: [],
        });
        await setDoc(doc(userInfodb, "userChats", siso.userInfo.uniqueUserName), {
          [combinedUserName + ".userInfo"]: {
            email: peer.email,
            name: peer.first_name + " " + peer.last_name,
            profilePic: peer.profilePic,
            uniqueUserName: peer.uniqueUserName
          },
          [combinedUserName + ".date"]: serverTimestamp(),
        });
        await setDoc(doc(userInfodb, "userChats", peer.uniqueUserName), {
          [combinedUserName + ".userInfo"]: {
            email: siso.userInfo.email,
            name: siso.userInfo.first_name + " " + siso.userInfo.last_name,
            profilePic: siso.userInfo.profilePic,
            uniqueUserName: siso.userInfo.uniqueUserName,
          },
          [combinedUserName + ".date"]: serverTimestamp(),
        });
      }
      if (res.exists()) {
        setMessages(res.data().messages);
      }
    } catch (error) {
      console.log(error);
    }
  };


  const updateMessages = async (message) => {
    const messagesRef = doc(userInfodb, "chats", chatId);
    const oldMessages = (await getDoc(messagesRef)).data().messages;
    await updateDoc(doc(userInfodb, "chats", chatId), {
      messages: [
        ...oldMessages,{
          text: message,
          senderId: siso.userInfo.email,
          date: Timestamp.now(),
        },
      ],
    });

    await updateDoc(doc(userInfodb, "userChats", siso.userInfo.email), {
      [chatId + ".lastmessage"]: {
        message,
      },
      [chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(userInfodb, "userChats", currentPeer.email), {
      [chatId + ".lastmessage"]: {
        message,
      },
      [chatId + ".date"]: serverTimestamp(),
    });
  };

  return (
    <ChatContext.Provider
      value={{
        addandopen,
        allChats,
        chatId,
        messages,
        currentPeer,
        updateMessages,
      }}
    >
      {props.children}
    </ChatContext.Provider>
  );
};
