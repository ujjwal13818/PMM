import React from "react";
import "./DeleteAccount.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleExclamation,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useSiso } from "../../Context/siso";
import { Link, useNavigate } from "react-router-dom";

const DeleteAccount = () => {
  const siso = useSiso();
  const navigate = useNavigate();

  const goBack = () => {
    navigate("/profile");
  };

  return (
    <>
      <div className="udamaincontainer">
        <div className="udpmain">
          <FontAwesomeIcon
            icon={faXmark}
            className="pfXmark"
            style={{ position: "absolute", top: "3%", right: "1%" }}
            onClick={() => {
              goBack();
            }}
          />
          <div className="udpwarning"></div>
          <div className="udpwarningtext">
            All the posts with accomplishments will be deleted with the account.
            <b> Are you sure to delete your account?</b>
          </div>
          <FontAwesomeIcon
            icon={faCircleExclamation}
            beatFade
            style={{
              color: "red",
              fontSize: "100px",
              marginTop: "3vh",
            }}
          />
          <div className="udpwarningbtns">
            <div className="udpwarningdelete">
              <Link to={"http://localhost:5173/finaldelete"}>
                <button className="udpwarningdelete">Yes</button>
              </Link>
            </div>
            <div className="udpwarningcancel">
              <button
                className="udpwarningcancel"
                onClick={() => {
                  goBack();
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteAccount;
