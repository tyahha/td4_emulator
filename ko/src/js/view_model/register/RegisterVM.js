import ko from 'knockout'

export default class RegisterVM {
  name: string
  value: any
  display: any

  constructor(name: string, value: number, subscriber: ?(newValue: number) => void) {
    this.name = name
    this.value = ko.observable(value)
    if (subscriber) {
      this.value.subscribe(subscriber)
    }
    this.display = ko.computed(() => {
      return `0000${this.value().toString(2)}`.slice(-4)
    }, this)
  }

  getValue(): number {
    return this.value()
  }

  setValue(v: number): void {
    if (v !== this.value()) {
      this.value(v % 16)
    }
  }
}