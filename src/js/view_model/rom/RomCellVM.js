import ko from "knockout"

export default class RomCellVM {
    constructor(initialValue, line, index) {
        this.value = ko.observable(initialValue);
        this.line = line;
        this.index = index;

        this.value.subscribe((newValue) => {
            console.log(`change value(${this.line}, ${this.index}): ${newValue}`)
        });
    }
}