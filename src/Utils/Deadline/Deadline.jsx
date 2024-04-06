import React, { useState } from 'react'
import './Deadline.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
const Deadline = ({handlePage}) => {
const[newDate , setNewDate] = useState();

  return (
    <div className="udlmain">
      <FontAwesomeIcon
        icon={faXmark}
        className="pfXmark"
        style={{ position: "absolute", top: "3%", right: "1%" }}
        onClick={handlePage}
      />
      <div className="udldates">
        <div className="udlcurrent">
          Current deadline: <b>29/09/2003</b>
        </div>
        <div className="udlnew">New deadline: 
          <input type="date" className='udldeadline' onChange={(e) => setNewDate(e.target.value)}/>
        </div>
      </div>
    </div>
  );
}

export default Deadline