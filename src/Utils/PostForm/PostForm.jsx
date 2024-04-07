import React, { useEffect, useState } from "react";
import "./PostForm.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useSiso } from "../../Context/siso";

const PostForm = ({ togglePostForm, deadline }) => {
  const [motive, setMotive] = useState("");
  const [date, setDate] = useState(deadline);

  const siso = useSiso();
  const handlePost = async () => {
    if (motive.length > 0) {
      await siso.postMotive(motive, date);
    }
    setMotive("");
    togglePostForm();
  };

  return (
    <>
      <div className="pfmain">
        <FontAwesomeIcon
          icon={faXmark}
          className="pfXmark"
          style={{ position: "absolute", top: "2%", right: "1%" }}
          onClick={togglePostForm}
        />
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
            style={{ resize: "none" }}
          ></textarea>
        </div>
        <div className="pfaddimgandaddmotive">
          <div className="pfaddimg">
            {deadline != null ? (
              <div className="showdeadline">
                Deadline: <b>{deadline}</b>
              </div>
            ) : (
              <div className="adddeadline">
                <label htmlFor="deadline">Deadline:</label>
                <input
                  type="date"
                  name="deadline"
                  id=""
                  className="udldeadline"
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
            )}
          </div>
          <div className="pfaddmotivebtn">
            <button className="addmotivebtn" onClick={() => handlePost()}>
              Add motive
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default PostForm;
