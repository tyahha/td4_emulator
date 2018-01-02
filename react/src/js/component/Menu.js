import React from 'react'
import ReactDom from 'react-dom'

export default function Menu(props) {
  return (
    <div className="menu">
      <label htmlFor="load-file" className="square_btn">
        Load Program
        <input type="file" id="load-file" style={{display:'none'}} accept=".td4" />
      </label>
      <a download="program.td4" className="square_btn" id="save-file" href="#">Save Program</a>
    </div>
  )
}
