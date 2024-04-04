import React, { useEffect } from "react";
import "./CommentsOn.css";
import { useSiso } from "../../Context/siso";

const CommentsOn = () => {
  const siso = useSiso();
  return (
    <div className="ucomaincontainer">
      <div className="ucoheading">
        <div className="ucoheadingcontent">Comments</div>
        <br />
      </div>
      <div className="ucoallcomments">
        {siso.allComments.length == 0 ? <div className="ucocontent">No comments yet</div> : [...siso.allComments].map((Comment, index) => (
          <div className="ucocontent">
            <div className="ucopicnamedate">
              <div className="ucopic">
                <img src={Comment.profilePic} alt="" className="ucopicimg" />
              </div>
              <div className="uconamedate">
                <div className="uconame">{Comment.fullName}</div>
                <div className="ucodate">{Comment.date}</div>
              </div>
            </div>
            <div className="ucocomment">{Comment.Comment}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentsOn;
