module Models exposing (..)

type ClockMode = OneHz | TenHz | Manual

type alias ProgramMemoryLine = {
  address: Int,
  operator: Int,
  operand: Int
}

type alias ProgramMemoryLines = List ProgramMemoryLine

initProgramMemoryLine : Int -> ProgramMemoryLine
initProgramMemoryLine address = ProgramMemoryLine address 0 0

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

operate : Model -> ProgramMemoryLine -> Model
operate model line =
  case line.operator of
    0 -> addA model line
    1 -> moveAB model line
    2 -> model
    3 -> moveA model line
    4 -> moveBA model line
    5 -> addB model line
    6 -> model
    7 -> moveB model line
    8 -> model
    9 -> model
    10 -> model
    11 -> model
    12 -> model
    13 -> model
    14 -> model
    15 -> model
    _ -> model

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

model: Model
model = Model 0 0 False 0 0 False 0 Manual (List.map initProgramMemoryLine (List.range 0 15))
