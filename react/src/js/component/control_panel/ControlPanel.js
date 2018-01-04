import React from 'react'
import ReactDom from 'react-dom'

import Registor from './registor/Registor'
import ClockGenerator from './ClockGenerator'
import Reset from './Reset'

export default function ControlPanel(props) {
  return (
    <div className="control-panel">
      <Registor programCount={props.programCount}/>
      <ClockGenerator
        clockMode={props.clockMode}
        onChangeClockMode={props.onChangeClockMode}
        onClock={props.onClock}
      />
      <Reset />
    </div>
  )
}
