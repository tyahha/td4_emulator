module Operators exposing (..)

import Models exposing (..)

addA : Model -> ProgramMemoryLine -> Model
addA model line = 
  let
    addresult = model.registorA + line.operand
    carry = addresult > 15
  in { model |
    carry = carry,
    registorA = if carry then addresult - 16 else addresult,
    programCountor = nextAddress line
  }

addB : Model -> ProgramMemoryLine -> Model
addB model line = 
  let
    addresult = model.registorB + line.operand
    carry = addresult > 15
  in { model |
    carry = carry,
    registorB = if carry then addresult - 16 else addresult,
    programCountor = nextAddress line
  }

moveA : Model -> ProgramMemoryLine -> Model
moveA model line = 
  { model |
    carry = False,
    registorA = line.operand,
    programCountor = nextAddress line
  }

moveB : Model -> ProgramMemoryLine -> Model
moveB model line = 
  { model |
    carry = False,
    registorB = line.operand,
    programCountor = nextAddress line
  }

moveAB : Model -> ProgramMemoryLine -> Model
moveAB model line = 
  { model |
    carry = False,
    registorA = model.registorB,
    programCountor = nextAddress line
  }

moveBA : Model -> ProgramMemoryLine -> Model
moveBA model line = 
  { model |
    carry = False,
    registorB = model.registorA,
    programCountor = nextAddress line
  }

jump : Model -> ProgramMemoryLine -> Model
jump model line = 
  { model |
    carry = False,
    programCountor = line.operand
  }

jumpIf : Model -> ProgramMemoryLine -> Model
jumpIf model line = 
  { model |
    carry = False,
    programCountor =
      if model.carry then
        nextAddress line
      else
        line.operand
  }

inputA : Model -> ProgramMemoryLine -> Model
inputA model line =
  { model |
    carry = False,
    registorA = model.input,
    programCountor = nextAddress line
  }

inputB : Model -> ProgramMemoryLine -> Model
inputB model line =
  { model |
    carry = False,
    registorB = model.input,
    programCountor = nextAddress line
  }

outputB : Model -> ProgramMemoryLine -> Model
outputB model line =
  { model |
    carry = False,
    output = model.registorB,
    programCountor = nextAddress line
  }

outputData : Model -> ProgramMemoryLine -> Model
outputData model line =
  { model |
    carry = False,
    output = line.operand,
    programCountor = nextAddress line
  }

errorOperator : Model -> ProgramMemoryLine -> Model
errorOperator model line =
  { model |
    carry = False,
    programCountor =
      nextAddress
        (Debug.log "unsupported operator" line)
  }

currentLine : Model -> ProgramMemoryLine
currentLine model =
  let filtered =
    List.filter ( \p -> p.address == model.programCountor ) model.programMemoryLines
  in
    case List.head filtered of
      Just line -> line
      Nothing -> Debug.log "error currentLine" ( ProgramMemoryLine 0 0 0 )

clock : Model -> Model
clock model =
  model
    |> currentLine
    |> operate model

operate : Model -> ProgramMemoryLine -> Model
operate model line =
  let operator = getOperator line
  in operator model line

getOperator : ProgramMemoryLine -> (Model -> ProgramMemoryLine -> Model)
getOperator line =
  case line.operator of
    0 -> addA
    1 -> moveAB
    2 -> inputA
    3 -> moveA
    4 -> moveBA
    5 -> addB
    6 -> inputB
    7 -> moveB
    9 -> outputB
    11 -> outputData
    14 -> jumpIf
    15 -> jump
    _ -> errorOperator

nextAddress : ProgramMemoryLine -> Int
nextAddress line =
  if line.address == 15 then
    0
  else
    line.address + 1
