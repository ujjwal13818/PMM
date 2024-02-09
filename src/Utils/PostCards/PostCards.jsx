import React from 'react'
import './PostCards.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandPointer , faComment } from '@fortawesome/free-solid-svg-icons';
const PostCards = () => {
  return (
    <>
      <div className="upmain">
        <div className="upc">
          <div className="upctop">
            <div className="upctopprofilepic"></div>
            <div className="upctopnameandsubtitle">
              <div className="upctopname">Ujjwal kumar</div>
              <div className="upctopsubtitle">5 posts, 2 accomplishments</div>
            </div>
          </div>
          <div className="upcbottom">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quasi
            corrupti non repudiandae excepturi! Nam veritatis beatae explicabo
            dolores corrupti
          </div>
        </div>
        <div className="uppushcomment">
          <div className="uppush">
            <div className="upicon">
              <FontAwesomeIcon icon={faHandPointer} />
            </div>
            <div className="uppushtext">10 pushes</div>
          </div>
          <div className="upcomment">
            <div className="upcommenticon">
              <FontAwesomeIcon className='commenticon' icon={faComment} />
            </div>
            <div className="upcommenttext">4 comments</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PostCards