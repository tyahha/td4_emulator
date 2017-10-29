import type {Register} from '../Register'
import type {Operation} from './Operation'
import OperationInput from './OperationInput'
import OperationOutput from './OperationOutput'

export default class MoveFromRegister implements Operation {
  target: Register
  src: Register
  constructor(target: Register, src: Register) {
    this.target = target
    this.src = src
  }

  run(input: OperationInput): OperationOutput {
    this.target.setValue(this.src.getValue())
    return new OperationOutput(false, input.clockCount + 1)
  }
}