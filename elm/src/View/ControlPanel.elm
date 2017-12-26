module View.ControlPanel exposing (controlPanel)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onClick)

import Model.Models exposing (..)
import Messages exposing (..)

import View.Registor exposing (registor)
import View.ClockGenerator exposing (clockGenerator)

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
