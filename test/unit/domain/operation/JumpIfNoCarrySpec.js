import JumpIfNoCarry from '../../../../src/js/domain/operation/JumpIfNoCarry'
import {runAllInputPattern} from './OperationTestUtil'

describe('operation Jump if no carry', () => {
  describe('#run', () => {
    const jumpIfNoCarry = new JumpIfNoCarry()
    it('should always return output.clockCount === input.data.value when input.carry === false or output.clockCount === input.clockCount + 1 and always return carry false', () => {
      runAllInputPattern(jumpIfNoCarry, (i, o) =>
        o.carry === false &&
        i.carry
          ? o.clockCount === i.clockCount + 1
          : o.clockCount === i.data.value
      )
    })
  })
})