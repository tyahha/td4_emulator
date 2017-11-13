import MoveFromRegister from '../../../../src/js/domain/operation/MoveFromRegister'
import ImmediateData from '../../../../src/js/domain/ImmediateData'
import {RegisterMock, runAllInputPatternWith2Register} from './OperationTestUtil'

describe('operation MoveFromRegister', () => {
  describe('#run', () => {
    it('should always return carry false and output.clockCount = input.clockCout + 1 and targetRegister.data === srcRegister.value', () => {
      const targetRegister = new RegisterMock(0)
      const srcRegister = new RegisterMock(0)
      runAllInputPatternWith2Register(
        targetRegister,
        srcRegister,
        new MoveFromRegister(targetRegister, srcRegister),
        (beforeTarget, beforeSrc, i, o) => {
          return o.carry === false
            && o.clockCount === i.clockCount + 1
            && targetRegister.getValue() === srcRegister.getValue()
        }
      )
    })
  })
})