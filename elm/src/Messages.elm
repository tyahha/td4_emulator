module Messages exposing (..)

import Models exposing (..)

type Msg
  = LoadFile
  | SaveFile
  | ChangeClockMode ClockMode
