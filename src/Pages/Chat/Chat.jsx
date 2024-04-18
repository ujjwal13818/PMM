import React, { useState, useEffect } from "react";
import "./Chat.css";
import Mainnav from "../../Components/Mainnav/Mainnav";
import { useSiso } from "../../Context/siso";
import UserChats from "../../Components/ChatComponents/UserChats/UserChats";
import Messagesheader from "../../Components/ChatComponents/Messages/Messagesheader/Messagesheader";
import Messagescontent from "../../Components/ChatComponents/Messages/Messagescontent/Messagescontent";
import Input from "../../Components/ChatComponents/Input/Input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRocketchat } from "@fortawesome/free-brands-svg-icons";
import { useChat } from "../../Context/ChatContext";
const Chat = () => {
    const siso = useSiso();
    const chat = useChat();
  const [chatOpen, setChatOpen] = useState(false);
  const [searchedUser, setSearchedUser] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);
  const [list , setList] = useState([]);


  useEffect(() => {
    const searchFn = (users) => {
      return users.filter((user) => {
        return user.first_name.toLowerCase() === ""
          ? user
          : user.first_name.toLowerCase().includes(searchedUser.toLowerCase());
      });
    };
    setSearchedResults(searchFn(siso.allUsers));
  }, [searchedUser]);

 useEffect(() => {
  if(chat.chatId){
    setChatOpen(true);
  }
 },[chat.chatId])

  return (
    <>
      <div className="pcmaincontainer">
        <Mainnav initialDestination={"/chat"} />
        <div className="pcmainchatarea">
          {siso.allUsers && (
            <div className="pcmainleftarea">
              <div className="ppnameandsearch">
                <div className="ppname">
                  <div className="pcpp"></div>
                  <div className="pcname">{siso.userInfo && siso.userInfo.first_name + " " + siso.userInfo.last_name}</div>
                </div>
                <div className="pcsearch">
                  <input
                    type="text"
                    className="pcsearchin"
                    autoComplete="off"
                    placeholder="Find your peer to chat"
                    value={searchedUser}
                    onChange={(e) => setSearchedUser(e.target.value)}
                  />
                </div>
              </div>
              <div className="pcleftcontent">
                {searchedUser && (
                  <div className="pcsearchedresults">
                    {searchedResults && searchedResults.length > 0 ? (
                      <UserChats list={searchedResults} />
                    ) : (
                      <UserChats list={[]} />
                    )}
                  </div>
                )}
                {chat.allChats && Object.entries(chat.allChats)
                  ?.sort((a, b) => {b[1].date && a[1].date && b[1].date - a[1].date})
                  .map((chat) => (
                    <div className="pcalluserchats">
                      <UserChats list={chat} />
                    </div>
                  ))}
              </div>
            </div>
          )}

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
