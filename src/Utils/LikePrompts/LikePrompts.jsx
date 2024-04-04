import React, { useEffect } from 'react'
import './LikePrompts.css'
import { useSiso } from '../../Context/siso';

const LikePrompts = ({post}) => {
  const siso = useSiso();
  return (
    <div className="ulpmain">
      <div className="ulpheading">Pushed by:</div>
      {[...siso.usersLiked].map((p, index) => (
        <div className="ulpnameandprofilepic">
          <div className="ulpprofilepic">
            <img className="ulpprofilepicimg" src={p.profilePic} alt="" />
          </div>
          <div className="ulpname">{p.fullName}</div>
        </div>
      ))}
    </div>
  );
}

export default LikePrompts