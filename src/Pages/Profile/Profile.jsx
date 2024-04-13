import React, { useEffect, useState } from "react";
import "./Profile.css";
import Mainnav from "../../Components/Mainnav/Mainnav";
import Navbar from "../../Components/Navbar/Navbar";
import { useSiso } from "../../Context/siso";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import ShowList from "../../Utils/ShowList/ShowList";
import BlockedList from "../../Utils/BlockedList/BlockedList";
import { Link } from "react-router-dom";

const Profile = () => {
  const siso = useSiso();
  const [showList, setShowList] = useState(false);
  const [disable, setDisable] = useState(false);
  const [sentStatus, setSentStatus] = useState();
  const [blocklist, setBlocklist] = useState(false);

  useEffect(() => {
    if (sentStatus) {
      setDisable(true);
      setShowList(true);
    }
  }, [sentStatus]);

  const handlePage = () => {
    setShowList(false);
    setDisable(false);
    setBlocklist(false);
    setSentStatus();
  };

  useEffect(() => {
    if (blocklist) {
      setDisable(true);
      setShowList(true);
    }
  }, [blocklist]);



  return (
    <>
      <div className="ppmaincontainer">
        <Mainnav initialDestination={"/profile"} />
        <div className="pplogo">
          <img src="/whiteLogo.png" alt="" srcSet="" className="phimg" />
        </div>
        <div className="pmpnav">
          <Navbar />
        </div>
        <div className="pmpheadingnameandtitle">
          {siso.userInfo && (
            <div className="pmpheadingname">
              Hello, {siso.userInfo.first_name}
            </div>
          )}
        </div>

        {!showList ? (
          <div className={`ppcontent ${disable ? "ppcontent disable" : ""}`}>
            <div className="ppleftsection">
              <div className="ppprofilepic">
                <img
                  src={siso.userInfo && siso.userInfo.profilePic}
                  alt=""
                  srcSet=""
                  className="ppimg"
                />
              </div>
              <div className="ppchangeprofilepic">
                <button className="ppchangeprofilepicbtn">
                  Change/Remove photo
                </button>
              </div>
            </div>
            <div className="pprightsection">
              <div className="ppfullname">
                {siso.userInfo &&
                  siso.userInfo.first_name + " " + siso.userInfo.last_name}
                <div className="ppediticon">
                  <Link
                    to="http://localhost:5173/updatename"
                    style={{ color: "rgba(255,100,0)" }}
                  >
                    <FontAwesomeIcon icon={faPen} />
                  </Link>
                </div>
              </div>
              <div className="ppjoinedonandemail">
                <div className="ppjoinedon">
                  Joined on: {siso.userInfo && siso.userInfo.joinedOn}
                </div>
                <div className="ppemail">
                  Email:{" "}
                  <b
                    style={{
                      marginLeft: ".2vw",
                      color: "rgb(12, 116, 235)",
                      cursor: "pointer",
                    }}
                  >
                    {" "}
                    {siso.userInfo && siso.userInfo.email}
                  </b>
                </div>
              </div>
              <div className="nooffriends">
                Total number of peers:{" "}
                <b style={{ marginLeft: ".5vw", fontFamily: "sans-serif" }}>
                  {" "}
                  {siso.userInfo && siso.userInfo.peers.length}
                </b>
              </div>
              <div className="nooffriendsmarkedsupportive">
                <div className="nooffriendsmarkedsupportivetext">
                  Number of peers who marked you supportive:{" "}
                  <b style={{ marginLeft: ".5vw" }}>
                    {siso.userInfo && siso.userInfo.supportiveMarkedBy.length}
                  </b>
                </div>
                <div
                  className="nooffriendsmarkedsupportivelist"
                  onClick={() => setSentStatus("by")}
                >
                  See list
                </div>
              </div>
              <div className="ppsupportive">
                Supportive:{" "}
                <b style={{ marginLeft: ".5vw" }}>
                  {siso.userInfo && siso.userInfo.supportive}%
                </b>
              </div>
              <div className="markedsupportivebyuser">
                <div className="markedsupportivebyusertext">
                  Number of peers you marked supportive to :{" "}
                  <b style={{ marginLeft: ".5vw" }}>
                    {siso.userInfo && siso.userInfo.supportiveMarkedTo.length}
                  </b>
                </div>
                <div
                  className="markedsupportivebyuserlist"
                  onClick={() => setSentStatus("to")}
                >
                  See list
                </div>
              </div>
              <div className="pppostaccomplishment">
                <div className="ppposts">
                  Motives:{" "}
                  <b style={{ marginLeft: ".5vw" }}>
                    {siso.userInfo && siso.userInfo.posts}
                  </b>
                </div>
                <div className="ppaccomplishment">
                  Accomplishments:{" "}
                  <b style={{ marginLeft: ".5vw" }}>
                    {" "}
                    {siso.userInfo && siso.userInfo.accomplishments}
                  </b>
                </div>
              </div>
              <div className="pppassword">
                Password: <b style={{ marginLeft: ".5vw" }}> *******</b>
                <div className="ppediticon">
                  <Link
                    to="http://localhost:5173/updatepassword"
                    style={{ color: "rgba(255,100,0)" }}
                  >
                    <FontAwesomeIcon icon={faPen} />
                  </Link>
                </div>
              </div>
              <div className="blockListanddeleteaccount">
                <div className="blocklist" onClick={() => setBlocklist(true)}>
                  Blocked users
                </div>
                <button className="deleteaccountbtn">Delete account</button>
              </div>
            </div>
          </div>
        ) : (
          <div className="list">
            {!blocklist ? (
              <div className="showsupportive">
                <ShowList handlePage={handlePage} sentStatus={sentStatus} />
              </div>
            ) : (
              <div className="showblocking">
                <BlockedList handlePage={handlePage} />
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Profile;
