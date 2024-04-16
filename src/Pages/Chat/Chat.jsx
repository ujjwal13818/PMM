import React, { useState } from "react";
import "./Chat.css";
import Mainnav from "../../Components/Mainnav/Mainnav";
import { useSiso } from "../../Context/siso";
import Navbar from "../../Components/Navbar/Navbar";
import UserChats from "../../Components/ChatComponents/UserChats/UserChats";
import Messagesheader from "../../Components/ChatComponents/Messages/Messagesheader/Messagesheader";
import Messagescontent from "../../Components/ChatComponents/Messages/Messagescontent/Messagescontent";
import Input from "../../Components/ChatComponents/Input/Input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faRocketchat } from "@fortawesome/free-solid-svg-icons";
import { faRocketchat } from "@fortawesome/free-brands-svg-icons";
const Chat = () => {
  const [chatOpen, setChatOpen] = useState(true);
  const siso = useSiso();
  return (
    <>
      <div className="pcmaincontainer">
        <Mainnav initialDestination={"/chat"} />
        <div className="pcmainchatarea">
          <div className="pcmainleftarea">
            <div className="ppnameandsearch">
              <div className="ppname">
                <div className="pcpp"></div>
                <div className="pcname">Ujjwal Kumar</div>
              </div>
              <div className="pcsearch">
                <input
                  type="text"
                  className="pcsearchin"
                  autoComplete="off"
                  placeholder="Find your peer to chat"
                />
              </div>
            </div>
            <div className="pcleftcontent">
              <div className="searchresults">
                <UserChats />
              </div>
              <UserChats />
            </div>
          </div>
          {chatOpen ? (
            <div className="pcmainrightarea">
              <div className="pcmainrightareaheader">
                <Messagesheader />
              </div>
              <div className="pcmainrightareacontent">
                <Messagescontent />
              </div>
              <div className="pcmaininput">
                <Input />
              </div>
            </div>
          ) : (
            <div className="pcmainrightareaIcon">
              <FontAwesomeIcon icon={faRocketchat} />
              <div className="pctext">Chats</div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Chat;
