import React from 'react'
import './UserChats.css'
import SingleChat from '../SingleChat/SingleChat'


const UserChats = ({list}) => {
  if (list.length === 0)
  return <h3 className="cuuwarning">No users found</h3>
  return (
    <>
      <div className="UserChatsmaincontainer">
        <div className="UserChatsmaincontent">
          {list && [...list].map((theChatinfo, index) => (
            <SingleChat peer = {theChatinfo} key={index}/>
          ))}
        </div>
      </div>
    </>
  );
}

export default UserChats