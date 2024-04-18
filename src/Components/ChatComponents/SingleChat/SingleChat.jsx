import React, { useState } from "react";
import "./SingleChat.css";
import { useChat } from "../../../Context/ChatContext";

const SingleChat = ({ peer }) => {
  const chat = useChat();

  const openChat = async (peer) => {
    if(chat.currentPeer === peer)return;
    await chat.addandopen(peer);
  };


  return (
    <>
      {peer && (peer.name || peer.first_name) && (
        <div
          className="SingleChatmaincontainer"
          onClick={() => {
            openChat(peer);
          }}
        >
          <img
            src={peer && peer.profilePic && peer.profilePic}
            className="cscprofilephoto"
            alt=""
          />
          <div className="cscnameandlastmessage">
            <div className="cscname">
              {peer && peer.name
                ? peer.name
                : peer.first_name + " " + peer.last_name}
            </div>
            <div className="csclastmessage">
              {peer && peer.lastMessage && peer.lastMessage}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SingleChat;
