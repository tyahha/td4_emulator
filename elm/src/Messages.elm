module Messages exposing (..)

import Models exposing (..)
import Time exposing (Time)

type Msg
  = LoadFile
  | SaveFile
  | ChangeClockMode ClockMode
  | Clock1Hz Time
  | Clock10Hz Time
  | ManualClock
  | Clock
  | Reset
  | ChangeProgramMemoryLine ProgramMemoryLine
