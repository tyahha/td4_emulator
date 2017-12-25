module View.ProgramMemory exposing (programMemoryView)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onClick)

import Models exposing (..)
import Messages exposing (..)
import Util exposing (..)
import Bitwise

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

updateOP : Bool -> Int -> Int -> Int
updateOP current bit src =
  if current then
    Bitwise.and src (Bitwise.complement bit)
  else
    Bitwise.or src bit

memoryCell : Bool -> Msg -> Html Msg
memoryCell check msg =
  label []
    [ input
      [ type_ "checkbox"
      , class "memory-checkbox"
      , checked check
      , onClick msg
      ] []
    , span [ class "memory-icon" ] []
    ]

operatorMemoryCell : ProgramMemoryLine -> Int -> Html Msg
operatorMemoryCell line bit =
  let check = andToBool line.operator bit
  in memoryCell check (ChangeProgramMemoryLine { line | operator = (updateOP check bit line.operator)})

operandMemoryCell : ProgramMemoryLine -> Int -> Html Msg
operandMemoryCell line bit =
  let check = andToBool line.operand bit
  in memoryCell check (ChangeProgramMemoryLine { line | operand = (updateOP check bit line.operand)})

line : Int -> ProgramMemoryLine -> Html Msg
line programCounter line =
  div ( lineAttribute programCounter line.address )
    [ text ("Address " ++ (addressToDisplay line.address))
    , operatorMemoryCell line 8
    , operatorMemoryCell line 4
    , operatorMemoryCell line 2
    , operatorMemoryCell line 1
    , operandMemoryCell line 8
    , operandMemoryCell line 4
    , operandMemoryCell line 2
    , operandMemoryCell line 1
    ]

lines : Model -> List (Html Msg)
lines model =
  List.map (line model.programCountor) model.programMemoryLines

programMemoryView : Model -> Html Msg
programMemoryView model =
  div [ class "program-memory" ]
    ([ h3 [ class "title" ] [ text "Program Memory" ]
    ] ++ lines model)