import React from 'react'
import ReactDom from 'react-dom'

import Menu from './Menu'
import ControlPanel from './control_panel/ControlPanel'
import ProgramMemory from './program_memory/ProgramMemory'

export default function TD4Emurator(props) {
  return (
    <div>
      <Menu />
      <ControlPanel />
      <ProgramMemory currentAddress={0} />
    </div>
  )
}
