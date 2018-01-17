import React from 'react'
import ReactDom from 'react-dom'

import ProgramMemoryLine from './ProgramMemoryLine'

export default function ProgramMemory(props) {
  let lines = []
  for (let i = 0; i < 16; i++) {
    lines.push(
      <ProgramMemoryLine
        key={i}
        address={i}
        programCount={props.programCount}
        operator={props.lines[i].operator}
        operand={props.lines[i].operand}
        onChange={props.onChange}
      />
    )
  }
  return (
    <div className="program-memory">
      <h3 className="title">Program Memory</h3>
      {lines}
    </div>
  )
}