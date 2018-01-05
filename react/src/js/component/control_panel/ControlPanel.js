import React from 'react'
import ReactDom from 'react-dom'

import Registor from './registor/Registor'
import ClockGenerator from './ClockGenerator'
import Reset from './Reset'

export default function ControlPanel(props) {
  return (
    <div className="control-panel">
      <Registor
        programCount={props.programCount}
        registorA={props.registorA}
        registorB={props.registorB}
        carry={props.carry}
        input={props.input}
        output={props.output}
        enableBeep={props.enableBeep}
        onChange={props.onChange}
      />
      <ClockGenerator
        clockMode={props.clockMode}
        onChange={props.onChange}
        onClock={props.onClock}
      />
      <Reset />
    </div>
  )
}
