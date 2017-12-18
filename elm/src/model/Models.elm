module Models exposing (..)

type ClockMode = OneHz | TenHz | Manual

type alias ProgramMemoryLine = {
  address: Int,
  operator: Int,
  operand: Int
}

type alias ProgramMemoryLines = List ProgramMemoryLine

type alias Model =
  { registorA : Int
  , registorB : Int
  , carry : Bool
  , programCountor : Int
  , output : Int
  , beep : Bool
  , input : Int
  , clockMode : ClockMode
  , programMemoryLines: ProgramMemoryLines
  }

initProgramMemoryLine : Int -> ProgramMemoryLine
initProgramMemoryLine address = ProgramMemoryLine address 0 0

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
  case line.operator of
    0 -> addA model line
    1 -> moveAB model line
    2 -> inputA model line
    3 -> moveA model line
    4 -> moveBA model line
    5 -> addB model line
    6 -> inputB model line
    7 -> moveB model line
    9 -> outputB model line
    11 -> outputData model line
    14 -> jumpIf model line
    15 -> jump model line
    _ ->
      { model |
        carry = False,
        programCountor =
          nextAddress
            (Debug.log "unsupported operator" line)
      }


nextAddress : ProgramMemoryLine -> Int
nextAddress line =
  if line.address == 15 then
    0
  else
    line.address + 1

updateProgramMemoryLine : ProgramMemoryLine -> ProgramMemoryLine -> ProgramMemoryLine
updateProgramMemoryLine src target =
  if target.address == src.address then
    src
  else
    target

updateProgramMemoryLines : Model -> ProgramMemoryLine -> Model
updateProgramMemoryLines model src =
  { model
  | programMemoryLines = List.map (updateProgramMemoryLine src) model.programMemoryLines
  }

model: Model
model = Model 0 0 False 0 0 False 0 Manual (List.map initProgramMemoryLine (List.range 0 15))
