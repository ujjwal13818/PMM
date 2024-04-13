import React, { useState } from "react";
import "./FinalDelete.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import SIB from "../../Components/Buttons/SIB/SIB";
import { useSiso } from "../../Context/siso";

const FinalDelete = () => {
  const siso = useSiso();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [missing ,  setMissing] = useState(false);

  const handleSubmit = () => {
    if(username.length === 0 || password.length === 0){
        alert("Enter credentials");
        return
    }
    setMissing(true);
    setTimeout(async() => {
    await siso.deleteAccount(username,password);
    setMissing(false);

    },1000)
  };

  return (
    <>
      <div className="ufdmaincontainer">
        <div className="cfsi">
          <div className="siheading">
            <h2>Reauthenticate yourself to delete account</h2>
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
          <button
            className="cbsib"
            type="submit"
            onClick={() => handleSubmit()}
          >
            {!missing ? (
              <div className="text">Sign in</div>
            ) : (
              <div className="missingplusspinner">
                <div className="text">W'll be missing you champ</div>
                <FontAwesomeIcon icon={faSpinner} spinPulse />
              </div>
            )}
          </button>
        </div>
      </div>
    </>
  );
};

export default FinalDelete;
