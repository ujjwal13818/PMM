import React from "react";
import "./Congrats.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark,
  faCircleCheck,
  faSmile,
  faFaceGrinStars,
} from "@fortawesome/free-solid-svg-icons";
import { useSiso } from "../../Context/siso";
import { text } from "@fortawesome/fontawesome-svg-core";
import {
  faLinkedin,
  faWhatsapp,
  faFacebook,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

const Congrats = ({handlePage}) => {
  const siso = useSiso();
  return (
    <>
      <div className="uconmain">
        <FontAwesomeIcon
          icon={faXmark}
          className="pfXmark"
          style={{
            position: "absolute",
            top: "1%",
            right: "2%",
            color: "white",
            fontSize: "1.5rem",
          }}
          onClick={() => {
            handlePage;
            window.location.reload();
          }}
        />
        {siso.userInfo && (
          <div className="ucontext">
            Congratulations,{" "}
            <span className="uconname">{siso.userInfo.first_name}</span>
          </div>
        )}
        <div className="uconicon">
          <FontAwesomeIcon
            icon={faCircleCheck}
            flip
            style={{ color: "white", fontSize: "10rem" }}
          />
        </div>
        <div className="uconsharing">
          <div className="uconsharetext">Share your accomplishment on</div>
          <div className="uconshareicons">
            <div className="uconsharelinkedin uconshareicon">
              <FontAwesomeIcon
                icon={faLinkedin}
                style={{ color: "rgb(7, 100, 180)" }}
              />
            </div>
            <div className="uconsharewhatsapp uconshareicon">
              <FontAwesomeIcon
                icon={faWhatsapp}
                style={{ color: "rgb(7, 200, 205)" }}
              />
            </div>
            <div className="uconsharefb uconshareicon">
              <FontAwesomeIcon icon={faFacebook} style={{ color: "white" }} />
            </div>
            <div className="uconshareinsta uconshareicon">
              <FontAwesomeIcon icon={faInstagram} style={{ color: "red" }} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Congrats;
