import Html exposing (program)

import Models exposing (model, Model)
import Messages exposing (Msg)
import View.Main exposing (view)
import Update exposing (update)
import Subscriptions exposing (subscriptions)

init : (Model, Cmd Msg)
init = (model, Cmd.none)

main =
  Html.program
    { init = init
    , view = view
    , update = update
    , subscriptions = subscriptions
    }
