import ImmediateData from '../ImmediateData'

export default class OperationInput {
  carry: boolean
  clockCount: number
  data: ImmediateData
  constructor(carry: boolean, clockCount: number, data: ImmediateData) {
    this.carry = carry
    this.clockCount = clockCount
    this.data = data
  }
}