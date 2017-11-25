import Move from '../../../../src/js/domain/operation/Move'
import ImmediateData from '../../../../src/js/domain/ImmediateData'
import {RegisterMock, runAllInputPatternWithRegister} from './OperationTestUtil'

describe('operation Move', () => {
  describe('#run', () => {
    it('should always return carry false and output.clockCount = input.clockCout + 1 and register.data === input.data.value', () => {
      const targetRegister = new RegisterMock(0)
      runAllInputPatternWithRegister(
        targetRegister,
        new Move(targetRegister),
        (beforeRegister, i, o) => {
          return o.carry === false
            && o.clockCount === i.clockCount + 1
            && targetRegister.getValue() === i.data.value
        }
      )
    })
  })
})