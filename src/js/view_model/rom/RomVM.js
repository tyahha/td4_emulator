import RomLineVM from "./RomLineVM"

export default class RomVM {
    constructor() {
        this.lines = [];
        for (let i = 0; i < 16; i++) {
            this.lines.push(new RomLineVM(i))
        }
        this.currentLine = 0
        this.lines[0].current(true)
    }

    reset() {
        this.lines[this.currentLine].current(false)
        this.currentLine = 0
        this.lines[0].current(true)
    }

    nextStep() {
        this.lines[this.currentLine].current(false)
        this.currentLine++
        if (this.currentLine >= this.lines.length) {
            this.currentLine = 0
        }
        this.lines[this.currentLine].current(true)
    }
}
