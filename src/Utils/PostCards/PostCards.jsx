import React, { useEffect, useState } from 'react'
import './PostCards.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandPointer , faComment } from '@fortawesome/free-solid-svg-icons';
import { useSiso } from '../../Context/siso';


const PostCards = ({ bgcs , bgheader , post }) => {
const siso = useSiso();
const [isLiked, setIsLiked] = useState(false);
const [noOfPushes , setNoOfPushes] = useState(post.Likes);
  const handleLikes = () =>{
    if(!isLiked){
      setNoOfPushes(noOfPushes + 1);
      siso.updatePushes(post.emailId, post.postId,true);
    }
    else {
      setNoOfPushes(noOfPushes - 1);
      siso.updatePushes(post.emailId, post.postId, false);
    }
    setIsLiked(!isLiked);
  }

  return (
    <>
      <div className="upmain">
        <div className="upc" style={{ background: `${bgcs}` }}>
          <div className="upctop" style={{ background: `${bgheader}` }}>
            <div className="upctopprofilepic"></div>
            <div className="upctopnameandsubtitle">
              <div className="upctopname">Ujjwal kumar</div>
              <div className="upctopsubtitle">5 posts, 2 accomplishments</div>
            </div>
          </div>
          <div className="upcbottom" style={{ background: `${bgcs}` }}>
            {post.Motive}
          </div>
        </div>
        <div className="uppushcomment" style={{ background: `${bgcs}` }}>
          <div className="uppush" style={{ background: `${bgcs}` }} onClick={handleLikes}>
            <div className={`upicon ${isLiked ? " liked" : ""}`}>
              <FontAwesomeIcon icon={faHandPointer} />
            </div>
            <div className="uppushtext">{noOfPushes} pushes</div>
          </div>
          <div className="upcomment" style={{ background: `${bgcs}` }}>
            <div className="upcommenticon">
              <FontAwesomeIcon
                className="commenticon"
                icon={faComment}
                style={{ color: "green" }}
              />
            </div>
            <div className="upcommenttext">4 comments</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostCards