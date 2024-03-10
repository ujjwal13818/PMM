import React, { useEffect, useState } from 'react'
import './PostCards.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandPointer , faComment } from '@fortawesome/free-solid-svg-icons';
import { useSiso } from '../../Context/siso';
import LikePrompts from '../LikePrompts/LikePrompts';


const PostCards = ({ bgcs , bgheader , post }) => {
const siso = useSiso();
const [isLiked, setIsLiked] = useState(post.likedBy.includes(siso.userInfo.email));
const [noOfPushes , setNoOfPushes] = useState(post.Likes);
const [showLikedBy , setShowLikedBy] = useState(false);
  const handleLikes = () =>{
    if(!isLiked){
      setNoOfPushes(noOfPushes + 1);
      siso.updatePushes(post.emailId, post.postId,true,siso.userInfo.email);
    }
    else {
      setNoOfPushes(noOfPushes - 1);
      siso.updatePushes(post.emailId, post.postId, false, siso.userInfo.email);
    }
    setIsLiked(!isLiked);
  }

  useEffect(() => {
    if (showLikedBy) {
      siso.likedUsers(post.emailId, post.postId);
    }
    else siso.clearLikedBy();
  },[showLikedBy]);

  return (
    <>
      <div className="upmain">
        <div className="upc" style={{ background: `${bgcs}` }}>
          <div className="upctop" style={{ background: `${bgheader}` }}>
            <div className="upctopprofilepic"></div>
            <div className="upctopnameandsubtitle">
              <div className="upctopname">{post.fullName}</div>
              <div className="upctopsubtitle">5 posts, 2 accomplishments</div>
            </div>
          </div>
          <div className="upcbottom" style={{ background: `${bgcs}` }}>
            {post.Motive}
          </div>
        </div>
        <div className="uppushcomment" style={{ background: `${bgcs}` }}>
          <div className="uppush" style={{ background: `${bgcs}` }}>
            <div
              className={`upicon ${isLiked ? " liked" : ""}`}
              onClick={handleLikes}
            >
              <FontAwesomeIcon icon={faHandPointer} />
            </div>
            <div className="uppushtext" onClick={async() => {
              await siso.clearLikedBy();
              setShowLikedBy(!showLikedBy); 
            }}>{noOfPushes} pushes</div>
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
        {showLikedBy &&  <div className='LikedByPrompt'> <LikePrompts post = {post}/> </div>}
      </div>
    </>
  );
};

export default PostCards