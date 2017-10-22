import RomLineVM from "./RomLineVM"

export default class RomVM {
    currentLine: number
    lines: Array<RomLineVM>
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

    nextStep(nextLine: number) {
        nextLine = nextLine % this.lines.length 
        this.lines[this.currentLine].current(false)
        this.currentLine = nextLine
        this.lines[this.currentLine].current(true)
    }
}
