import React from "react";
import "./Messagescontent.css";
import Message from "../Message/Message";
import { useSiso } from "../../../../Context/siso";
import { useChat } from "../../../../Context/ChatContext";

const Messagescontent = () => {
  const siso = useSiso();
  const chat = useChat();
  return (
    <>
      {chat.messages && (
        <div className="Messagescontentmaincontainer">
          {chat.messages &&
            [...chat.messages].map((message) => (
              <Message
                text={message.text}
                flag={
                  siso.userInfo &&
                  siso.userInfo.uniqueUserName === message.senderId
                }
              />
            ))}
        </div>
      )}
    </>
  );
};

export default Messagescontent;
