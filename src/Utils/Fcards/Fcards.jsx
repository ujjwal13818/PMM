import React, { useEffect, useState } from 'react'
import './Fcards.css'
import { useSiso } from '../../Context/siso';


const Fcards = ({peer}) => {
  const siso = useSiso();
  const [peerDetails, setPeerDetails] = useState();

  useEffect(async() => {
    const data = await siso.getUserDetails(peer);
    setPeerDetails(data);
  },[])

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
      <div className="ucprofilename">
        {peerDetails && peerDetails.first_name + " " + peerDetails.last_name}
      </div>
    </div>
  );
}

export default Fcards