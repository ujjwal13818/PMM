import React, { useEffect, useState } from "react";
import "./MyPosts.css";
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
  faPencil,
  faCalendarDays,
  faShare,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import Share from "../../Utils/Share/Share";
import Deadline from "../../Utils/Deadline/Deadline";
import DeletePost from "../../Utils/DeletePost/DeletePost";
import EditPost from "../../Utils/EditPost/EditPost";
import PostCards from "../../Utils/PostCards/PostCards";




const MyPosts = () => {
  const siso = useSiso();
  const [isHome, setHome] = useState(true);
  const [isPost, setPost] = useState(false);
  const [isSearch, setSearch] = useState(false);
  const [isNotification, setNotification] = useState(false);
  const [isProfile, setProfile] = useState(false);
  const [deactivated, setDeactivated] = useState(true);
  const [isEditing, setEditing] = useState(false);
  const [isDeleting , setDeleting] = useState(false);
  const [isDeadline , setDeadline] = useState(false);
  const [isShare , setShare] = useState(true);

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
  const bgcs = [
    "linear-gradient(135deg, #F8B500, #FFFFFF)",
    "linear-gradient(135deg, #2193b0, #6dd5ed)",
    "linear-gradient(135deg, #A8E063, #56AB2F)",
  ];
  const bgheader = ["#F8B500", "#2193b0", "#56AB2F"];
  const handlePage = () => {
    setDeactivated(false);
    setEditing(false);
    setDeleting(false);
    setDeadline(false);
    setShare(false);
  };
  return (
    <>
      <div className="pmpmainContainer">
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
        <div className="pmpheading">
          <div className="pmplogo">
            <img src="/whiteLogo.png" alt="" srcSet="" className="phimg" />
          </div>
          <div className="pmpheadingnameandtitle">
            <div className="pmpheadingname">Hello, UJJWAL</div>
            <div className="pmpheadingtitle">YOUR MOTIVES</div>
          </div>
        </div>
        {isShare && <Share handlePage = {handlePage}/>}
        {isDeadline && <Deadline handlePage={handlePage} />}
        {isDeleting && <DeletePost handlePage={handlePage} />}
        {isEditing && <EditPost handlePage={handlePage} />}
        {!deactivated && (
          <div className="pmpallposts">
            {[...siso.allPosts].map((post, index) => (
              <div className="pmpsinglepost">
                <div className="pmpsinglepostcard">
                  <PostCards
                    key={index}
                    bgcs={bgcs[index % bgcs.length]}
                    bgheader={bgheader[index % bgheader.length]}
                    post={post}
                  />
                </div>
                <div className="pmpbtns">
                  <div className="pmpbtns1">
                    <div className="pmpeditbtn">
                      <button
                        className="pmpeditbtn"
                        onClick={() => {
                          setDeactivated(true);
                          setEditing(true);
                        }}
                      >
                        Edit motive
                      </button>
                    </div>
                    <div className="pmpdeletebtn">
                      <button
                        className="pmpdeletebtn"
                        onClick={() => {
                          setDeactivated(true);
                          setDeleting(true);
                        }}
                      >
                        Delete motive
                      </button>
                    </div>
                  </div>
                  <div className="pmpbtns2">
                    <div className="pmpdeadlinebtn">
                      <button
                        className="pmpdeadlinebtn"
                        onClick={() => {
                          setDeactivated(true);
                          setDeadline(true);
                        }}
                      >
                        Add or extend deadline
                        <FontAwesomeIcon icon={faCalendarDays} />
                      </button>
                    </div>
                    <div
                      className="pmpsharebtn"
                      onClick={() => {
                        setDeactivated(true);
                        setShare(true);
                      }}
                    >
                      <button className="pmpsharebtn">
                        Accomplished and share
                        <FontAwesomeIcon icon={faShare} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default MyPosts;
