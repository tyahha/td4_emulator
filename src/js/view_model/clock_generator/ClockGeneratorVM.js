import ko from 'knockout'
import type {ClockMode} from '../../domain/ClockMode'

const mode = {
  _1Hz: '1Hz',
  _10Hz: '10Hz',
  Manual: 'Manual',
}

export default class ClockGeneratorVM {
  clockHandler: () => void
  mode: any

  constructor(clockHandler: () => void ) {
    this.clockHandler = clockHandler
    this.mode = ko.observable(mode.Manual)

    setInterval(() => {
      if (this.is1Hz()) {
        this.clockHandler()
      }
    }, 1000)

    setInterval(() => {
      if (this.is10Hz()) {
        this.clockHandler()
      }
    }, 100)
  }

  currentMode() {
    return this.mode._latestValue
  }

  is1Hz() {
    return this.currentMode() === ClockMode._1Hz
  }

  is10Hz() {
    return this.currentMode() === ClockMode._10Hz
  }

  isManual() {
    return this.currentMode() === ClockMode.Manual
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