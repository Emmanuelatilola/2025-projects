import React from 'react'
import './Loader.css'

function Loader({ text = 'Loading...' }) {
  return (
    <div className="loader">
      <span className="dot"></span>
      <span className="dot"></span>
      <span className="dot"></span>
      <span className="sr-only">{text}</span>
    </div>
  )
}

export default Loader

