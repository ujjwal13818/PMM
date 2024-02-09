import React, { useState, useRef, useEffect, useMemo } from "react";
import "./LP.css";
import Sign_up from "../../Components/Forms/Sign_up/Sign_up";
import Sign_in from "../../Components/Forms/Sign_in/Sign_in";
import G1B from "../../Components/Buttons/G1B/G1B";
import { Typewriter } from "react-simple-typewriter";
import { useSiso } from "../../Context/siso";


const LP = () => {
  const siso = useSiso();
  const aboutRef = useRef();
  const getstartedRef = useRef();
  const handleRefClicks = (ref) => {
    window.scrollTo({ top: ref.current.offsetTop, behavior: "smooth" });
  };

  const [showLogIn, setShowLogIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);

  const toggleSign_in = () => {
    setShowSignUp(false);
    setShowLogIn(!showLogIn);
  };
  const toggleSign_up = () => {
    setShowLogIn(false);
    setShowSignUp(!showSignUp);
  };

  return (
    <>
      <div ref={getstartedRef} className="llgetstarted">
        <div
          className={`llgetstartedsign_in ${
            showLogIn ? "llgetstartedsign_in plpshow" : ""
          }`}
        >
          {<Sign_in toggleSign_in = {toggleSign_in} />}
        </div>
        <div
          className={`llgetstartedsign_up ${
            showSignUp ? "llgetstartedsign_up plpshow" : ""
          }`}
        >
          {<Sign_up toggleSign_up={toggleSign_up} />}
        </div>
        <div className="llgetstartednav">
          <span
            className="llgetstartednavlogin"
            onClick={() => {
              handleRefClicks(getstartedRef);
              toggleSign_in();
            }}
          >
            Log in
          </span>
          <span
            className="llgetstartednavsignup"
            onClick={() => {
              handleRefClicks(getstartedRef);
              toggleSign_up();
            }}
          >
            Sign up
          </span>
          <span
            className="llgetstartednavabout"
            onClick={() => {
              if (!showLogIn) {
                setShowLogIn(!setShowLogIn);
              }
              if (!showSignUp) {
                setShowSignUp(!setShowSignUp);
              }
              handleRefClicks(aboutRef);
            }}
          >
            About
          </span>
        </div>
        <div className="llgetstartedlogo"></div>
        <div
          className={`plpmain ${
            showLogIn | showSignUp ? "plpmain plphidden" : ""
          }`}
        >
          <div className="plpmaintitle">
            Feeling{" "}
            <span className="lptypewriter">
              <Typewriter
                words={["motivated?", "energized?", "having an idea?"]}
                loop={false}
                cursor
                cursorStyle="|"
                typeSpeed={70}
                deleteSpeed={50}
                delaySpeed={1500}
              />
            </span>
          </div>
          <div className="plpmainsubtitle">
            Don't let your motivation{" "}
            <span style={{ color: "red", fontWeight: "bold" }}>fed away.</span>{" "}
            Write your motivation just like a post and get your motivation
            pushed by your fellow supportive peers.
          </div>
          <div className="getstartedbtn" onClick={() => toggleSign_in()}>
            <G1B />
          </div>
        </div>
      </div>
      <div ref={aboutRef} className="llabout">
        <div className="llaboutapp"></div>
        <div className="llaboutvisit"></div>
      </div>
    </>
  );
};

export default LP;
