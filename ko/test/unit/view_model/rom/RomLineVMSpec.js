import assert from 'power-assert'
import {parseMemoryToNumber} from '../../../../src/js/view_model/rom/RomLineVM'
import RomCellVM from '../../../../src/js/view_model/rom/RomCellVM'

function constructRomCellVMs(a: Array<number>) {
  return a.map((v, i, arr) => new RomCellVM(v ? true : false, 0, 0))
}

describe('RomLineVM', () => {
  describe('parseMemoryToNumber', () => {
    it('shoud parse memory', () => {
      assert(parseMemoryToNumber(constructRomCellVMs([0, 0, 0, 0])) === 0)
      assert(parseMemoryToNumber(constructRomCellVMs([1, 0, 0, 0])) === 1)
      assert(parseMemoryToNumber(constructRomCellVMs([0, 1, 0, 0])) === 2)
      assert(parseMemoryToNumber(constructRomCellVMs([1, 1, 0, 0])) === 3)
      assert(parseMemoryToNumber(constructRomCellVMs([0, 0, 1, 0])) === 4)
      assert(parseMemoryToNumber(constructRomCellVMs([1, 0, 1, 0])) === 5)
      assert(parseMemoryToNumber(constructRomCellVMs([0, 1, 1, 0])) === 6)
      assert(parseMemoryToNumber(constructRomCellVMs([1, 1, 1, 0])) === 7)
      assert(parseMemoryToNumber(constructRomCellVMs([0, 0, 0, 1])) === 8)
      assert(parseMemoryToNumber(constructRomCellVMs([1, 0, 0, 1])) === 9)
      assert(parseMemoryToNumber(constructRomCellVMs([0, 1, 0, 1])) === 10)
      assert(parseMemoryToNumber(constructRomCellVMs([1, 1, 0, 1])) === 11)
      assert(parseMemoryToNumber(constructRomCellVMs([0, 0, 1, 1])) === 12)
      assert(parseMemoryToNumber(constructRomCellVMs([1, 0, 1, 1])) === 13)
      assert(parseMemoryToNumber(constructRomCellVMs([0, 1, 1, 1])) === 14)
      assert(parseMemoryToNumber(constructRomCellVMs([1, 1, 1, 1])) === 15)
    })

    it('shoud treat undefined as 0', () => {
      assert(parseMemoryToNumber([]) === 0)
      assert(parseMemoryToNumber([new RomCellVM(true, 0, 0)]) === 1)
      const a = new Array(4)
      a[1] = new RomCellVM(true, 0, 0)
      assert(parseMemoryToNumber(a) === 2)
    })
  })
})
