import React from 'react'
import ReactDom from 'react-dom'

import Menu from './Menu'
import ControlPanel from './control_panel/ControlPanel'
import ProgramMemory from './program_memory/ProgramMemory'

import ClockMode from '../ClockMode'

export default class TD4Emurator extends React.Component {
  constructor(props) {
    super(props)
    this.timer = null
    this.state = {
      programCount: 0,
      clockMode: ClockMode.Manual,
    }
  }

  clock() {
    this.setState(Object.assign(this.state,{
      programCount: (this.state.programCount + 1) % 16
    }))
  }

  manualClock() {
    if (this.state.clockMode === ClockMode.Manual) {
      this.clock()
    }
  }

  onChangeClockMode(clockMode) {
    if (this.timer) {
      clearInterval(this.timer)
      this.timer = null
    }
    
    if (clockMode === ClockMode.OneHz || clockMode === ClockMode.TenHz) {
      this.timer = setInterval(() => {
        this.clock()
      }, clockMode === ClockMode.OneHz ? 1000 : 100)
    }

    this.setState(Object.assign(this.state, {
      clockMode
    }))
  }

  render() {
    return (
      <div>
        <Menu />
        <ControlPanel
          onClock={this.manualClock.bind(this)}
          programCount={this.state.programCount}
          clockMode={this.state.clockMode}
          onChangeClockMode={this.onChangeClockMode.bind(this)}
        />
        <ProgramMemory programCount={this.state.programCount} />
      </div>
    )
  }
}
