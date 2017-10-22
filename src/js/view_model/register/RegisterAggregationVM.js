import RegisterVM from './RegisterVM'

export default class RegisterAggregationVM {
  registerA: RegisterVM
  registerB: RegisterVM
  carryFlag: boolean
  programCounter: RegisterVM
  
  constructor(programCounterSbscriver: (newValue: number) => void) {
    this.registerA = new RegisterVM(0)
    this.registerB = new RegisterVM(0)
    this.carryFlag = false
    this.programCounter = new RegisterVM(0, programCounterSbscriver)
  }
}