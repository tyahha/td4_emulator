import assert from 'power-assert'
import type {Operation} from '../../../../src/js/domain/operation/Operation'
import OperationInput from '../../../../src/js/domain/operation/OperationInput'
import OperationOutput from '../../../../src/js/domain/operation/OperationOutput'
import ImmediateData from '../../../../src/js/domain/ImmediateData'
import type {Register} from '../../../../src/js/domain/Register'

export class RegisterMock implements Register {
  value: number
  constructor(value: number) {
    this.value = value
  }
  getValue(): number {
    return this.value
  }
  setValue(value: number): void {
    this.value = value
  }
}

export function runAllInputPattern(operation: Operation, check: (OperationInput, OperationOutput) => boolean) {
  function loopAllcase(inputCarry: boolean): void {
    for (let i = 0; i < 16; i++) {
      for (let j = 0; j < 16; j++) {
        const input = new OperationInput(inputCarry, i, new ImmediateData(j))
        assert(check(input, operation.run(input)))
      }
    }
  }
  loopAllcase(true)
  loopAllcase(false)
}

export function runAllInputPatternWithRegister(
  register: Register,
  operation: Operation,
  check: (number, OperationInput, OperationOutput) => boolean
) {
  function loopAllcase(inputCarry: boolean): void {
    for (let i = 0; i < 16; i++) {
      for (let j = 0; j < 16; j++) {
        for (let k = 0; k < 16; k++) {
          register.setValue(k)
          const input = new OperationInput(inputCarry, i, new ImmediateData(j))
          assert(check(k, input, operation.run(input)))
        }
      }
    }
  }
  loopAllcase(true)
  loopAllcase(false)
}
