import type {Operation} from "./Operation"
import type {Register} from "../Register"
import OperationInput from "./OperationInput"
import OperationOutput from "./OperationOutput"
import Add from "./Add"
import Move from "./Move"
import MoveFromRegister from "./MoveFromRegister"
import Jump from "./Jump"
import JumpIfNoCarry from "./JumpIfNoCarry"

export default class OperationAggregation {
  operations: Map<number, Operation>
  constructor(registerA: Register, registerB: Register) {
    this.operations = new Map()
    this.operations.set(0, new Add(registerA))
    this.operations.set(5, new Add(registerB))
    this.operations.set(3, new Move(registerA))
    this.operations.set(7, new Move(registerB))
    this.operations.set(1, new MoveFromRegister(registerA, registerB))
    this.operations.set(4, new MoveFromRegister(registerB, registerA))
    this.operations.set(15, new Jump())
    this.operations.set(14, new JumpIfNoCarry())
  }

  run(operationCode: number, input: OperationInput): OperationOutput {
    const operation = this.operations.get(operationCode)
    if (operation) {
      return operation.run(input)
    }
    else {
      return new OperationOutput(false, input.clockCount + 1)
    }
  }
}