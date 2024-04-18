import React, { useState } from 'react'
import './Input.css'
import { useSiso } from '../../../Context/siso'
import { useChat } from '../../../Context/ChatContext';

const Input = () => {
  const siso = useSiso();
  const chat = useChat();
  const [newMessage , setNewMessage] = useState();

  const handleKey = async(e) => {
    if(e.code === "Enter"){
      if(newMessage.length === 0)return;
       chat.updateMessages(newMessage);
      setNewMessage("");
    }
  }

  return (
    <>
        <div className="Inputmaincontainer">
            <input type="text" className="maincontainer" placeholder='Type a message...' autoComplete='off' onChange={(e) => setNewMessage(e.target.value)} onKeyDown={handleKey} value={newMessage}/>
        </div>
    </>
  )
}

export default Input