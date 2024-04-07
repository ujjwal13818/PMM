import React, { useState } from "react";
import "./Share.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import Congrats from "../Congrats/Congrats";
const Share = ({ handlePage,handleCongrats }) => {
  // const handleCongrats = () => {
  //   setIsCongrats(false);
  // }
  return (
    <div className="ushmain">
          <FontAwesomeIcon
            icon={faXmark}
            className="pfXmark"
            style={{ position: "absolute", top: "3%", right: "1%" }}
            onClick={handlePage}
          />
          <div className="ushask">
            Have you accomplished your motive?
            <div className="ushaskbtn">
              <button className="ushaskbtn" onClick={() => {handleCongrats()}}>
                Yes
              </button>
            </div>
          </div>
        </div>
  );
};

export default Share;
