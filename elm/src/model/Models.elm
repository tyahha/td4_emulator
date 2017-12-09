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

updateProgramMemoryLines : ProgramMemoryLines -> ProgramMemoryLine -> ProgramMemoryLines
updateProgramMemoryLines targets src = List.map (updateProgramMemoryLine src) targets

type alias Model = {
  registorA : Int,
  registorB : Int,
  carry : Bool,
  programCountor : Int,
  output : Int,
  beep : Bool,
  input : Int,
  clockMode : ClockMode,
  programMemoryLines: ProgramMemoryLines
}

model: Model
model = Model 0 0 False 0 0 False 0 Manual (List.map initProgramMemoryLine (List.range 0 15))
