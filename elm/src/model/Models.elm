module Model.Models exposing (..)

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
