import React from 'react'
import ReactDom from 'react-dom'

export default function Reset(props) {
  return (
    <div>
      <button
        className="reset-button"
        onClick={props.onReset}
      >Reset</button>
    </div>
  )
}