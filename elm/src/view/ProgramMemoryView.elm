module ProgramMemoryView exposing (programMemoryView)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onClick)

import Models exposing (..)
import Messages exposing (..)

lineAttribute : Int -> Int -> List (Attribute Msg)
lineAttribute programCounter address =
  let common = class "rom-line"
  in
    if programCounter == address then
      [ common, class "current" ]
    else
      [ common ]

addressToDisplay : Int -> String
addressToDisplay address = 
  String.right 2 (String.cons '0' ( toString address ))

memoryCell : Bool -> Html Msg
memoryCell flag =
  label []
    [ input [ type_ "checkbox", class "memory-checkbox", checked flag ] []
    , span [ class "memory-icon" ] []
    ]

line : Int -> ProgramMemoryLine -> Html Msg
line programCounter line =
  div ( lineAttribute programCounter line.address )
    ([ text ("Address " ++ (addressToDisplay line.address))
    ] ++ (List.map memoryCell [False, False, False, False, False, False, False, False]))


lines : Model -> List (Html Msg)
lines model =
  List.map (line model.programCountor) model.programMemoryLines

programMemoryView : Model -> Html Msg
programMemoryView model =
  div [ class "program-memory" ]
    ([ h3 [ class "title" ] [ text "Program Memory" ]
    ] ++ lines model)