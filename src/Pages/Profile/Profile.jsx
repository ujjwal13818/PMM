import React from 'react'
import './Profile.css'
import Mainnav from '../../Components/Mainnav/Mainnav';
import Navbar from '../../Components/Navbar/Navbar';
import { useSiso } from '../../Context/siso';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";

const Profile = () => {
  const siso = useSiso();
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
        <div className="ppcontent">
          <div className="ppleftsection">
            <div className="ppprofilepic"></div>
            <div className="ppchangeprofilepic">
              <button className="ppchangeprofilepicbtn">
                Change/Remove photo
              </button>
            </div>
          </div>
          <div className="pprightsection">
            <div className="ppfullname">
              Ujjwal Kumar{" "}
              <div className="ppediticon">
                <FontAwesomeIcon icon={faPen} />
              </div>
            </div>
            <div className="ppjoinedonandemail">
              <div className="ppjoinedon">
                Joined on: 12/03/2024
              </div>
              <div className="ppemail">
                Email:{" "}
                <b style={{ marginLeft: ".2vw",color: "rgb(12, 116, 235)" , cursor: "pointer"}}> ujjwal13818@gmail.com</b>
              </div>
            </div>
            <div className="nooffriends">
              Total number of peers: <b style={{ marginLeft: ".5vw" }}> 10</b>
            </div>
            <div className="nooffriendsmarkedsupportive">
              Number of peers who marked you supportive:{" "}
              <b style={{ marginLeft: ".5vw" }}>5</b>
            </div>
            <div className="ppsupportive">
              Supportive: <b style={{ marginLeft: ".5vw" }}>50%</b>
            </div>
            <div className="markedsupportivebyuser">
              Number of peers you marked supportive to :{" "}
              <b style={{ marginLeft: ".5vw" }}> 6</b>
            </div>
            <div className="pppostaccomplishment">
              <div className="ppposts">
                Motives: <b style={{ marginLeft: ".5vw" }}>12</b>
              </div>
              <div className="ppaccomplishment">
                Accomplishments: <b style={{ marginLeft: ".5vw" }}> 9</b>
              </div>
            </div>
            <div className="pppassword">
              Password: <b style={{ marginLeft: ".5vw" }}> *******</b>
              <div className="ppediticon">
                <FontAwesomeIcon icon={faPen} />
              </div>
            </div>
            <div className="blockListanddeleteaccount">
              <div className="blocklist">
                Blocked users
              </div>
              <button className="deleteaccountbtn">
                  Delete account
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile