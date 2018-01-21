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

    this.beep = (() => {
      const sound = new Audio("data:audio/wav;base64,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")
      return () => sound.play()
    })()
  }

  clock() {
    this.setState(operate(this.state))
    if (this.state.enableBeep && (this.state.output & 8) === 8) {
      this.beep()
    }
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

  onReset() {
    this.setState(Object.assign(this.state, {
      programCount: 0,
      registorA: 0,
      registorB: 0,
      carry: false,
      output: 0,
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
          onReset={this.onReset.bind(this)}
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
