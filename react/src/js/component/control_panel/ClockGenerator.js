import React from 'react'
import ReactDom from 'react-dom'

import ClockMode from '../../ClockMode'

export default function ClockGenerator(props) {
  function renderClockModeSelector(clockMode) {
    const display =
      clockMode === ClockMode.OneHz
        ? '1Hz'
        : clockMode === ClockMode.TenHz
          ? '10Hz'
          : 'Manual'
    return (
      <span>
        <input
          type="radio"
          name="clock-generator"
          value={display}
          checked={props.clockMode === clockMode}
          onChange={() => props.onChangeClockMode(clockMode)}
        />
        {display}
      </span>
    )
  }

  return (
    <div className="clock-generator">
      <h3 className="title">Clock Generator</h3>
      <p>{renderClockModeSelector(ClockMode.OneHz)}</p>
      <p>{renderClockModeSelector(ClockMode.TenHz)}</p>
      <p>{renderClockModeSelector(ClockMode.Manual)}
        <button onClick={props.onClock}>Clock</button>
      </p>
    </div>
  )
}