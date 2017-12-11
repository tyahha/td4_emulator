module Util exposing (boolToHexChar, andToBool, boolToHexString, intToHexString)

import String exposing (fromChar, cons)
import Bitwise exposing (and)

boolToHexChar : Bool -> Char
boolToHexChar b = if (b) then '1' else '0'

boolToHexString : Bool -> String
boolToHexString b = fromChar (boolToHexChar b)

andToBool : Int -> Int -> Bool
andToBool target bit = (and target bit) == bit

intToBoolList : Int -> List Bool
intToBoolList num =
  (andToBool num 8) 
    :: (andToBool num 4)
    :: (andToBool num 2)
    :: (andToBool num 1)
    :: []

intToHexString : Int -> String
intToHexString num =
  cons (boolToHexChar (andToBool num 8)) (
    cons (boolToHexChar (andToBool num 4)) (
      cons (boolToHexChar (andToBool num 2)) (
        cons (boolToHexChar (andToBool num 1)) ""
      )
    )
  )