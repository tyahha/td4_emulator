export default class OperationOutput {
  carry: boolean
  clockCount: number
  constructor(carry: boolean, clockCount: number) {
    this.carry = carry
    this.clockCount = clockCount
  }
}