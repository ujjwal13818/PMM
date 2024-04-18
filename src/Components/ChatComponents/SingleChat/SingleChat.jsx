import React from 'react'
import './SingleChat.css'
import { useChat } from '../../../Context/ChatContext'


const SingleChat = ({peer}) => {
const chat = useChat();

const openChat = async(peer) => {
    await chat.addandopen(peer);
}
  return (
    <>
      {peer && (peer.name || peer.first_name) && (
        <div
          className="SingleChatmaincontainer"
          onClick={() => {
            openChat(peer);
          }}
        >
          <div className="cscprofilephoto"></div>
          <div className="cscnameandlastmessage">
            <div className="cscname">
              {peer && peer.name
                ? peer.name
                : peer.first_name + " " + peer.last_name}
            </div>
            <div className="csclastmessage">{peer && `Hello world`}</div>
          </div>
        </div>
      )}
    </>
  );
}

export default SingleChat