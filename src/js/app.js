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
