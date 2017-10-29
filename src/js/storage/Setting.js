import type {ClockMode} from '../domain/ClockMode'

export default class Setting {
  clockMode: ClockMode
  beep: boolean
  memories: Array<boolean>

  constructor(clockMode: ClockMode, beep: boolean, memories: Array<boolean>) {
    this.clockMode = clockMode
    this.beep = beep
    this.memories = memories
  }
}