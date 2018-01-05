import React from 'react'
import ReactDom from 'react-dom'

import ChangeEvent from '../../../ChangeEvent'

function toBinaryNumber(src) {
  const num = ((src & 8) === 8 ? 1000 : 0)
       + ((src & 4) === 4 ?  100 : 0)
       + ((src & 2) === 2 ?   10 : 0)
       + ((src & 1) === 1 ?    1 : 0)
  return `000${num}`.slice(-4)
}

function maskNumberToBoolean(num, mask) {
  return (num & mask) === mask ? true : false
}

function maskNumberToOutputImage(num, mask) {
  return `../img/${maskNumberToBoolean(num, mask) ? 'on' : 'off'}.png`
}

export default function Registor(props) {
  function renderInputCheckbox(mask) {
    return (
      <input
        type="checkbox"
        checked={maskNumberToBoolean(props.input, mask)}
        onChange={() => props.onChange(ChangeEvent.Input, mask)}
      />
    )
  }

  return (
    <div className="registor">
      <p>RegistorA {toBinaryNumber(props.registorA)}</p>
      <p>RegistorB {toBinaryNumber(props.registorB)}</p>
      <p>C Flag {props.carry ? '1' : '0'}</p>
      <p>Program Counter {toBinaryNumber(props.programCount)}</p>
      <p className="output"><span className="label">output</span>
        <img src={maskNumberToOutputImage(props.output, 8)} />
        <img src={maskNumberToOutputImage(props.output, 4 )} />
        <img src={maskNumberToOutputImage(props.output, 2)} />
        <img src={maskNumberToOutputImage(props.output, 1)} />
      </p>
      <p className="beep-line"></p>
      <p className="beep-string">
        <input
          type="checkbox"
          checked={props.enableBeep}
          onChange={() => props.onChange(ChangeEvent.Beep)}
        />
        Beep
      </p>
      <p className="input">input
        {renderInputCheckbox(8)}
        {renderInputCheckbox(4)}
        {renderInputCheckbox(2)}
        {renderInputCheckbox(1)}
      </p>
    </div>
  )
}
