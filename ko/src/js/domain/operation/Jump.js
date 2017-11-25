import type {Operation} from './Operation'
import OperationInput from './OperationInput'
import OperationOutput from './OperationOutput'

export default class Jump implements Operation {
  run(input: OperationInput): OperationOutput {
    return new OperationOutput(false, input.data.value)
  }
}