module ControlPanelView exposing (controlPanel)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onClick)

import Models exposing (..)
import Messages exposing (..)

import RegistorView exposing (registor)
import ClockGeneratorView exposing (clockGenerator)

controlPanel : Model -> Html Msg
controlPanel model =
  div [ class "control-panel" ]
    [ registor model
    , clockGenerator model
    , div []
        [ button
            [ class "reset-button"
            , onClick Reset
            ]
            [ text "Reset"
            ]
        ]
    ]
