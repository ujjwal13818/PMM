import React from "react";
import "./BlockedList.css";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { useSiso } from "../../Context/siso";

const BlockedList = ({ handlePage }) => {
  const siso = useSiso();
  const [list, setList] = useState(siso.userInfo && siso.userInfo.BlockedUsers);
  const [allPeersData, setAllPeersData] = useState([]);
  const [spinner, setSpinner] = useState(false);

  useState(() => {
    {
      [...list].map(async (emailId, index) => {
        const detailsObj = await siso.get_peer_info(emailId);
        setAllPeersData((prev) => [...prev, detailsObj]);
      });
    }
  }, [list]);

  const handleUnblocking = async (peerId) => {
    setSpinner(true);
    await siso.unBlockUser(peerId);
    setList(siso.userInfo.BlockedUsers);
    setSpinner(false);
    window.location.reload();
  };

  return (
    <>
      <div className="uslmaincontainer">
        <div className="uslcontent">
          <FontAwesomeIcon
            icon={faXmark}
            className="pfXmark"
            style={{
              position: "absolute",
              top: "2%",
              right: "1%",
              fontSize: "1.4rem",
              color: "white",
            }}
            onClick={handlePage}
          />
          <div className="uslheading">Blocked users:</div>
          <div className="uslalllist">
            {allPeersData && [
              ...allPeersData.map((data) => (
                <div className="uslsinglelist">
                  <div className="uslprofilepicandname">
                    <div className="uslprofilepic">
                      <img
                        src={data.profilePic}
                        alt={data.name}
                        className="uslprofilepicimg"
                      />
                    </div>
                    <div className="uslname">
                      {data.first_name + " " + data.last_name}
                    </div>
                  </div>
                  <div className="uslunblock">
                    <button className="uslunblockbtn">
                      {spinner ? (
                        <FontAwesomeIcon icon={faSpinner} spinPulse />
                      ) : (
                        <div
                          className="unblocktext"
                          onClick={() => {
                            handleUnblocking(data.email);
                          }}
                        >
                          Unblock
                        </div>
                      )}
                    </button>
                  </div>
                </div>
              )),
            ]}
          </div>
        </div>
      </div>
    </>
  );
};

export default BlockedList;
