import React from 'react'
import ReactDom from 'react-dom'

import Menu from './Menu'
import ControlPanel from './control_panel/ControlPanel'
import ProgramMemory from './program_memory/ProgramMemory'

import ClockMode from '../ClockMode'
import ChangeEvent from '../ChangeEvent'
import {operate} from './Operation'

export default class TD4Emurator extends React.Component {
  constructor(props) {
    super(props)

    let memoryLines = []
    for (let i = 0; i < 16; i++) {
      memoryLines.push({operator: 0, operand: 0})
    }
    this.timer = null
    this.state = {
      programCount: 0,
      registorA: 0,
      registorB: 0,
      carry: false,
      input: 0,
      output: 0,
      enableBeep: false,
      clockMode: ClockMode.Manual,
      memoryLines,
    }
  }

  clock() {
    this.setState(operate(this.state))
  }

  manualClock() {
    if (this.state.clockMode === ClockMode.Manual) {
      this.clock()
    }
  }

  onChange(kind, param) {
    switch (kind) {
      case ChangeEvent.Beep:
        this.setState(Object.assign(this.state, {
          enableBeep: !this.state.enableBeep
        }))
        break
      case ChangeEvent.Input:
        this.setState(Object.assign(this.state, {
          input: this.state.input ^ param
        }))
        break
      case ChangeEvent.ClockMode:
        this.onChangeClockMode(param)
        break
      case ChangeEvent.Memory:
        let newMemoryLines = this.state.memoryLines.concat()
        newMemoryLines[param.address] = {
          operator: param.operator,
          operand: param.operand,
        }
        this.setState(Object.assign(this.state, {
          memoryLines: newMemoryLines
        }))
        break
      default:
        console.error(`unknown change event:${kind}, ${param}`)
        break
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
          registorA={this.state.registorA}
          registorB={this.state.registorB}
          carry={this.state.carry}
          input={this.state.input}
          output={this.state.output}
          enableBeep={this.state.enableBeep}
          clockMode={this.state.clockMode}
          onChange={this.onChange.bind(this)}
        />
        <ProgramMemory
          programCount={this.state.programCount}
          lines={this.state.memoryLines}
          onChange={this.onChange.bind(this)}
        />
      </div>
    )
  }
}
