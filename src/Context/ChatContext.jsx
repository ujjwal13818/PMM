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
  const [currentPeer, setCurrentPeer] = useState();
  const [chatsDetails, setChatsDetails] = useState([]);


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

useEffect(() => {
  if (allChats) {
    allChats.chatsWith.map(async(peerId) => {
      const theChatRef = doc(userInfodb, "userChats" , siso.userInfo.uniqueUserName , "peerChats", peerId);
      const theChat = await getDoc(theChatRef);
      setChatsDetails((prev) => [...prev , theChat.data()])
  })
  }
}, [allChats]);

  //getting all the messages
  useEffect(() => {
    if (chatId) {
      const unSub = onSnapshot(doc(userInfodb, "chats", chatId), (doc) => {
        doc.exists() && setMessages(doc.data().messages);
      });

      return () => {
        unSub();
      };
    }
  }, [chatId]);

  //adding chat if not there
  const addandopen = async (peer) => {
    if (siso.userInfo.email === peer.email) return;
    setMessages();
    const combinedUserName =
      siso.userInfo.uniqueUserName > peer.uniqueUserName
        ? siso.userInfo.uniqueUserName + peer.uniqueUserName
        : peer.uniqueUserName + siso.userInfo.uniqueUserName;
     setCurrentPeer(peer);
     setChatId(combinedUserName);
    try {
      const res = await getDoc(doc(userInfodb, "chats", combinedUserName));
      if (!res.exists()) {
        await setDoc(doc(userInfodb, "chats", combinedUserName), {
          messages: [],
        });
        const userChatRef = doc(
          userInfodb,
          "userChats",
          siso.userInfo.uniqueUserName,
          "peerChats",
          peer.uniqueUserName
        );
        const peerChatRef = doc(
          userInfodb,
          "userChats",
          peer.uniqueUserName,
          "peerChats",
          siso.userInfo.uniqueUserName
        );
        await setDoc(userChatRef, {
          name: peer.first_name + " " + peer.last_name,
          date: serverTimestamp(),
          lastMessage: "",
          profilePic: peer.profilePic,
          lastMessageTime: "",
          uniqueUserName: peer.uniqueUserName
        });
        await setDoc(peerChatRef, {
          name: siso.userInfo.first_name + " " + siso.userInfo.last_name,
          date: serverTimestamp(),
          lastMessage: "",
          profilePic: siso.userInfo.profilePic,
          lastMessageTime: "",
          uniqueUserName: siso.userInfo.uniqueUserName
        });
        const userDocRef = doc(
          userInfodb,
          "userChats",
          siso.userInfo.uniqueUserName
        );
        const peerDocRef = doc(userInfodb, "userChats", peer.uniqueUserName);
        const peerChats = (await getDoc(peerDocRef)).data();
        const userChats = (await getDoc(userDocRef)).data();
        if (!userChats) {
          await setDoc(userDocRef, {
            chatsWith: [peer.uniqueUserName],
          });
        } else {
          await updateDoc(userDocRef, {
            chatsWith: [...userChats.chatsWith, peer.uniqueUserName],
          });
        }
        if (!peerChats) {
          await setDoc(peerDocRef, {
            chatsWith: [siso.userInfo.uniqueUserName],
          });
        } else {
          await updateDoc(peerDocRef, {
            chatsWith: [...peerChats.chatsWith, siso.userInfo.uniqueUserName],
          });
        }
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
        ...oldMessages,
        {
          text: message,
          senderId: siso.userInfo.uniqueUserName,
          date: Timestamp.now(),
        },
      ],
    });
    const userDocRef = doc(
      userInfodb,
      "userChats",
      siso.userInfo.uniqueUserName,
      "peerChats",
      currentPeer.uniqueUserName
    );
    const userDoc = await getDoc(userDocRef);

    await updateDoc(userDocRef, {
      lastMessage: message,
      lastMessageTime: serverTimestamp(),
    });
    const peerDocRef = doc(userInfodb, "userChats", currentPeer.uniqueUserName , "peerChats" , siso.userInfo.uniqueUserName);
    const peerDoc = await getDoc(peerDocRef);
    await updateDoc(peerDocRef, {
      lastMessage: message,
      lastMessageTime: serverTimestamp(),
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
        chatsDetails,
      }}
    >
      {props.children}
    </ChatContext.Provider>
  );
};
