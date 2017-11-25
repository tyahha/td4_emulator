import assert from 'power-assert'
import ResetOperationVM from '../../../../src/js/view_model/operation/ResetOperationVM'

describe('ResetOperationVM', () => {
  let check = 0
  const target = new ResetOperationVM(() => {
    check++
  })
  describe('#reset', () => {
    it('should call resetHandller', () => {
      assert(check === 0)

      target.reset()
      assert(check === 1)

      target.reset()
      assert(check === 2)
    })    
  })
})