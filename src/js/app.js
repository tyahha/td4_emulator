import ko from "knockout"
import RomVM from "./view_model/rom/RomVM"
import ClockGeneratorVM from "./view_model/clock_generator/ClockGeneratorVM"
import ResetOperationVM from "./view_model/operation/ResetOperationVM"

const romVM = new RomVM()
const romDom = document.querySelector('.program-memory')
ko.applyBindings(romVM, romDom)

const clockGeneratorDom = document.querySelector('.clock-generator')
const clockGeneratorVM = new ClockGeneratorVM(() => {
  romVM.nextStep()
})
ko.applyBindings(clockGeneratorVM, clockGeneratorDom)

const resetOperationDom = document.querySelector('.reset-button')
const resetOperationVM = new ResetOperationVM(() => {
  romVM.reset()
})
ko.applyBindings(resetOperationVM, resetOperationDom)