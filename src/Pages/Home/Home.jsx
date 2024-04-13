import React, { useEffect, useRef, useState } from "react";
import "./Home.css";
import { useSiso } from "../../Context/siso";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import Fcards from "../../Utils/Fcards/Fcards";
import PostCards from "../../Utils/PostCards/PostCards";
import MakeAPost from "../../Utils/MakeAPost/MakeAPost";
import PostForm from "../../Utils/PostForm/PostForm";
import Mainnav from "../../Components/Mainnav/Mainnav";
import { Link } from "react-router-dom";


const Home = () => {
  const siso = useSiso();
  const [posting, setPosting] = useState(false);
  const [spinner, setSpinner] = useState(false);

  const bgcs = [
    "linear-gradient(135deg, #F8B500, #FFFFFF)",
    "linear-gradient(135deg, #2193b0, #6dd5ed)",
    "linear-gradient(135deg, #A8E063, #56AB2F)",
  ];
  const bgheader = ["#F8B500", "#2193b0", "#56AB2F"];
  const togglePostForm = () => {
    setPosting((posting) => !posting);
  };

  const reloadfn = () => {
    setTimeout(() => {
      window.location.reload();
    },100)
  }

  return (
    <>
      {siso.userInfo ? (
        <div className="phmaincontainer">
          <div className={`phmc ${posting ? "phmc disable" : ""}`}>
            <Mainnav initialDestination={"/home"} />
            <div className="phlogo">
              <img src="/whiteLogo.png" alt="" srcSet="" className="phimg" />
            </div>
            <div className="phmc1">
              <div className="phmc1peers">Your peers</div>
              <div className="phpeerslist">
                {siso.userInfo.peers.length > 0 ? (
                  [...siso.userInfo.peers].map((peer, index) => (
                    <Fcards peer={peer} key={index} />
                  ))
                ) : (
                  <div className="findFriends">
                    <h5>Go to search section to find your peers.</h5>
                  </div>
                )}
              </div>
            </div>
            <div className="phmc2">
              {[...siso.allFriendsPosts].map((post, index) => (
                <div className="phmc2postandcomments" key={index}>
                  <PostCards
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
                      srcSet=""
                    />
                  )}
                </div>
                <Link
                  to={"/profile"}
                  style={{ textDecoration: "none" }}
                  onClick={() => {
                    reloadfn();
                  }}
                >
                  <div className="pheditbutton">
                    <button className="pheditbtn">Edit Profile</button>
                  </div>
                </Link>
              </div>
            </div>
          </div>
          <div className="phmap" onClick={togglePostForm}>
            <MakeAPost />
          </div>
          <div className={`phposting ${posting ? "phposting active2" : ""}`}>
            <PostForm togglePostForm={togglePostForm} deadline={null} />
          </div>
        </div>
      ) : (
        <div className="loading">
          <FontAwesomeIcon icon={faSpinner} spinPulse />
        </div>
      )}
    </>
  );
};

export default Home;
