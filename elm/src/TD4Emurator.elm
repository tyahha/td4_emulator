import Html exposing (..)
import Html.Attributes exposing (..)

main =
  Html.beginnerProgram
    { model = model
    , view = view
    , update = update
    }

-- Model
type alias Model = String

model: Model
model = "Hello world"

-- Update
type Msg = TODO

update: Msg -> Model -> Model
update msg model = model

-- View
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
    ]