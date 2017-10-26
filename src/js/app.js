import ko from "knockout"
import RegisterAggregationVM from "./view_model/register/RegisterAggregationVM"
import RomVM from "./view_model/rom/RomVM"
import ClockGeneratorVM from "./view_model/clock_generator/ClockGeneratorVM"
import ResetOperationVM from "./view_model/operation/ResetOperationVM"

import Register from "./domain/Register"
import Add from "./domain/Add"
import ImmediateData from "./domain/ImmediateData"

const romVM = new RomVM()
const romDom = document.querySelector('.program-memory')
ko.applyBindings(romVM, romDom)

const registerAggregationVM = new RegisterAggregationVM((newProgramCount) => {
  romVM.nextStep(newProgramCount)
})
const registerDom = document.querySelector('.register')
ko.applyBindings(registerAggregationVM, registerDom)

const addA = new Add(registerAggregationVM.registerA)
const addB = new Add(registerAggregationVM.registerB)

let clockCount = 0
const clockGeneratorDom = document.querySelector('.clock-generator')
const clockGeneratorVM = new ClockGeneratorVM(() => {
  clockCount++
  const currentLine = romVM.currentLine()
  const operation = currentLine.getOperationData()
  const immediateData = new ImmediateData(currentLine.getImmediateData())

  let carry = false
  if (operation === 0) {
    carry = addA.run(immediateData)
  }
  else if (operation === 5) {
    carry = addB.run(immediateData)
  }

  registerAggregationVM.carryFlag(carry)

  registerAggregationVM.programCounter.setValue(clockCount)
})
ko.applyBindings(clockGeneratorVM, clockGeneratorDom)

const resetOperationDom = document.querySelector('.reset-button')
const resetOperationVM = new ResetOperationVM(() => {
  // TODO: reset Register
  romVM.reset()
})
ko.applyBindings(resetOperationVM, resetOperationDom)

function parseFile(input: string): Array<boolean> {
  const lines = input.trim().split("\n").map(s => s.trim())
  const expectLineCount = 132
  
  if (lines.length != expectLineCount) {
    alert(`Input file expected line count is ${expectLineCount}, your file line count is ${lines.length}`)
  }
  else {
    const Hz1Index = 128
    const Hz10Index = 129
    const HzManualIndex = 130
    const HzFlagFalse = '#FALSE#'
    const HzFlagTrue = '#TRUE#'
    const hzSelectorFlagStrings = lines.slice(Hz1Index, HzManualIndex + 1)
    const unExpectedLine = hzSelectorFlagStrings.find(s => s !== HzFlagFalse && s !== HzFlagTrue)
    if (unExpectedLine) {
      alert(`line ${Hz1Index + 1} - ${HzManualIndex + 1} must be ${HzFlagTrue} or ${HzFlagFalse}`)
    }
    else {
      const hzSelectorFlags = hzSelectorFlagStrings.map(s => s === HzFlagTrue)
      const trueFlags = hzSelectorFlags.filter(b => b)
      if (trueFlags.length !== 1) {
        alert(`line ${Hz1Index + 1} - ${HzManualIndex + 1} must contain #TRUE# only one line`)
      }
      else {
        const trueIndex = hzSelectorFlags.indexOf(true)
        const hzMode = trueIndex === 0 ? '1Hz' : trueIndex === 1 ? '10Hz' : 'Manual'
        clockGeneratorVM.setClockMode(hzMode)
      }
    }
  }
  return [true]
}

function setFileLoadEventListener() {
  const domLoadFile = document.getElementById("load-file")
  if (domLoadFile) {
    domLoadFile.addEventListener("change", (evt) => {
      const target = evt.target
      if (target instanceof HTMLInputElement) {
        const file = target.files[0]
        if (file) {
          const reader = new FileReader()
          reader.readAsText(file)
          reader.onload = (ev) => {
            if (typeof reader.result === 'string') {
              parseFile(reader.result)
            }
            const parent = target.parentNode
            if (parent instanceof HTMLElement) {
              parent.innerHTML = parent.innerHTML
            }
            // DOMを再生成・再設定することによりファイルをクリアするのでListenerがなくなるので再度登録する
            // TODO: リセットボタンもViewModelにしてListenerの再登録が不要にする
            setFileLoadEventListener()
          }
        }
      }
    });
  }
}
setFileLoadEventListener()