import React from 'react'
import './Messagesheader.css';
import { useSiso } from '../../../../Context/siso';
import { useChat } from '../../../../Context/ChatContext';


const Messagesheader = () => {
  const siso = useSiso();
  const chat  = useChat();
  return (
    <>
      <div className="Messagesheadermaincontainer">
        <img src={chat.currentPeer && chat.currentPeer.profilePic} className="cmmprofilepic" alt="" />
        <div className="cmmname">
          {chat.currentPeer && chat.currentPeer.name}
        </div>
      </div>
    </>
  );
}

export default Messagesheader