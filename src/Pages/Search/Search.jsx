import React, { useState, useEffect } from "react";
import "./Search.css";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faHouse,
  faCloud,
  faMagnifyingGlass,
  faEnvelope,
  faUser,
  faArrowRightFromBracket,
  faPencil,
  faCalendarDays,
  faShare,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import Navbar from "../../Components/Navbar/Navbar";
import { useSiso } from "../../Context/siso";
import Usercard from "../../Utils/Usercard/Usercard";

const Search = () => {
  const [destination, setDestination] = useState();
  const [isHome, setHome] = useState(false);
  const [isPost, setPost] = useState(false);
  const [isSearch, setSearch] = useState(true);
  const [isNotification, setNotification] = useState(false);
  const [isProfile, setProfile] = useState(false);
  const [searchValue, setSearchValue] = useState(null);
  const [searchedUser, setSearchedUser] = useState([]);
  const navigate = useNavigate();
  const siso = useSiso();

  //searching
  useEffect(() => {
    const searchFunction = (users) => {
      return users.filter((user) => {
        return user.first_name.toLowerCase() === ""
          ? user
          : user.first_name.toLowerCase().includes(searchValue.toLowerCase());
      });
    };
    setSearchedUser(searchFunction(siso.allUsers));
  }, [searchValue]);

  useEffect(() => {
    navigate(destination);
  }, [destination]);
  const handleSignOut = () => {
    siso.sign_out();
    navigate("/");
  };

  return (
    <>
      {siso.allUsers ? (
        <div className="psmaincontainer">
          <div className="phnv">
            <div
              className={`${isHome ? "phnvicon active" : "phnvicon"}`}
              onClick={() => {
                setDestination("/home");
              }}
            >
              <FontAwesomeIcon icon={faHome} />
            </div>
            <div
              className={`${isPost ? "phnvicon active" : "phnvicon"}`}
              onClick={() => {
                setDestination("/myposts");
              }}
            >
              <FontAwesomeIcon icon={faCloud} />
            </div>
            <div
              className={`${isSearch ? "phnvicon active" : "phnvicon"}`}
              onClick={() => {
                setDestination("/search");
              }}
            >
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </div>
            <div
              className={`${isNotification ? "phnvicon active" : "phnvicon"}`}
              onClick={() => {
                setDestination("/notification");
              }}
            >
              <FontAwesomeIcon icon={faEnvelope} />
            </div>
            <div
              className={`${isProfile ? "phnvicon active" : "phnvicon"}`}
              onClick={() => {
                setDestination("/profile");
              }}
            >
              <FontAwesomeIcon icon={faUser} />
            </div>
            <div
              className="phnvicon"
              onClick={() => {
                handleSignOut();
              }}
            >
              <FontAwesomeIcon icon={faArrowRightFromBracket} />
            </div>
          </div>
          <div className="pmpheading">
            <div className="pmpnav">
              <Navbar />
            </div>
            <div className="pmplogo">
              <img src="/whiteLogo.png" alt="" srcSet="" className="phimg" />
            </div>
            <div className="pmpheadingnameandtitle">
              {siso.userInfo && (
                <div className="pmpheadingname">
                  Hello, {siso.userInfo.first_name}
                </div>
              )}
              <div className="pssearch">
                <input
                  type="text"
                  className={`search ${
                    searchValue ? "search expandSearch" : ""
                  }`}
                  placeholder="Search users"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                />
                <div
                  className={`searchicon ${
                    searchValue ? "searchicon showsearchicon" : ""
                  }`}
                >
                  <FontAwesomeIcon icon={faSearch} />
                </div>
              </div>
            </div>
          </div>
          <div className="pscontent">
            {searchValue && (
              <div className="searchresults">
                <div className="searchresulttext">Search Results</div>
                <div className="searchcard">
                  {searchedUser.length === 0 ? (
                    <Usercard user={null} />
                  ) : (
                    [...searchedUser].map((user) => (
                      <div className="singlesuggestion">
                        <Usercard user={user} />
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
            <div className="pssuggestions">
              <div className="suggestedpeople">
                <div className="psleftline"></div>
                <div className="suggestedtext">Suggested people</div>
                <div className="psrightline"></div>
              </div>
              <div className="suggestions">
                {[...siso.allUsers].map((user, index) => (
                  <div className="singlesuggestion">
                    <Usercard user={user} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="loading">Loading...</div>
      )}
    </>
  );
};

export default Search;
