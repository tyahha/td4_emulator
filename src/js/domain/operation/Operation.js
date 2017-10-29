import OperationInput from './OperationInput'
import OperationOutput from './OperationOutput'

export interface Operation {
  run(input: OperationInput): OperationOutput
}