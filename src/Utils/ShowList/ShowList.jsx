import React from "react";
import "./ShowList.css";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useSiso } from "../../Context/siso";

const ShowList = ({ handlePage, sentStatus }) => {
  const siso = useSiso();
  const [status, setStatus] = useState(sentStatus);
  const [list, setList] = useState(
    status === "by"
      ? siso.userInfo && siso.userInfo.supportiveMarkedBy
      : siso.userInfo && siso.userInfo.supportiveMarkedTo
  );
  const [allPeersData, setAllPeersData] = useState([]);

  useState(() => {
    {
      [...list].map(async (emailId, index) => {
        const detailsObj = await siso.get_peer_info(emailId);
        setAllPeersData((prev) => [...prev, detailsObj]);
      });
    }
  }, []);
  return (
    <>
      <div className="uslmaincontainer">
        <div className="uslcontent">
          <FontAwesomeIcon
            icon={faXmark}
            className="pfXmark"
            style={{
              position: "absolute",
              top: "2%",
              right: "1%",
              fontSize: "1.4rem",
              color: "white"
            }}
            onClick={handlePage}
          />
          <div className="uslheading">
            {status === "by"
              ? "Peers who marked you supportive:"
              : "Peers whom you marked supportive to:"}
          </div>
          <div className="uslalllist">
            {allPeersData && [
              ...allPeersData.map((data) => (
                <div className="uslsinglelist">
                  <div className="uslprofilepic">
                    <img
                      src={data.profilePic}
                      alt={data.name}
                      className="uslprofilepicimg"
                    />
                  </div>
                  <div className="uslname">
                    {data.first_name + " " + data.last_name}
                  </div>
                </div>
              )),
            ]}
          </div>
        </div>
      </div>
    </>
  );
};

export default ShowList;
