import React, { useEffect, useRef, useState } from "react";
import "./Mainnav.css";
import { Link, useNavigate } from "react-router-dom";
import { useSiso } from "../../Context/siso";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// Link
import {
  faHome,
  faHouse,
  faCloud,
  faMagnifyingGlass,
  faEnvelope,
  faUser,
  faArrowRightFromBracket,
  faPencil,
} from "@fortawesome/free-solid-svg-icons";

const Mainnav = ({ initialDestination }) => {
  const siso = useSiso();
  const [isHome, setHome] = useState(false);
  const [isPost, setPost] = useState(false);
  const [isSearch, setSearch] = useState(false);
  const [isChat, setChat] = useState(false);
  const [isProfile, setProfile] = useState(false);
  const [destination, setDestination] = useState(initialDestination);
  const navigate = useNavigate();

  function reloadPage() {
    setTimeout(() => {
      window.location.reload();
    }, 100);
  }

  useEffect(() => {
    navigate(destination);
    // reloadPage();
    if (initialDestination === "/home") setHome(true);
    if (initialDestination === "/myposts") setPost(true);
    if (initialDestination === "/search") setSearch(true);
    if (initialDestination === "/notification") setNotification(true);
    if (initialDestination === "/profile") setProfile(true);
    if (initialDestination === "/chat") setChat(true);
  }, [destination]);

  const handleSignOut = () => {
    siso.sign_out();
    navigate("/");
    window.location.reload();
  };

  return (
    <>
      <div className="phnv">
        <div
          className={`${isHome ? "phnvicon active" : "phnvicon"}`}
          onClick={() => {
            setDestination("/home");
          }}
        >
          <FontAwesomeIcon icon={faHome} />
        </div>
        <div
          className={`${isPost ? "phnvicon active" : "phnvicon"}`}
          onClick={() => {
            setDestination("/myposts");
            reloadPage();
          }}
        >
          <FontAwesomeIcon icon={faCloud} />
        </div>
        <div
          className={`${isSearch ? "phnvicon active" : "phnvicon"}`}
          onClick={() => {
            setDestination("/search");
            reloadPage();
          }}
        >
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </div>
        <div
          className={`${isChat ? "phnvicon active" : "phnvicon"}`}
          onClick={() => {
            setDestination("/chat");
            reloadPage();
          }}
        >
          <FontAwesomeIcon icon={faEnvelope} />
        </div>
        <div
          className={`${isProfile ? "phnvicon active" : "phnvicon"}`}
          onClick={() => {
            setDestination("/profile");
            reloadPage();
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
    </>
  );
};

export default Mainnav;
