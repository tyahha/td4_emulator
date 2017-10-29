import ko from 'knockout'

class Memory {
  value: boolean
  constructor() {
    this.value = ko.observable(false)
  }
}

function constructMemories(): any {
  return [
    new Memory(),
    new Memory(),
    new Memory(),
    new Memory(),
  ]
}

export default class IOVM {
  memories: any
  constructor() {
    this.memories = constructMemories()
  }
  getValue(): number {
    let ret = 0
    const length = this.memories.length
    for (let i = 0; i < length; i++) {
      ret += this.memories[i].value() ? (1 << length - i - 1) : 0
    }
    return ret
  }
  setValue(value: number): void {
    const length = this.memories.length
    for (let i = 0; i < length; i++) {
      this.memories[i].value((1 << length - i - 1) & value)
    }
  }
}