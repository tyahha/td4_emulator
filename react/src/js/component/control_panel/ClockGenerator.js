import React from 'react'
import ReactDom from 'react-dom'

export default function ClockGenerator(props) {
  return (
    <div className="clock-generator">
      <h3 className="title">Clock Generator</h3>
      <p><input type="radio" name="clock-generator" value="1Hz" />1Hz</p>
      <p><input type="radio" name="clock-generator" value="10Hz" />10Hz</p>
      <p><input type="radio" name="clock-generator" value="Manual" />
        Manual <button>Clock</button>
      </p>
    </div>
  )
}