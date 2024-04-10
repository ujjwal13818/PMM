import React, { useEffect, useState } from 'react'
import './Usercard.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const Usercard = ({user}) => {
  return (
    <>
      <div className="uumaincontainer">
        <div className="maincard">
          <div className="uuheading">
            <div className="uunameandprofilepicbtns">
              <div className="uunameandprofilepic">
                <div className="uuprofilepic"></div>
                <div className="uuname">
                  {user && user.first_name + " " + user.last_name}
                </div>
              </div>
              <div className="uubtns">
                <div className="uuadd">
                  <button className="uuaddbtn">
                    Add
                    <FontAwesomeIcon
                      icon={faPlus}
                      style={{ marginLeft: ".5vh" }}
                    />
                  </button>
                </div>
                <div className="uublock">
                  <button className="uublockbtn">Block</button>
                </div>
              </div>
            </div>
            {user && (
              <div className="uusubtitles">
                {user.posts} Posts, {user.accomplishments} Accomplishments, Supportive: {user.supportive}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Usercard