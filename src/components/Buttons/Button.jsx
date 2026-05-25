import React from 'react'

function Button({onClick, type, label}) {
  return (
    <button className="custom-btn"  type= {type} onClick={onClick}> {label} </button>
  )
}

export default Button