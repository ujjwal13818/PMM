import React from "react";
import './SIB.css'
const SIB = ({handleSubmit}) => {
  return (
    <button className="cbsib" type="submit" onClick={() => handleSubmit()}>
      <div className="text">Sign in</div><img src="/login.svg" alt="" />
    </button>
  );
};

export default SIB;
