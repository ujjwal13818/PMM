import React, { useEffect } from "react";
import "./AddComments.css";
import { useState } from "react";
import { useSiso } from "../../Context/siso";

const AddComments = ({ post }) => {
  const siso = useSiso();
  const [comment, setComment] = useState("");
  const [cmntObj, setCmntObj] = useState();
  const [error, setError] = useState(false);
  useEffect(() => {
    if (cmntObj == undefined) return;
   siso.addComment(post.emailId, post.postId, cmntObj);
  }, [cmntObj]);

  const handleSubmit = () => {
    if (comment.length == 0) {
      setError(true);
      return;
    }
    setError(false);
    const date = new Date();
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();
    setCmntObj({
      comment: comment,
      date: `${day}-${month}-${year}`,
      commentedBy: siso.userInfo.email,
    });
    setComment("");
  };

  return (
    <>
      <div className="uacmain">
        <div className="">
          <textarea
            type="text"
            placeholder="Add a comment"
            name="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            autoComplete="off"
            className="uacinput"
            style={{ resize: "none" }}
          />
        </div>
        <div className="uacerror">
          {error ? "*Please enter a comment" : null}
        </div>
        <div className="uacbutton">
          <button className="uacbtn" type="button" onClick={handleSubmit}>
            Add
          </button>
        </div>
      </div>
    </>
  );
};

export default AddComments;
