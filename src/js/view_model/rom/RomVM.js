import RomLineVM from "./RomLineVM"

export default class RomVM {
    currentLineNumber: number
    lines: Array<RomLineVM>
    constructor() {
        this.lines = [];
        for (let i = 0; i < 16; i++) {
            this.lines.push(new RomLineVM(i))
        }
        this.currentLineNumber = 0
        this.lines[0].current(true)
    }

    reset() {
        this.lines[this.currentLineNumber].current(false)
        this.currentLineNumber = 0
        this.lines[0].current(true)
    }

    nextStep(nextLine: number) {
        nextLine = nextLine % this.lines.length 
        this.currentLine().current(false)
        this.currentLineNumber = nextLine
        this.currentLine().current(true)
    }

    currentLine(): RomLineVM {
        return this.lines[this.currentLineNumber]
    }

    set(flags: Array<boolean>): void {
        for (let i = 0; i < this.lines.length; i++) {
            this.lines[i].set(flags.slice(i * 8, i * 8 + 8))
        }
    }
}
