import React, { useState } from "react";
import "./UpdateName.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import SIB from "../../Components/Buttons/SIB/SIB";
import { useSiso } from "../../Context/siso";

const UpdateName = () => {
  const siso = useSiso();
  const navigate = useNavigate();

  const [first_name, setfirst_name] = useState("");
  const [last_name, setlast_name] = useState("");
  const [spinner, setSpinner] = useState(false);

  const reloadFn = () => {
    setTimeout(() => {
     window.location.reload();   
    },[100])
  }
  const handleSubmit = async () => {
    setSpinner(true);
    await siso.updateName(first_name,last_name);
    navigate("/profile");
    reloadFn();
  };

  const goBack = async () => {
    navigate("/profile");
    reloadFn();
  };

  return (
    <>
      {siso.userInfo && (
        <div className="uupmaincontainer">
          <div className="cfsi">
            <div className="siheading">
              <h1>Update Name</h1>
              <div className="cfsiclose" onClick={() => goBack()}>
                <FontAwesomeIcon icon={faXmark} />
              </div>
            </div>
            <div className="cfsimain">
              <div className="siinlb">
                <input
                  type="text"
                  autoComplete="off"
                  className="fnin"
                  placeholder=""
                  name="username"
                  value={first_name}
                  onChange={(e) => setfirst_name(e.target.value)}
                />
                <label htmlFor="" className="fnlb">
                  First Name:
                </label>
              </div>
              <div className="siinlb">
                <input
                  type="text"
                  autoComplete="off"
                  className="fnin"
                  placeholder=""
                  name="password"
                  value={last_name}
                  onChange={(e) => setlast_name(e.target.value)}
                />
                <label htmlFor="" className="fnlb">
                  Last Name:
                </label>
              </div>
            </div>
          </div>
          <div className="subsi">
            <SIB handleSubmit={handleSubmit} />
          </div>
        </div>
      )}
    </>
  );
};

export default UpdateName;
