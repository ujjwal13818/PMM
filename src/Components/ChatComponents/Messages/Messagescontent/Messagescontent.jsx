import React from 'react'
import './Messagescontent.css';
import Message from '../Message/Message';


const Messagescontent = () => {
  return (
    <>
      <div className="Messagescontentmaincontainer">
        <Message flag={true} />
        <Message flag={false} />
        <Message flag={true} />
        <Message flag={false} />
        <Message flag={true} />
        <Message flag={false} />
        <Message flag={true} />
        <Message flag={false} />
        <Message flag={true} />
        <Message flag={false} />
        <Message flag={true} />
        <Message flag={false} />
        <Message flag={true} />
        <Message flag={false} />
      </div>
    </>
  );
}

export default Messagescontent
