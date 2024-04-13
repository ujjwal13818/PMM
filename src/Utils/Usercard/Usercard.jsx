import React, { useEffect, useState } from "react";
import "./Usercard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { useSiso } from "../../Context/siso";

const Usercard = ({ user }) => {
  const siso = useSiso();
  const [added, setAdded] = useState(
    user && siso.userInfo.peers.includes(user.email)
  );
  const [spinner, setSpinner] = useState(false);
  // console.log(user);

  const handleAddPeers = async (peerId) => {
    if (peerId === siso.userInfo.email) return;
    if (siso.userInfo.peers.includes(peerId)) return;
    setSpinner(true);
    await siso.addPeer(peerId);
    setAdded(true);
    window.location.reload();
  };

  const handleRemovePeers = async (peerId) => {
    if (peerId === siso.userInfo.email) return;
    if (!siso.userInfo.peers.includes(peerId)) return;
    setSpinner(true);
    await siso.removePeer(peerId);
    setAdded(false);
    window.location.reload();
  };

  const handleBlock = async(peerId) => {
    if(peerId == siso.userInfo.emailId)return;
    setSpinner(true);
    await siso.handleBlocking(peerId);
    window.location.reload();
  }

  if(siso.userInfo && user && siso.userInfo.BlockedUsers.includes(user.email)){
    return (
      null
    )
  }

  return (
    <>
      {user ? (
        <div className="uumaincontainer">
          <div className="maincard">
            <div className="uuheading">
              <div className="uunameandprofilepicbtns">
                <div className="uunameandprofilepic">
                  <div className="uuprofilepic">
                    <img
                      className="uuprofilepicimg"
                      src={user.profilePic}
                      alt=""
                      srcSet=""
                    />
                  </div>
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
                        {spinner ? (
                          <FontAwesomeIcon icon={faSpinner} spinPulse />
                        ) : (
                          <div className="addandplus">
                            Add
                            <FontAwesomeIcon
                              icon={faPlus}
                              style={{ marginLeft: ".5vh" }}
                            />
                          </div>
                        )}
                      </button>
                    ) : (
                      <button
                        className="uurembtn"
                        onClick={() => handleRemovePeers(user.email)}
                      >
                        {spinner ? (
                          <FontAwesomeIcon icon={faSpinner} spinPulse />
                        ) : (
                          <div className="removeandminus">
                            Remove
                            <FontAwesomeIcon
                              icon={faMinus}
                              style={{ marginLeft: ".5vh" }}
                            />
                          </div>
                        )}
                      </button>
                    )}
                  </div>
                  <div className="uublock">
                    <button
                      className="uublockbtn"
                      onClick={() => handleBlock(user.email)}
                    >
                      {spinner ? (
                        <FontAwesomeIcon icon={faSpinner} spinPulse />
                      ) : (
                        <div className="blocktext">
                          Block
                        </div>
                      )}
                    </button>
                  </div>
                </div>
              </div>
              {user && (
                <div className="uusubtitles">
                  {user.posts} Posts, {user.accomplishments} Accomplishments,
                  Supportive: {user.supportive}%
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
