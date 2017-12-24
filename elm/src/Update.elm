module Update exposing (update)

import Messages exposing (..)
import Models exposing (..)
import Operators exposing (..)

import Debug exposing (log)

update: Msg -> Model -> (Model, Cmd Msg)
update msg model =
  case msg of
    LoadFile ->
      -- TODO: FilePaser
      log "LoadFile" (model, Cmd.none)
    SaveFile ->
      -- TODO: SaveFile
      log "SaveFile" (model, Cmd.none)
    ChangeClockMode mode ->
      let m = { model | clockMode = log "ChangeClockMode" mode }
      in (m, Cmd.none)
    Clock1Hz t ->
      let m = if model.clockMode == OneHz then clock model
        else model
      in (m, Cmd.none)
    Clock10Hz t ->
      let m = if model.clockMode == TenHz then clock model
        else model
      in (m, Cmd.none)
    ManualClock ->
      let m = if model.clockMode == Manual then clock model
        else model
      in (m, Cmd.none)
    Clock ->
      let m = clock model
      in (m, Cmd.none)
    Reset ->
      let m =
        { model
        | programCountor = 0
        , registorA = 0
        , registorB = 0
        , output = 0
        , carry = False
        }
      in (m, Cmd.none)
    ChangeProgramMemoryLine line ->
      let m = updateProgramMemoryLines model (log "ChangeProgramMemoryLine" line)
      in (m, Cmd.none)
    
    
      
