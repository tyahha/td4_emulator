import Html exposing (beginnerProgram)

import Models exposing (model)
import View exposing (view)
import Update exposing (update)

main =
  Html.beginnerProgram
    { model = model
    , view = view
    , update = update
    }
