import Jump from '../../../../src/js/domain/operation/Jump'
import {runAllInputPattern} from './OperationTestUtil'

describe('operation Jump', () => {
  describe('#run', () => {
    const jump = new Jump()
    it('should always return carry false', () => {
      runAllInputPattern(jump, (i, o) => o.carry === false)
    })

    it('should always output.clockCount === input.data.value', () => {
      runAllInputPattern(jump, (input, output) => output.clockCount === input.data.value)
    })
  })
})