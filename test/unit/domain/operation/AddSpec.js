import Add from '../../../../src/js/domain/operation/Add'
import ImmediateData from '../../../../src/js/domain/ImmediateData'
import {RegisterMock, runAllInputPatternWithRegister} from './OperationTestUtil'

describe('operation Add', () => {
  describe('#run', () => {
    it('should return carry false when add result under 16 or true, and incliment clockCount and register value after run === register value before run + input.data.value', () => {
      const targetRegister = new RegisterMock(0)
      runAllInputPatternWithRegister(
        targetRegister,
        new Add(targetRegister),
        (beforeRegister, i, o) => {
          return (
            beforeRegister + i.data.value >= 16
              ? o.carry
              : !o.carry
          ) && (
            i.clockCount + 1 === o.clockCount
          ) && (
            targetRegister.getValue() === beforeRegister + i.data.value
          )
        }
      )
    })
  })
})