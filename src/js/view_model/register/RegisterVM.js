import ko from 'knockout'

export default class RegisterVM {
  value: any
  display: any

  constructor(value: number, subscriber: ?(newValue: number) => void) {
    this.value = ko.observable(value)
    if (subscriber) {
      this.value.subscribe(subscriber)
    }
    this.display = ko.computed(() => {
      return `0000${this.value().toString(2)}`.slice(-4)
    }, this)
  }

  setValue(value: number): void {
    this.value(value % 16)
  }
}