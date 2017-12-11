module View exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)

import Models exposing (..)
import Messages exposing (..)

import MenuView exposing (menu)
import ControlPanelView exposing (controlPanel)
import ProgramMemoryView exposing (programMemoryView)

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
    , MenuView.menu model
    , controlPanel model
    , programMemoryView model
    ]
