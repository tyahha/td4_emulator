import type {Register} from '../Register'
import type {Operation} from './Operation'
import OperationInput from './OperationInput'
import OperationOutput from './OperationOutput'

export default class Move implements Operation {
  target: Register
  constructor(target: Register) {
    this.target = target
  }

  run(input: OperationInput): OperationOutput {
    this.target.setValue(input.data.value)
    return new OperationOutput(false, input.clockCount + 1)
  }
}