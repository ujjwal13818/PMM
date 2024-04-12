import React, { useEffect, useState } from "react";
import "./Fcards.css";
import { useSiso } from "../../Context/siso";

const Fcards = ({ peer }) => {

  const siso = useSiso();

  const [peerDetails, setPeerDetails] = useState();
  const [supported, setSupported] = useState(false);

  useEffect(async () => {
    if (siso.userInfo && siso.userInfo.supportiveMarkedTo !== undefined) {
      setSupported(siso.userInfo.supportiveMarkedTo.includes(peer));
    }
    const data = await siso.getUserDetails(peer);
    setPeerDetails(data);
  }, []);

  return (
    <div className="uc">
      {peerDetails && (
        <div className="upctopprofilepic">
          <img
            className="upctopprofilepicimg"
            src={peerDetails.profilePic}
            alt="img"
            srcSet=""
          />
        </div>
      )}
      <div className="nameandmarksupportive">
        <div className="ucprofilename">
          {peerDetails && peerDetails.first_name + " " + peerDetails.last_name}
        </div>
        {!supported ? (
          <div className="marksupportive" onClick={() => {
            siso.handleSupportiveMarking(peer);
            setSupported(true)
          }}>Supportive</div>
        ) : (
          <div className="markunsupportive" onClick={() => {
            siso.handleSupportedUnmarking(peer);
            setSupported(false);
          }}>Unsupportive</div>
        )}
      </div>
    </div>
  );
};

export default Fcards;
