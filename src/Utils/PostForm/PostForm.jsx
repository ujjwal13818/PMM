import React, { useEffect, useState } from 'react'
import './PostForm.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useSiso } from '../../Context/siso';


const PostForm = ({togglePostForm}) => {
const [motive , setMotive] = useState("");

  const siso = useSiso();
  const handlePost = () => {
    if(motive.length > 0)siso.postMotive(motive);
    setMotive("");
    togglePostForm();
  }

  return (
    <>
      <div className="pfmain">
        <FontAwesomeIcon icon={faXmark} className='pfXmark' style={{position: "absolute" , top: "2%" , right : "1%"}} onClick={togglePostForm}/>
        <div className="pfheading">
          <h1>Write your motive</h1>
        </div>
        <div className="pftextarea">
          <textarea
            name="motive"
            id=""
            cols="30"
            rows="15"
            value={motive}
            placeholder="Take a big step towards your goal by sharing your motive."
            onChange={(e) => setMotive((motive) => e.target.value)}
          ></textarea>
        </div>
        <div className="pfaddimgandaddmotive">
          <div className="pfaddimg">
            <input type="file" />
          </div>
          <div className="pfaddmotivebtn">
            <button className="addmotivebtn" onClick={() => handlePost()}>Add motive</button>
          </div>
        </div>
      </div>
    </>
  );
}
export default PostForm