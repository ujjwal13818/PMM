import React, { useEffect, useRef, useState } from "react";
import "./Home.css";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useSiso } from "../../Context/siso";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faHouse,
  faCloud,
  faMagnifyingGlass,
  faEnvelope,
  faUser,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import Fcards from "../../Utils/Fcards/Fcards";
import PostCards from "../../Utils/PostCards/PostCards";

const Home = () => {
  const { id } = useParams();
  const siso = useSiso();
  const iconRef = useRef();
  const [isHome, setHome] = useState(true);
  const [isPost, setPost] = useState(false);
  const [isSearch, setSearch] = useState(false);
  const [isNotification, setNotification] = useState(false);
  const [isProfile, setProfile] = useState(false);
  const setIconFalse = () => {
    setHome(false);
    setPost(false);
    setSearch(false);
    setNotification(false);
    setProfile(false);
  };
  const navigate = useNavigate();
  const handleSignOut = () => {
    siso.sign_out();
    navigate("/");
  };

  return (
    <>
      <div className="phmc">
        <div className="phnv">
          <div
            className={`${isHome ? "phnvicon active" : "phnvicon"}`}
            onClick={() => {
              setIconFalse();
              setHome(true);
            }}
          >
            <FontAwesomeIcon icon={faHome} />
          </div>
          <div
            className={`${isPost ? "phnvicon active" : "phnvicon"}`}
            onClick={() => {
              setIconFalse();
              setPost(true);
            }}
          >
            <FontAwesomeIcon icon={faCloud} />
          </div>
          <div
            className={`${isSearch ? "phnvicon active" : "phnvicon"}`}
            onClick={() => {
              setIconFalse();
              setSearch(true);
            }}
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </div>
          <div
            className={`${isNotification ? "phnvicon active" : "phnvicon"}`}
            onClick={() => {
              setIconFalse();
              setNotification(true);
            }}
          >
            <FontAwesomeIcon icon={faEnvelope} />
          </div>
          <div
            className={`${isProfile ? "phnvicon active" : "phnvicon"}`}
            onClick={() => {
              setIconFalse();
              setProfile(true);
            }}
          >
            <FontAwesomeIcon icon={faUser} />
          </div>
          <div
            className="phnvicon"
            onClick={() => {
              handleSignOut();
            }}
          >
            <FontAwesomeIcon icon={faArrowRightFromBracket} />
          </div>
        </div>
        <div className="phlogo">
          <img src="/whiteLogo.png" alt="" srcset="" className="phimg" />
        </div>
        <div className="phmc1">
          <div className="phmc1peers">Your peers</div>
          <div className="phpeerslist">
            {[...Array(25)].map((_, index) => (
              <Fcards key={index} />
            ))}
          </div>
        </div>
        <div className="phmc2">
          {
            [...Array(15)].map((_,index) => (
              <PostCards key={index} />
            ))
          }
        </div>
        <div className="phmc3">
          <div className="phprofile">
            <div className="phprofilepic">
              <FontAwesomeIcon icon={faUser} />
            </div>
            <div className="pheditbutton">
              <button className="pheditbtn">Edit Profile</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
