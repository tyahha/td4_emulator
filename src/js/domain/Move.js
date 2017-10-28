import type {Register} from './Register'
import type {Operation} from './Operation'
import ImmediateData from './ImmediateData'

export default class Move implements Operation {
  target: Register
  constructor(target: Register) {
    this.target = target
  }

  run(data: ImmediateData): boolean {
    this.target.setValue(data.value)
    return false
  }
}