import assert from 'power-assert'
import {RegisterMock} from './OperationTestUtil'
import OperationAggregation from '../../../../src/js/domain/operation/OperationAggregation'
import Add from "../../../../src/js/domain/operation/Add"
import Move from "../../../../src/js/domain/operation/Move"
import MoveFromRegister from "../../../../src/js/domain/operation/MoveFromRegister"
import Jump from "../../../../src/js/domain/operation/Jump"
import JumpIfNoCarry from "../../../../src/js/domain/operation/JumpIfNoCarry"

describe('OperationAggregation', () => {
  describe('#operations', () => {

    const registerA = new RegisterMock(0)
    const registerB = new RegisterMock(0)
    const input = new RegisterMock(0)
    const output = new RegisterMock(0)
    const target = new OperationAggregation(
      registerA,
      registerB,
      input,
      output
    )

    it("shoud return undefined when specify other than 0-15", () => {
      assert(target.operations.get(-1) === undefined)
      assert(target.operations.get(16) === undefined)
      assert(target.operations.get(100) === undefined)
    })

    it("shoud return concrete operation when specify 0-15", () => {
      let op = target.operations.get(0)
      if (op instanceof Add) {
        assert(op.target === registerA)
      }
      else {
        assert(op instanceof Add)
      }

      op = target.operations.get(5)
      if (op instanceof Add) {
        assert(op.target === registerB)
      }
      else {
        assert(op instanceof Add)
      }

      op = target.operations.get(3)
      if (op instanceof Move) {
        assert(op.target === registerA)
      }
      else {
        assert(op instanceof Move)
      }

      op = target.operations.get(7)
      if (op instanceof Move) {
        assert(op.target === registerB)
      }
      else {
        assert(op instanceof Move)
      }

      op = target.operations.get(1)
      if (op instanceof MoveFromRegister) {
        assert(op.target === registerA)
        assert(op.src === registerB)
      }
      else {
        assert(op instanceof MoveFromRegister)
      }
 
      op = target.operations.get(4)
      if (op instanceof MoveFromRegister) {
        assert(op.target === registerB)
        assert(op.src === registerA)
      }
      else {
        assert(op instanceof MoveFromRegister)
      }

      assert(target.operations.get(15) instanceof Jump)
      assert(target.operations.get(14) instanceof JumpIfNoCarry)

      op = target.operations.get(2)
      if (op instanceof MoveFromRegister) {
        assert(op.target === registerA)
        assert(op.src === input)
      }
      else {
        assert(op instanceof MoveFromRegister)
      }

      op = target.operations.get(6)
      if (op instanceof MoveFromRegister) {
        assert(op.target === registerB)
        assert(op.src === input)
      }
      else {
        assert(op instanceof MoveFromRegister)
      }

      op = target.operations.get(9)
      if (op instanceof MoveFromRegister) {
        assert(op.target === output)
        assert(op.src === registerB)
      }
      else {
        assert(op instanceof MoveFromRegister)
      }

      op = target.operations.get(11)
      if (op instanceof Move) {
        assert(op.target === output)
      }
      else {
        assert(op instanceof Move)
      }
    })
  })
})