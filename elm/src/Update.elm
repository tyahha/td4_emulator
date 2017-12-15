module Update exposing (update)

import Messages exposing (..)
import Models exposing (..)

import Debug exposing (log)

update: Msg -> Model -> Model
update msg model =
  case msg of
    LoadFile ->
      -- TODO: FilePaser
      log "LoadFile" model
    SaveFile ->
      -- TODO: SaveFile
      log "SaveFile" model
    ChangeClockMode mode ->
      { model | clockMode = log "ChangeClockMode" mode }
    ManualClock ->
      if model.clockMode == Manual then clock model
      else model
    Clock ->
      clock model
    ChangeProgramMemoryLine line ->
      updateProgramMemoryLines model (log "ChangeProgramMemoryLine" line)
    
    
      
