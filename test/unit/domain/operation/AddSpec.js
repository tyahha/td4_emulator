import Add from '../../../../src/js/domain/operation/Add'
import OperationInput from '../../../../src/js/domain/operation/OperationInput'
import OperationOutput from '../../../../src/js/domain/operation/OperationOutput'
import ImmediateData from '../../../../src/js/domain/ImmediateData'
import type {Register} from '../../../../src/js/domain/Register'

import assert from 'power-assert'

class RegisterMock implements Register {
  value: number
  constructor(value: number) {
    this.value = 0
  }
  getValue(): number {
    return this.value
  }
  setValue(value: number): void {
    this.value = value
  }
}

describe('domain Add', () => {
  describe('#run', () => {
    it('should return carry false when add result less than 16', () => {
      const targetRegister = new RegisterMock(0)
      const add = new Add(targetRegister)
      const output = add.run(new OperationInput(false, 0, new ImmediateData(15)))
      assert(output.carry === true)
    })
  })
})