import ko from "knockout"
import RegisterAggregationVM from "./view_model/register/RegisterAggregationVM"
import RomVM from "./view_model/rom/RomVM"
import ClockGeneratorVM from "./view_model/clock_generator/ClockGeneratorVM"
import ResetOperationVM from "./view_model/operation/ResetOperationVM"

import Register from "./domain/Register"
import type {Operation} from "./domain/Operation"
import Add from "./domain/Add"
import Move from "./domain/Move"
import ImmediateData from "./domain/ImmediateData"

import FileParser from './parser/FileParser'
import Setting from './domain/Setting'

const romVM = new RomVM()
const romDom = document.querySelector('.program-memory')
ko.applyBindings(romVM, romDom)

const registerAggregationVM = new RegisterAggregationVM((newProgramCount) => {
  romVM.nextStep(newProgramCount)
})
const registerDom = document.querySelector('.register')
ko.applyBindings(registerAggregationVM, registerDom)

const operations: Map<number, Operation> = new Map()
const moveToA = new Move(registerAggregationVM.registerA)
const moveToB = new Move(registerAggregationVM.registerB)
operations.set(0, new Add(registerAggregationVM.registerA))
operations.set(5, new Add(registerAggregationVM.registerB))
operations.set(3, moveToA)
operations.set(7, moveToB)
operations.set(1, moveToA)
operations.set(4, moveToB)

let clockCount = 0
const clockGeneratorDom = document.querySelector('.clock-generator')
const clockGeneratorVM = new ClockGeneratorVM(() => {
  clockCount++
  const currentLine = romVM.currentLine()
  const operationCode = currentLine.getOperationData()
  const operation = operations.get(operationCode)
  const data =
    operationCode === 1 ?
      registerAggregationVM.registerB.getValue() :
    operationCode === 4 ? 
      registerAggregationVM.registerA.getValue() :
      currentLine.getImmediateData()
  const immediateData = new ImmediateData(data)
  const carry = operation ? operation.run(immediateData) : false
  registerAggregationVM.carryFlag(carry)
  registerAggregationVM.programCounter.setValue(clockCount)
})
ko.applyBindings(clockGeneratorVM, clockGeneratorDom)

const resetOperationDom = document.querySelector('.reset-button')
const resetOperationVM = new ResetOperationVM(() => {
  clockCount = 0
  registerAggregationVM.carryFlag(false)
  registerAggregationVM.registerA.setValue(0)
  registerAggregationVM.registerB.setValue(0)
  registerAggregationVM.programCounter.setValue(clockCount)
  romVM.reset()
})
ko.applyBindings(resetOperationVM, resetOperationDom)


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
              const parseResult = FileParser.parse(reader.result)
              if (typeof parseResult === 'string') {
                alert(parseResult)
              }
              else if (parseResult instanceof Setting) {
                clockGeneratorVM.setClockMode(parseResult.clockMode)
                romVM.set(parseResult.memories)
              }
              else {
                // unreachable
                alert("parse error!")
              }
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