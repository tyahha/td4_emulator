module View.Registor exposing (registor)

import Html exposing (..)
import Html.Attributes exposing (..)

import Model.Models exposing (..)
import Messages exposing (..)

import Util exposing (boolToHexChar, boolToHexString, andToBool, intToHexString)

andToBitImg : Int -> Int -> Html Msg
andToBitImg num mask =
  let b = andToBool num mask
  in img [src (if (b) then "../img/on.png" else "../img/off.png") ] []

registor: Model -> Html Msg
registor model =
  div [ class "registor" ]
    [ p []
        [ text "RegistorA "
        , text (intToHexString model.registorA)
        ]
    , p []
        [ text "RegistorB "
        , text (intToHexString model.registorB)
        ]
    , p []
        [ text "C Flag "
        , text (boolToHexString model.carry)
        ]
    , p []
        [ text "Program Counter "
        , text (intToHexString model.programCountor)
        ]
    , p [ class "output" ]
        [ span [class "label"] [ text "output" ]
        , andToBitImg model.output 8
        , andToBitImg model.output 4
        , andToBitImg model.output 2
        , andToBitImg model.output 1
        ]
    , p [ class "beep-line" ] []
    , p [ class "beep-string" ]
        [ input [ type_ "checkbox", checked model.beep ] []
        , text "Beep"
        ]
    , p [ class "input" ]
        [ text "input"
        , input [ type_ "checkbox", checked (andToBool model.input 8 ) ] []
        , input [ type_ "checkbox", checked (andToBool model.input 4 ) ] []
        , input [ type_ "checkbox", checked (andToBool model.input 2 ) ] []
        , input [ type_ "checkbox", checked (andToBool model.input 1 ) ] []
        ]
    ]
