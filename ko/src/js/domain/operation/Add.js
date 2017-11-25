import type {Register} from '../Register'
import type {Operation} from './Operation'
import OperationInput from './OperationInput'
import OperationOutput from './OperationOutput'

export default class Add implements Operation {
  target: Register
  constructor(target: Register) {
    this.target = target
  }

  run(input: OperationInput): OperationOutput {
    const currentValue = this.target.getValue()
    const addedValue = currentValue + input.data.value
    this.target.setValue(addedValue)
    return new OperationOutput(addedValue >= 16, input.clockCount + 1)
  }
}