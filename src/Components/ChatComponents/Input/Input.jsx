import React from 'react'
import './Input.css'

const Input = () => {
  return (
    <>
        <div className="Inputmaincontainer">
            <input type="text" className="maincontainer" placeholder='Type a message...' autoComplete='off'/>
        </div>
    </>
  )
}

export default Input