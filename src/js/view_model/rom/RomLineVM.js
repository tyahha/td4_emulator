import ko from 'knockout'
import RomCellVM from './RomCellVM'
import RomLineAddress from './RomLineAddress'
import ImmediateData from '../../domain/ImmediateData'

function parseMemoryCellToNumber(cell: RomCellVM): number {
    return cell ? cell.value() ? 1 : 0 : 0
}

export function parseMemoryToNumber(memories: Array<RomCellVM>): number {
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

    getImmediateData(): ImmediateData {
        return new ImmediateData(
            parseMemoryToNumber(this.memories.slice().reverse().slice(0, 4))
        )
    }

    set(flags: Array<boolean>): void {
        const length = this.memories.length
        for (let i = 0; i < length; i++) {
            this.memories[length - i - 1].value(flags[i])
        }
    }
}
