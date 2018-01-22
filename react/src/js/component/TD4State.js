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
  enableBeep: number;
  clockMode: ClockMode.Manual;
  memoryLines: Array<MemoryLine>;
}