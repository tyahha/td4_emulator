import Jump from '../../../../src/js/domain/operation/Jump'
import {runAllInputPattern} from './OperationTestUtil'

describe('operation Jump', () => {
  describe('#run', () => {
    const jump = new Jump()
    it('should always return carry false and output.clockCount === input.data.value', () => {
      runAllInputPattern(jump, (i, o) => o.carry === false && o.clockCount === i.data.value)
    })
  })
})