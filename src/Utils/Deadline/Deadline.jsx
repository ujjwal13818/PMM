import React, { useState } from 'react'
import './Deadline.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useSiso } from '../../Context/siso';
const Deadline = ({ handlePage, currentPost }) => {
  const [newDate, setNewDate] = useState();
  const siso = useSiso();
  const handleDeadline = async() => {
    await siso.updateDeadline(currentPost.postId, newDate);
    alert('Deadline updated, Kindly refresh the page to see changes');
    handlePage();
  }
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
          Current deadline: <b>{currentPost.deadline}</b>
        </div>
        <div className="udlnew">
          New deadline:
          <input
            type="date"
            className="udldeadline"
            onChange={(e) => setNewDate(e.target.value)}
          />
        </div>
        <button className="udldone" onClick={() => {handleDeadline()}}>Done</button>
      </div>
    </div>
  );
};

export default Deadline