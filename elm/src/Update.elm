module Update exposing (update)

import Messages exposing (..)
import Model.Models exposing (..)
import Model.Operators exposing (..)

import Debug exposing (log)

update: Msg -> Model -> (Model, Cmd Msg)
update msg model =
  case msg of
    LoadFile ->
      -- TODO: FilePaser
      (log "LoadFile" model) ! []
    SaveFile ->
      -- TODO: SaveFile
      (log "SaveFile" model) ! []
    ChangeClockMode mode ->
      { model | clockMode = log "ChangeClockMode" mode } ! []
    Clock1Hz t ->
      (if model.clockMode == OneHz then clock model else model) ! []
    Clock10Hz t ->
      (if model.clockMode == TenHz then clock model else model) ! []
    ManualClock ->
      (if model.clockMode == Manual then clock model else model) ! []
    Clock ->
      (clock model) ! []
    Reset ->
      { model
      | programCountor = 0
      , registorA = 0
      , registorB = 0
      , output = 0
      , carry = False
      } ! []
    ChangeProgramMemoryLine line ->
      updateProgramMemoryLines model (log "ChangeProgramMemoryLine" line) ! []
