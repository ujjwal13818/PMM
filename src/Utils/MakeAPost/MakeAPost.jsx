import React from 'react'
import './MakeAPost.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from '@fortawesome/free-solid-svg-icons';

const MakeAPost = () => {
  return (
    <>
        <div className="umap">
          <span className="umaptext">
            Write a motive
          </span>
          <FontAwesomeIcon icon={faPencil} className='umappencil' />
        </div>
    </>
  );
}

export default MakeAPost