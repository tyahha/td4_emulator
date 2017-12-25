module View.Main exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)

import Models exposing (..)
import Messages exposing (..)

import View.Menu
import View.ControlPanel exposing (controlPanel)
import View.ProgramMemory exposing (programMemoryView)

view: Model -> Html Msg
view model =
  div []
    [ h1 [ class "title" ] [ text "TD4 Emulator" ]
    , p []
      [ text "implemented with elm "
      , a [ href "../index.html" ]
        [ text "TOP"
        ]
      ]
    , View.Menu.menu model
    , controlPanel model
    , programMemoryView model
    ]

