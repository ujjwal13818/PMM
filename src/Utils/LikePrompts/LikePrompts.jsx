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
            </div>
              <div className="ulpname">{p}</div>
          </div>
      ))}
    </div>
  );
}

export default LikePrompts