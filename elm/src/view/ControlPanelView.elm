module ControlPanelView exposing (controlPanel)

import Html exposing (..)
import Html.Attributes exposing (..)

import Models exposing (..)
import Messages exposing (..)

import RegistorView exposing (registor)

controlPanel: Model -> Html Msg
controlPanel model =
  div [ class "control-panel" ]
    [ registor model
    ]
