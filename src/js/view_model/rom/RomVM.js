import RomLineVM from "./RomLineVM"

export default class RomVM {
    constructor() {
        this.lines = [];
        for (let i = 0; i < 16; i++) {
            this.lines.push(new RomLineVM(i));
        }
    }
}
