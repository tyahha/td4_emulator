import assert from 'power-assert'
import Add from '../../../../src/js/domain/operation/Add'
import OperationInput from '../../../../src/js/domain/operation/OperationInput'
import OperationOutput from '../../../../src/js/domain/operation/OperationOutput'
import ImmediateData from '../../../../src/js/domain/ImmediateData'
import type {Register} from '../../../../src/js/domain/Register'

class RegisterMock implements Register {
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

describe('operation Add', () => {
  describe('#run', () => {
    it('should return carry false when add result under 16', () => {
      const targetRegister0 = new RegisterMock(0)
      const add0 = new Add(targetRegister0)
      const output0_15 = add0.run(new OperationInput(false, 0, new ImmediateData(15)))
      assert(output0_15.carry === false)

      const targetRegister9 = new RegisterMock(9)
      const add9 = new Add(targetRegister9)
      const output9_6 = add9.run(new OperationInput(false, 0, new ImmediateData(6)))
      assert(output9_6.carry === false)
    })

    it('should return carry true when add result greater than 16', () => {
      const targetRegister0 = new RegisterMock(0)
      const add0 = new Add(targetRegister0)
      const output0_16 = add0.run(new OperationInput(false, 0, new ImmediateData(16)))
      assert(output0_16.carry === true)

      const targetRegister9 = new RegisterMock(9)
      assert(targetRegister9.getValue() === 9)
      const add9 = new Add(targetRegister9)
      assert(add9.target.getValue() === 9)
      const output9_7 = add9.run(new OperationInput(false, 0, new ImmediateData(7)))
      assert(add9.target.getValue() === 16)
      assert(output9_7.carry === true)
    })

    it('should incliment clockCount', () => {
      const targetRegister = new RegisterMock(0)
      const add = new Add(targetRegister)
      assert(add.run(new OperationInput(false, 0, new ImmediateData(16))).clockCount === 1)
      assert(add.run(new OperationInput(false, 0, new ImmediateData(16))).clockCount === 1)
      assert(add.run(new OperationInput(false, 15, new ImmediateData(16))).clockCount === 16)
      assert(add.run(new OperationInput(false, 16, new ImmediateData(16))).clockCount === 17)
      assert(add.run(new OperationInput(false, 99, new ImmediateData(16))).clockCount === 100)
    })
  })
})