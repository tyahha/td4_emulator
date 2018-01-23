import ClockMode from '../ClockMode'

export interface MemoryLine {
  operator: number;
  operand: number;
}

export interface TD4State {
  programCount: number;
  registorA: number;
  registorB: number;
  carry: boolean;
  input: number;
  output: number;
  enableBeep: boolean;
  clockMode: $Keys<typeof ClockMode>;
  memoryLines: Array<MemoryLine>;
}