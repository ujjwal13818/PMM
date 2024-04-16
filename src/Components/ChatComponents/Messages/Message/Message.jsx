import React, { useState } from 'react'
import './Message.css'

const Message = ({flag}) => {
    const [sent , setSent] = useState(flag);
  return (
    <>
      {sent ? (
        <div className="sentblock">
          <div className="sentmessage">
            Lorem 
          </div>
        </div>
      ) : (
        <div className="receiveblock">
          <div className="receivedmessage">
            Lorem ipsum 
          </div>
        </div>
      )}
    </>
  );
}

export default Message