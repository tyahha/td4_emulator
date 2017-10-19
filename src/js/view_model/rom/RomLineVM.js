import ko from 'knockout'
import RomCellVM from './RomCellVM'
import RomLineAddress from './RomLineAddress'

export default class RomLineVM {
    constructor(address) {
        this.current = ko.observable(false)
        this.address = new RomLineAddress(address)
        let memories = [];
        for (let i = 0; i < 8; i++) {
            memories.push(new RomCellVM(false, address, i))
        }
        this.memories = memories
    }
}
