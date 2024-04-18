import React, { useState } from 'react'
import './Message.css'

const Message = ({text  , flag}) => {
    const [sent , setSent] = useState(flag);
  return (
    <>
      {sent ? (
        <div className="sentblock">
          <div className="sentmessage">
            {text} 
          </div>
        </div>
      ) : (
        <div className="receiveblock">
          <div className="receivedmessage">
            {text} 
          </div>
        </div>
      )}
    </>
  );
}

export default Message