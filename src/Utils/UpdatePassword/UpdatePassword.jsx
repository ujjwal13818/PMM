import React, { useState } from 'react'
import './UpdatePassword.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';
import SIB from '../../Components/Buttons/SIB/SIB';
import { useSiso } from '../../Context/siso';

const UpdatePassword = () => {
    const siso = useSiso();
    const navigate = useNavigate();

    const [oldPass, setOldPass] = useState("");
    const [newPass, setNewPass] = useState("");
    const [spinner , setSpinner] = useState(false);

      const handleSubmit = async() => {
        setSpinner(true);
        await siso.updatePass(oldPass, newPass);
        navigate('/profile');
      };

      const goBack = async() => {
        navigate('/profile');
      }

  return (
    <>
      {siso.userInfo && (
        <div className="uupmaincontainer">
          <div className="cfsi">
            <div className="siheading">
              <h1>Update password</h1>
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
                  value={oldPass}
                  onChange={(e) => setOldPass(e.target.value)}
                />
                <label htmlFor="" className="fnlb">
                  Old Password
                </label>
              </div>
              <div className="siinlb">
                <input
                  type="password"
                  autoComplete="off"
                  className="fnin"
                  placeholder=""
                  name="password"
                  value={newPass}
                  onChange={(e) => setNewPass(e.target.value)}
                />
                <label htmlFor="" className="fnlb">
                  New password
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
}

export default UpdatePassword