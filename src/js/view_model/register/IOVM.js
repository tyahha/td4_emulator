import ko from 'knockout'

export default class IOVM {
  memories: any
  constructor() {
    this.memories = ko.observableArray([false, false, false, false])
  }
  getValue(): number {
    let ret = 0
    for (let i = 0; i < this.memories.length; i++) {
      ret += this.memories[i] ? (1 << i) : 0
    }
    return ret
  }
  setValue(value: number): void {
    for (let i = 0; i < this.memories.length; i++) {
      this.memories[i] = (1 << i) | value
    }
  }
  reset(): void {
    this.memories = ko.observableArray([false, false, false, false])
  }
}