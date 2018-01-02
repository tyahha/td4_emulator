import React from 'react'
import ReactDom from 'react-dom'

import Registor from './registor/Registor'
import ClockGenerator from './ClockGenerator'
import Reset from './Reset'

export default function ControlPanel(props) {
  return (
    <div className="control-panel">
      <Registor />
      <ClockGenerator />
      <Reset />
    </div>
  )
}
