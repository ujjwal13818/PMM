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
  faPencil,
} from "@fortawesome/free-solid-svg-icons";
import Fcards from "../../Utils/Fcards/Fcards";
import PostCards from "../../Utils/PostCards/PostCards";
import MakeAPost from "../../Utils/MakeAPost/MakeAPost";
import PostForm from "../../Utils/PostForm/PostForm";

const Home = () => {
  const { id } = useParams();
  const siso = useSiso();
  const iconRef = useRef();
  const [isHome, setHome] = useState(false);
  const [isPost, setPost] = useState(false);
  const [isSearch, setSearch] = useState(false);
  const [posting, setPosting] = useState(false);
  const [isNotification, setNotification] = useState(false);
  const [isProfile, setProfile] = useState(false);
  const [changeURL, setChangeURL] = useState(false);
  const [destination, setDestination] = useState("/home");
  const navigate = useNavigate();

  useEffect(() => {
    setChangeURL(false);
    setHome(false);
    setPost(false);
    setSearch(false);
    setNotification(false);
    setProfile(false);
  }, [changeURL]);
  useEffect(() => {
    if (destination === "/home") setHome(true);
  }, [changeURL]);
  useEffect(() => {
    if (destination === "/myposts") setPost(true);
  }, [changeURL]);
  useEffect(() => {
    if (destination === "/search") setSearch(true);
  }, [changeURL]);
  useEffect(() => {
    if (destination === "/notification") setNotification(true);
  }, [changeURL]);
  useEffect(() => {
    if (destination === "/profile") setProfile(true);
  }, [changeURL]);
  // const setIconFalse = () => {
  //   setHome(false);
  //   setPost(false);
  //   setSearch(false);
  //   setNotification(false);
  //   setProfile(false);
  // };
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
  const togglePostForm = () => {
    setPosting((posting) => !posting);
  };

  return (
    <>
      <div className={`phmc ${posting ? "phmc disable" : ""}`}>
        <div className="phnv">
          <div
            className={`${isHome ? "phnvicon active" : "phnvicon"}`}
            onClick={async () => {
              setChangeURL(true);
              setDestination("/home");
              setHome(true);
            }}
          >
            <FontAwesomeIcon icon={faHome} />
          </div>
          <div
            className={`${isPost ? "phnvicon active" : "phnvicon"}`}
            onClick={async () => {
              setChangeURL(true);
              setDestination("/myposts");
              setPost(true);
            }}
          >
            <FontAwesomeIcon icon={faCloud} />
          </div>
          <div
            className={`${isSearch ? "phnvicon active" : "phnvicon"}`}
            onClick={() => {
              setChangeURL(true);
              setDestination("/search");
              setSearch(true);
            }}
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </div>
          <div
            className={`${isNotification ? "phnvicon active" : "phnvicon"}`}
            onClick={() => {
              setChangeURL(true);
              setDestination("/notification");
              setNotification(true);
            }}
          >
            <FontAwesomeIcon icon={faEnvelope} />
          </div>
          <div
            className={`${isProfile ? "phnvicon active" : "phnvicon"}`}
            onClick={() => {
              setChangeURL(true);
              setDestination("/profile");
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
          <img src="/whiteLogo.png" alt="" srcSet="" className="phimg" />
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
          {[...siso.allFriendsPosts].map((post, index) => (
            <div className="phmc2postandcomments">
              <PostCards
                key={index}
                bgcs={bgcs[index % bgcs.length]}
                bgheader={bgheader[index % bgheader.length]}
                post={post}
              />
            </div>
          ))}
        </div>
        <div className="phmc3">
          <div className="phprofile">
            <div className="phprofilepic">
              {siso.userInfo && (
                <img
                  className="phprofilepicimg"
                  src={siso.userInfo.profilePic}
                  alt="image"
                  srcset=""
                />
              )}
            </div>
            <div className="pheditbutton">
              <button className="pheditbtn">Edit Profile</button>
            </div>
          </div>
        </div>
      </div>
      <div className="phmap" onClick={togglePostForm}>
        <MakeAPost />
      </div>
      <div className={`phposting ${posting ? "phposting active2" : ""}`}>
        <PostForm togglePostForm={togglePostForm} deadline={null} />
      </div>
    </>
  );
};

export default Home;
