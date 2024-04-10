import React, { useEffect, useState } from "react";
import "./Usercard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { useSiso } from "../../Context/siso";

const Usercard = ({ user }) => {
  const siso = useSiso();
  const [added, setAdded] = useState(user && siso.userInfo.peers.includes(user.email));

  const handleAddPeers = async (peerId) => {
    if (peerId === siso.userInfo.email) return;
    if(siso.userInfo.peers.includes(peerId))return;
    await siso.addPeer(peerId);
    setAdded(true);
    window.location.reload();
  };

  const handleRemovePeers = async (peerId) => {
    if (peerId === siso.userInfo.email) return;
    if(!siso.userInfo.peers.includes(peerId))return;
    await siso.removePeer(peerId);
    setAdded(false);
    window.location.reload();
  };

  return (
    <>
      {user ? (
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
                    {!added ? (
                      <button
                        className="uuaddbtn"
                        onClick={() => handleAddPeers(user.email)}
                      >
                        Add
                        <FontAwesomeIcon
                          icon={faPlus}
                          style={{ marginLeft: ".5vh" }}
                        />
                      </button>
                    ) : (
                      <button
                        className="uurembtn"
                        onClick={() => handleRemovePeers(user.email)}
                      >
                        Remove
                        <FontAwesomeIcon
                          icon={faMinus}
                          style={{ marginLeft: ".5vh" }}
                        />
                      </button>
                    )}
                  </div>
                  <div className="uublock">
                    <button className="uublockbtn">Block</button>
                  </div>
                </div>
              </div>
              {user && (
                <div className="uusubtitles">
                  {user.posts} Posts, {user.accomplishments} Accomplishments,
                  Supportive: {user.supportive}
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div style={{ color: "red" }}>
          <h3>No Users Found</h3>
        </div>
      )}
    </>
  );
};

export default Usercard;
