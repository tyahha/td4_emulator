module View.Menu exposing (menu)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onClick)

import Model.Models exposing (..)
import Messages exposing (..)

menu: Model -> Html Msg
menu model =
  div [ class "menu" ]
    [ label [ for "load-file", class "square_btn"]
        [ text "Load Program"
        , input
            [ type_ "file"
            , id "load-file"
            , style [("display", "none")]
            , accept ".td4"
            , onClick LoadFile
            ] []
        ]
    , a
        [ downloadAs "program.td4"
        , class "square_btn"
        , id "save-file"
        , href "#"
        , onClick SaveFile
        ]
        [ text "Save Program"
        ]
    ]