import React, { useEffect, useState } from "react";
import "./UpdateProfilePic.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useSiso } from "../../Context/siso";

const UpdateProfilePic = () => {
  const siso = useSiso();
  const navigate = useNavigate();
  const [profilePic, setProfilePic] = useState();
  const [spinner, setSpinner] = useState(false);

  const reloadFn = () => {
    setTimeout(() => {
      window.location.reload();
    }, [100]);
  };

  const handleDelete = async () => {
    setSpinner(true);
    await siso.removeProfilePic();
    setSpinner(false);
  };

  const handleUpdate = async () => {
    if (profilePic) {
      setSpinner(true);
      await siso.updateProfilePic(profilePic);
      setSpinner(false);
    }
  };

  const goBack = async () => {
    navigate("/profile");
    reloadFn();
  };

  return (
    <>
      {siso.userInfo && (
        <div className="uupmaincontainer">
          <div className="upcfsi">
            <div className="siheading">
              <h1>Update/Remove profile photo</h1>
              <div className="upcfsiclose" onClick={() => goBack()}>
                <FontAwesomeIcon icon={faXmark} />
              </div>
            </div>
            <div className="upcfsimain">
              <div className="deletephoto">
                <button
                  className="deletephoto"
                  onClick={() => {
                    handleDelete();
                  }}
                >
                  {spinner ? (
                    <FontAwesomeIcon icon={faSpinner} spinPulse />
                  ) : (
                    <div className="deletephototext">Remove profile photo</div>
                  )}
                </button>
              </div>
              <div className="updatediv">
                <div className="updatephoto">
                  <input
                    type="file"
                    className="updatephotoinput"
                    onChange={(e) => setProfilePic(e.target.files[0])}
                  />
                </div>
                <button
                  className="updatephotobtn"
                  onClick={() => {
                    handleUpdate();
                  }}
                >
                  {spinner ? (
                    <FontAwesomeIcon icon={faSpinner} spinPulse />
                  ) : (
                    "Update"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UpdateProfilePic;
