module Subscriptions exposing (..)

import Time exposing (Time, second, millisecond)
import Model.Models exposing (..)
import Messages exposing (..)

subscriptions : Model -> Sub Msg
subscriptions model =
  case model.clockMode of
    OneHz ->
      Time.every second Clock1Hz
    TenHz ->
      Time.every (100 * millisecond) Clock10Hz
    _ ->
      Sub.none
      