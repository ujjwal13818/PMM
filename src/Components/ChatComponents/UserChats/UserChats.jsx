import React from 'react'
import './UserChats.css'
import SingleChat from '../SingleChat/SingleChat'


const UserChats = () => {
  return (
    <>
      <div className="UserChatsmaincontainer">
        <div className="UserChatsmaincontent">
          {[...Array(10)].map((_, index) => (
            <SingleChat />
          ))}
        </div>
      </div>
    </>
  );
}

export default UserChats