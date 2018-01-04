import React from 'react'
import ReactDom from 'react-dom'

function toBinaryNumber(src) {
  const num = ((src & 8) === 8 ? 1000 : 0)
       + ((src & 4) === 4 ?  100 : 0)
       + ((src & 2) === 2 ?   10 : 0)
       + ((src & 1) === 1 ?    1 : 0)
  return `000${num}`.slice(-4)
}

export default function Registor(props) {
  return (
    <div className="registor">
      <p>RegistorA 0000</p>
      <p>RegistorB 0000</p>
      <p>C Flag 0</p>
      <p>Program Counter {toBinaryNumber(props.programCount)}</p>
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
