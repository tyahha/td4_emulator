module Update exposing (update)

import Messages exposing (..)
import Models exposing (Model)

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
