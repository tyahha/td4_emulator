import ko from 'knockout'
import RomCellVM from './RomCellVM'
import RomLineAddress from './RomLineAddress'

function parseMemoryCellToNumber(cell: RomCellVM): number {
    return cell ? cell.value() ? 1 : 0 : 0
}

function parseMemoryToNumber(memories: Array<RomCellVM>): number {
    return parseMemoryCellToNumber(memories[3]) << 3 |
           parseMemoryCellToNumber(memories[2]) << 2 |
           parseMemoryCellToNumber(memories[1]) << 1 |
           parseMemoryCellToNumber(memories[0]) << 0
}

export default class RomLineVM {
    current: any
    address: RomLineAddress
    memories: Array<RomCellVM>
    constructor(address: number) {
        this.current = ko.observable(false)
        this.address = new RomLineAddress(address)
        let memories = [];
        for (let i = 0; i < 8; i++) {
            memories.push(new RomCellVM(false, address, i))
        }
        this.memories = memories
    }

    getOperationData(): number {
        return parseMemoryToNumber(this.memories.slice().reverse().slice(4, 8))
    }

    getImmediateData(): number {
        return parseMemoryToNumber(this.memories.slice().reverse().slice(0, 4))
    }
}
