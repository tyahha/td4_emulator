import ko from 'knockout'
import type {ClockMode} from '../../domain/ClockMode'

const mode = {
  _1Hz: '1Hz',
  _10Hz: '10Hz',
  Manual: 'Manual',
}

export default class ClockGeneratorVM {
  clockHandler: () => void
  clockTimer: number
  mode: any

  constructor(clockHandler: () => void ) {
    this.clockHandler = clockHandler
    this.clockTimer = 0
    this.mode = ko.observable(mode.Manual)
    this.mode.subscribe((newMode) => {
      if (this.clockTimer) {
        clearInterval(this.clockTimer)
        this.clockTimer = 0
      }
      if (newMode !== mode.Manual) {
        const interval = newMode === mode._1Hz ? 1000 : 100
        this.clockTimer = setInterval(() => {
          this.clockHandler()
        }, interval)
      }
    })
  }

  currentMode() {
    return this.mode._latestValue
  }

  is1Hz() {
    return this.currentMode() === mode._1Hz
  }

  is10Hz() {  
    return this.currentMode() === mode._10Hz
  }

  isManual() {
    return this.currentMode() === mode.Manual
  }

  clock() {
    if (this.isManual()) {
      this.clockHandler()
    }
  }

  setClockMode(mode: ClockMode) {
    this.mode(mode)
  }
}