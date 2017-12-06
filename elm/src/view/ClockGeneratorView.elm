module ClockGeneratorView exposing (clockGenerator)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onClick)

import Models exposing (..)
import Messages exposing (..)

radio : ClockMode -> ClockMode -> Html Msg
radio src check =
  input
    [ type_ "radio"
    , name "clock-generator"
    , onClick (ChangeClockMode check)
    , checked (src == check) ]
    []

clockGenerator : ClockMode -> Html Msg
clockGenerator clockMode =
  div [ class "clock-generator" ]
    [ h3 [ class "title" ] [ text "Clock Generator" ]
    , p []
        [ radio clockMode OneHz
        , text "1Hz"
        ]
    , p []
        [ radio clockMode TenHz
        , text "10Hz"
        ]
    , p []
        [ radio clockMode Manual
        , text "Manual "
        , button [] [ text "Clock" ]
        ]
    ]