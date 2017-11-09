import assert from 'power-assert'
import Jump from '../../../../src/js/domain/operation/Jump'
import OperationInput from '../../../../src/js/domain/operation/OperationInput'
import OperationOutput from '../../../../src/js/domain/operation/OperationOutput'
import ImmediateData from '../../../../src/js/domain/ImmediateData'


describe('operation Jump', () => {

  function doAllCase(check: (OperationInput, OperationOutput) => boolean) {
    const jump = new Jump()
    function loopAllcase(inputCarry: boolean): void {
      for (let i = 0; i < 16; i++) {
        for (let j = 0; j < 16; j++) {
          const input = new OperationInput(inputCarry, i, new ImmediateData(j))
          assert(check(input, jump.run(input)))
        }
      }
    }
    loopAllcase(true)
    loopAllcase(false)
}

  describe('#run', () => {
    it('should always return carry false', () => {
      doAllCase((i, o) => o.carry === false)
    })

    it('should always output.clockCount === input.data.value', () => {
      doAllCase((input, output) => output.clockCount === input.data.value)
    })
  })
})