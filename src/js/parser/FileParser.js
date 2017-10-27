import Setting from '../domain/Setting'
import type {ClockMode} from '../domain/ClockMode'

function parseLines(input: string): Array<string> {
  return input.trim().split("\n").map(s => s.trim())
}

const LineCount = 132
const LineIndex = {
  memoriesStart: 0,
  memoriesEnd: 127,
  Hz1: 128,
  Hz10: 129,
  HzManual: 130,
  Beep: 131,
}

const HzFlag = {
  False: '#FALSE#',
  True: '#TRUE#',
}

const Flag = {
  ON: "1",
  OFF: "0",
}

function checkFlagLine(line: string): boolean {
  return line === Flag.ON || line === Flag.OFF
}

function checkMemoriesLine(lines: Array<string>): boolean {
  return lines.find(s => !checkFlagLine(s)) ? false : true
}

function convertFlagLine(line: string): boolean {
  return line === Flag.ON ? true : false
}

export default {
  parse: (input: string) => {
    const lines = parseLines(input)
    
    if (lines.length !== LineCount) {
      return `Input file expect line count is ${LineCount}, your file line count is ${lines.length}`
    }

    const memoriesLine = lines.slice(LineIndex.memoriesStart, LineIndex.memoriesEnd + 1)
    if (!checkMemoriesLine(memoriesLine)) {
      return `Input file expect line ${LineIndex.memoriesStart + 1}-${LineIndex.memoriesEnd + 1} is "${Flag.ON} or ${Flag.OFF}"`
    }

    const hzSelectorFlagStrings = lines.slice(LineIndex.Hz1, LineIndex.HzManual + 1)
    const unExpectedLine = hzSelectorFlagStrings.find(s => s !== HzFlag.False && s !== HzFlag.True)
    if (unExpectedLine) {
      return `line ${LineIndex.Hz1 + 1} - ${LineIndex.HzManual + 1} must be ${HzFlag.True} or ${HzFlag.False}`
    }

    const hzSelectorFlags = hzSelectorFlagStrings.map(s => s === HzFlag.True)
    const trueFlags = hzSelectorFlags.filter(b => b)
    if (trueFlags.length !== 1) {
      return `line ${LineIndex.Hz1 + 1} - ${LineIndex.HzManual + 1} must contain #TRUE# only one line`
    }

    const beepString = lines[LineIndex.Beep]
    if (!checkFlagLine(beepString)) {
      return `line ${LineIndex.Beep + 1} must be "${Flag.ON} or ${Flag.OFF}"`
    }

    const trueIndex = hzSelectorFlags.indexOf(true)
    const hzMode = trueIndex === 0 ? '1Hz' : trueIndex === 1 ? '10Hz' : 'Manual'
    const memories = memoriesLine.map(s => convertFlagLine(s))
    const beep = convertFlagLine(beepString)

    return new Setting(hzMode, beep, memories)
  }
}

