import React, { useState } from "react";
import "./Sign_in.css";
import SIB from "../../Buttons/SIB/SIB";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useSiso } from "../../../Context/siso";



const Sign_in = ({ toggleSign_in }) => {
  
  const siso = useSiso();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");


  
  const handleSubmit = () => {
    siso.sign_in_user(username,password);
    setUsername("");
    setPassword("");
  }

  return (
    <>
      <div className="cfsi">
        <div className="siheading">
          <h1>Login Form</h1>
          <div className="cfsiclose" onClick={() => toggleSign_in()}>
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
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label htmlFor="" className="fnlb">
              Username
            </label>
          </div>
          <div className="siinlb">
            <input
              type="password"
              autoComplete="off"
              className="fnin"
              placeholder=""
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="" className="fnlb">
              Password
            </label>
          </div>
        </div>
      </div>
      <div className="subsi">
        <SIB handleSubmit = {handleSubmit} />
      </div>
    </>
  );
};

export default Sign_in;
