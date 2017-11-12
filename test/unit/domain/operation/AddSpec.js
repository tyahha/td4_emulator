import Add from '../../../../src/js/domain/operation/Add'
import ImmediateData from '../../../../src/js/domain/ImmediateData'
import {RegisterMock, runAllInputPatternWithRegister} from './OperationTestUtil'

describe('operation Add', () => {
  describe('#run', () => {
    it('should return carry false when add result under 16 or true, and should incliment clockCount', () => {
      const targetRegister = new RegisterMock(0)
      runAllInputPatternWithRegister(
        targetRegister,
        new Add(targetRegister),
        (registerValue, i, o) => {
          return (
            registerValue + i.data.value >= 16
              ? o.carry
              : !o.carry
          ) && (
            i.clockCount + 1 === o.clockCount
          )
        }
      )
    })
  })
})