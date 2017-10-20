import ko from "knockout"

export default class RomCellVM {
    value: boolean
    line: number
    index: number
    constructor(initialValue: boolean, line: number, index: number) {
        this.value = ko.observable(initialValue);
        this.line = line;
        this.index = index;

        this.value.subscribe((newValue) => {
            console.log(`change value(${this.line}, ${this.index}): ${newValue}`)
        });
    }
}