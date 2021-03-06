import ko from "knockout"
import RegisterAggregationVM from "./view_model/register/RegisterAggregationVM"
import RomVM from "./view_model/rom/RomVM"
import ClockGeneratorVM from "./view_model/clock_generator/ClockGeneratorVM"
import ResetOperationVM from "./view_model/operation/ResetOperationVM"

import OperationAggregation from "./domain/operation/OperationAggregation"
import OperationInput from "./domain/operation/OperationInput"

import FileParser from './storage/parser/FileParser'
import Setting from './storage/Setting'

const romVM = new RomVM()
const romDom = document.querySelector('.program-memory')
ko.applyBindings(romVM, romDom)

const registerAggregationVM = new RegisterAggregationVM((newProgramCount) => {
  romVM.nextStep(newProgramCount)
})
const registerDom = document.querySelector('.register')
ko.applyBindings(registerAggregationVM, registerDom)

const operations = new OperationAggregation(
  registerAggregationVM.registerA,
  registerAggregationVM.registerB,
  registerAggregationVM.input,
  registerAggregationVM.output,
)

const clockGeneratorDom = document.querySelector('.clock-generator')
const clockGeneratorVM = new ClockGeneratorVM(() => {
  const currentLine = romVM.currentLine()
  const output = operations.run(
    currentLine.getOperationData(),
    new OperationInput(
      registerAggregationVM.carryFlag(),
      registerAggregationVM.programCounter.getValue(),
      currentLine.getImmediateData(),
    )
  )
  registerAggregationVM.carryFlag(output.carry)
  registerAggregationVM.programCounter.setValue(output.clockCount)
  registerAggregationVM.tryBeep()
})
ko.applyBindings(clockGeneratorVM, clockGeneratorDom)

function reset() {
  registerAggregationVM.reset()
  romVM.reset()
}
const resetOperationDom = document.querySelector('.reset-button')
const resetOperationVM = new ResetOperationVM(reset)
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
              const parseResult = FileParser.fileToSetting(reader.result)
              if (typeof parseResult === 'string') {
                alert(parseResult)
              }
              else if (parseResult instanceof Setting) {
                clockGeneratorVM.setClockMode(parseResult.clockMode)
                romVM.set(parseResult.memories)
                registerAggregationVM.beep.value(parseResult.beep)
                reset()
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

function setSaveFileEventListener() {
  const domSaveFile = document.getElementById('save-file')
  if (domSaveFile) {
    domSaveFile.addEventListener('click', (evt: MouseEvent) => {
      const target = evt.target
      if (target instanceof HTMLElement) {
        const saveString = FileParser.settingToFile(
          new Setting(
            clockGeneratorVM.currentMode(),
            registerAggregationVM.beep.value(),
            romVM.get()
          )
        )
        target.setAttribute('href', `data:text/plain,${encodeURIComponent(saveString)}`)
      }
    }, false)
  }
}
setSaveFileEventListener()