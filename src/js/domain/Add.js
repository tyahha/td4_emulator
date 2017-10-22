import type {Register} from './Register'
import type {Operation} from './Operation'
import ImmediateData from './ImmediateData'

export default class Add implements Operation {
  target: Register
  constructor(target: Register) {
    this.target = target
  }

  run(data: ImmediateData): boolean {
    const currentValue = this.target.getValue()
    const addedValue = currentValue + data.value
    this.target.setValue(addedValue)
    return addedValue >= 16
  }
}