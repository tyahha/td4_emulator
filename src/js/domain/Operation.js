import ImmediateData from './ImmediateData'

export interface Operation {
  run(ImmediateData): boolean
}