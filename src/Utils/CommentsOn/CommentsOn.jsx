import React from "react";
import "./CommentsOn.css";

const CommentsOn = () => {
  return (
    <div className="ucomaincontainer">
      <div className="ucoheading">
        <div className="ucoheadingcontent">Comments</div>
        <br />
      </div>
      <div className="ucoallcomments">
        {[...Array(10)].map((_, index) => (
          <div className="ucocontent">
            <div className="ucopicnamedate">
              <div className="ucopic"></div>
              <div className="uconamedate">
                <div className="uconame">Ujjwal kumar</div>
                <div className="ucodate">12 march</div>
              </div>
            </div>
            <div className="ucocomment">Nice</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentsOn;
