import React from 'react'
import './G3B.css'
const G3B = () => {
    const url = "https://www.svgrepo.com/show/475656/google-color.svg";
  return (
    <button type="submit" className="cbg3b">
      <img src={url} alt="" className="icon" />
      <div className="textg3b">Sign Up with google</div>
    </button>
  );
}

export default G3B