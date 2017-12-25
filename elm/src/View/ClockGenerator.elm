module View.ClockGenerator exposing (clockGenerator)

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

clockGenerator : Model -> Html Msg
clockGenerator model =
  div [ class "clock-generator" ]
    [ h3 [ class "title" ] [ text "Clock Generator" ]
    , p []
        [ radio model.clockMode OneHz
        , text "1Hz"
        ]
    , p []
        [ radio model.clockMode TenHz
        , text "10Hz"
        ]
    , p []
        [ radio model.clockMode Manual
        , text "Manual "
        , button [ onClick ManualClock ] [ text "Clock" ]
        ]
    ]