import React from 'react'
import ReactDom from 'react-dom'

function displayAddress(address) {
  return `0${address}`.slice(-2)
}

function isCurrent(props) {
  return props.address === props.programCount
}

export default function ProgramMemoryLine(props) {
  let memories = []
  for (let i = 0; i < 8; i++) {
    memories.push(
      <label key={i}>
        <input type="checkbox" className="memory-checkbox" />
        <span className="memory-icon"></span>
      </label>
    )
  }
  return (
    <div className={`rom-line${isCurrent(props) ? ' current' : ''}`}>
      Address {displayAddress(props.address)} {memories}
    </div>
  )
}