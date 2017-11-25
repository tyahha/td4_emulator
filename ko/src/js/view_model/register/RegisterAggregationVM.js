import ko from 'knockout'
import RegisterVM from './RegisterVM'
import IOVM from './IOVM'
import BeepVM from './BeepVM'

export default class RegisterAggregationVM {
  registerA: RegisterVM
  registerB: RegisterVM
  carryFlag: any
  programCounter: RegisterVM
  input: IOVM
  output: IOVM
  beep: BeepVM 
  
  constructor(programCounterSbscriver: (newValue: number) => void) {
    this.registerA = new RegisterVM('A', 0)
    this.registerB = new RegisterVM('B', 0)
    this.carryFlag = ko.observable(false)
    this.programCounter = new RegisterVM('PC', 0, programCounterSbscriver)
    this.input = new IOVM()
    this.output = new IOVM()
    this.beep = new BeepVM()
  }

  reset(): void {
    this.carryFlag(false)
    this.registerA.setValue(0)
    this.registerB.setValue(0)
    this.programCounter.setValue(0)
    this.output.setValue(0)
  }

  tryBeep(): void {
    if (this.output.memories[0].value()) {
      this.beep.beep()
    }
  }
}