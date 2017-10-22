import ko from 'knockout'
import RegisterVM from './RegisterVM'

export default class RegisterAggregationVM {
  registerA: RegisterVM
  registerB: RegisterVM
  carryFlag: any
  programCounter: RegisterVM
  
  constructor(programCounterSbscriver: (newValue: number) => void) {
    this.registerA = new RegisterVM('A', 0)
    this.registerB = new RegisterVM('B', 0)
    this.carryFlag = ko.observable(false)
    this.programCounter = new RegisterVM('PC', 0, programCounterSbscriver)
  }
}