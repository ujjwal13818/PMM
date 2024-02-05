import React, { useState } from "react";
import "./Sign_up.css";
import G3B from "../../Buttons/G3B/G3B";
import SUB from "../../Buttons/SUB/SUB";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useSiso } from "../../../Context/siso";



const Sign_up = ({ toggleSign_up }) => {
  const siso = useSiso();

  const [confirmPassword, setConfirmPassword] = useState("");
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if(userData.password.length < 6){
      setError("Password should be at least six characters long buddy.");
      return;
    }
    if (confirmPassword != userData.password)
    setError("Password did not match");
    else setError("");
    siso.sign_up_user(userData.email,userData.password);
    siso.add_user(userData);
    setUserData({
      ...userData,
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    });
    setConfirmPassword("");
  };

  const handleChange = (e) => {
    e.preventDefault();
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="cfsu">
        <div className="cfsumain">
          <div className="cfsuleft">
            <div className="push">PUSH</div>
            <div className="my">MY</div>
            <div className="motive">MOTIVE</div>
          </div>
          <div className="cfsuright">
            <div className="sign_up_head">
              <h1>Sign Up Form</h1>
              <div className="cfsuclose" onClick={() => toggleSign_up()}>
                <FontAwesomeIcon icon={faXmark} />
              </div>
            </div>
            <form
              action=""
              className="sign_up_form"
              onSubmit={handleFormSubmit}
            >
              <div className="inlbsu">
                <input
                  type="text"
                  autoComplete="off"
                  className="fnin"
                  placeholder=""
                  name="firstName"
                  value={userData.firstName}
                  onChange={handleChange}
                />
                <label htmlFor="" className="fnlb">
                  First Name
                </label>
              </div>

              <div className="inlbsu">
                <input
                  type="text"
                  autoComplete="off"
                  className="lnin"
                  placeholder=""
                  name="lastName"
                  value={userData.lastName}
                  onChange={handleChange}
                />
                <label htmlFor="" className="lnlb">
                  Last Name
                </label>
              </div>

              <div className="inlbsu">
                <input
                  type="email"
                  autoComplete="off"
                  className="emin"
                  placeholder=""
                  name="email"
                  value={userData.email}
                  onChange={handleChange}
                />
                <label htmlFor="" className="emlb">
                  Email
                </label>
              </div>

              <div className="inlbsu">
                <input
                  type="password"
                  autoComplete="off"
                  className="pin"
                  placeholder=""
                  name="password"
                  value={userData.password}
                  onChange={handleChange}
                />
                <label htmlFor="" className="plb">
                  Password
                </label>
              </div>

              <div className="inlbsu">
                <input
                  type="text"
                  autoComplete="off"
                  className="cpin"
                  placeholder=""
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <label htmlFor="" className="cplb">
                  Confirm Password
                </label>
              </div>
              <div
                className="sign_up_error"
                style={{ color: "red", fontSize: "13px", marginBottom: "1vh" }}
              >
                {error}
              </div>
              <div className="sign_up_google">
                <G3B />
              </div>
              <div className="sub_btn">
                <button className="cbsub" type="submit">
                  Sign Up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default Sign_up;
