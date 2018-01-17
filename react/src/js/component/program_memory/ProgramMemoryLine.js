import React from 'react'
import ReactDom from 'react-dom'

import ChangeEvent from '../../ChangeEvent'

function displayAddress(address) {
  return `0${address}`.slice(-2)
}

function isCurrent(props) {
  return props.address === props.programCount
}

export default function ProgramMemoryLine(props) {
  function renderMemory(param, address, key, isOperator) {
    const bit = 1 << (3 - address)
    const checked = (param & bit) === bit
    function onChange() {
      props.onChange(
        ChangeEvent.Memory,
        isOperator
          ? {address: props.address, operator: props.operator ^ bit, operand: props.operand}
          : {address: props.address, operator: props.operator, operand: props.operand ^ bit}
      )
    }
    return (
      <label key={key}>
        <input
          type="checkbox"
          className="memory-checkbox"
          checked={checked}
          onChange={() => onChange()}
        />
        <span className="memory-icon"></span>
      </label>
    )
  }
  function renderMemories() {
    let memories = []
    for (let i = 0; i < 4; i++) {
      memories.push(renderMemory(props.operator, i, i, true))
    }
    for (let i = 0; i < 4; i++) {
      memories.push(renderMemory(props.operand, i, i + 4, false))
    }
    return memories
  }
  return (
    <div className={`rom-line${isCurrent(props) ? ' current' : ''}`}>
      Address {displayAddress(props.address)} {renderMemories()}
    </div>
  )
}