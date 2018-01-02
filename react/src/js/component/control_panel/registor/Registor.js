import React from 'react'
import ReactDom from 'react-dom'

export default function Registor(props) {
  return (
    <div className="registor">
      <p>RegistorA 0000</p>
      <p>RegistorB 0000</p>
      <p>C Flag 0</p>
      <p>Program Counter 0000</p>
      <p className="output"><span className="label">output</span>
        <img src="../img/off.png" />
        <img src="../img/off.png" />
        <img src="../img/off.png" />
        <img src="../img/off.png" />
      </p>
      <p className="beep-line"></p>
      <p className="beep-string">
        <input type="checkbox" />Beep
      </p>
      <p className="input">input
        <input type="checkbox" />
        <input type="checkbox" />
        <input type="checkbox" />
        <input type="checkbox" />
      </p>
    </div>
  )
}
