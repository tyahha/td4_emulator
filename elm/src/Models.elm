module Models exposing (..)

type alias Model = {
  registorA : Int,
  registorB : Int,
  carry : Bool,
  programCountor : Int,
  output: Int,
  beep: Bool,
  input: Int
}

model: Model
model = Model 0 0 False 0 0 False 0
