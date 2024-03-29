import React, { useEffect, useState } from 'react'
import './PostCards.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandPointer , faComment } from '@fortawesome/free-solid-svg-icons';
import { useSiso } from '../../Context/siso';
import LikePrompts from '../LikePrompts/LikePrompts';
import CommentsOn from "../CommentsOn/CommentsOn";
import AddComments from '../AddComments/AddComments';


const PostCards = ({ bgcs , bgheader , post  }) => {
const siso = useSiso();
const [isLiked, setIsLiked] = useState(post.likedBy.includes(siso.userInfo.email));
const [noOfPushes , setNoOfPushes] = useState(post.Likes);
const [noOfComments , setNoOfComments] = useState(post.Comments.length);
const [showLikedBy , setShowLikedBy] = useState(false);
const [showComments, setShowComments] = useState(false);
const [showAddComments, setShowAddComments] = useState(false);


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


  useEffect(() => {
    if(showComments){
     siso.getComments(post.emailId, post.postId);
    }
    else siso.clearComments();
  },[showComments])


  return (
    <>
      {showLikedBy && (
        <div className="LikedByPrompt">
          {" "}
          <LikePrompts post={post} />{" "}
        </div>
      )}
      <div className="upmain">
        <div className="upc" style={{ background: `${bgcs}` }}>
          <div className="upctop" style={{ background: `${bgheader}` }}>
            <div className="upctopprofilepic">
              <img
                className="upctopprofilepicimg"
                src={post.profilePic}
                alt="img"
                srcset=""
              />
            </div>
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
            <div
              className="uppushtext"
              onClick={async () => {
                await siso.clearLikedBy();
                setShowComments(false);
                setShowAddComments(false);
                setShowLikedBy(!showLikedBy);
              }}
            >
              {noOfPushes} {noOfPushes == 1 ? `push` : `pushes`}
            </div>
          </div>
          <div className="upcomment" style={{ background: `${bgcs}` }}>
            <div className="upcommenticon">
              <FontAwesomeIcon
                className="commenticon"
                icon={faComment}
                style={{ color: "green" }}
                onClick={() => {
                  setShowComments(false);
                  setShowLikedBy(false);
                  setShowAddComments(!showAddComments);
                }}
              />
            </div>
            <div
              className="upcommenttext"
              onClick={() => {
                setShowLikedBy(false);
                setShowAddComments(false);
                setShowComments(!showComments);
              }}
            >
              {noOfComments} Comments
            </div>
          </div>
        </div>
      </div>
      {showAddComments && (
        <div className="upAddComments">
          <AddComments post={post} />
        </div>
      )}
      {showComments && (
        <div className="upcomments">
          {" "}
          <CommentsOn />
          {" "}
        </div>
      )}
    </>
  );
};

export default PostCards