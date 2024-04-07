import React, { useState } from 'react'
import './EditPost.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const EditPost = ({handlePage}) => {
    const [motive,setMotive] = useState("");
  return (
    <>
      <div className="uepmain">
        <div className="pfmain">
          <FontAwesomeIcon
            icon={faXmark}
            className="pfXmark"
            style={{ position: "absolute", top: "3%", right: "26%" }}
            onClick={handlePage}
          />
          <div className="pfheading">
            <h1>Edit your motive</h1>
          </div>
          <div className="pftextarea">
            <textarea
              name="motive"
              id=""
              cols="30"
              rows="15"
              value={motive}
              onChange={(e) => setMotive((motive) => e.target.value)}
              style={{ resize: "none" }}
            ></textarea>
          </div>
          <div className="pfaddimgandaddmotive">
            <div className="pfaddmotivebtn">
              <button className="addmotivebtn">Edit motive</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditPost