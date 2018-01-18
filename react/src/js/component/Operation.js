export function operate(state) {
  const currentLine = state.memoryLines[state.programCount]
  const operatorNumber = currentLine && currentLine.operator
  const operator = getOperator(operatorNumber)
  if (operator) {
    const operand = currentLine && currentLine.operand
    let newState = operator(state, operand)
    if (newState.programCount > 15) {
      newState.programCount -= 16
    }
    return newState
  }
  else {
    return state
  }
}

function getOperator(operatorNumber) {
  switch (operatorNumber) {
    case  0: return addA
    // case  1: return moveAB
    // case  2: return inputA
    // case  3: return moveA
    // case  4: return moveBA
    case  5: return addB
    // case  6: return inputB
    // case  7: return moveB
    // case  9: return outputB
    // case 11: return outputData
    // case 14: return jumpIf
    // case 15: return jump
    default:
      console.log(`unknouwn operator ${operatorNumber}`)
      return unknown
  }
}

function unknown(state, operand) {
  return Object.assign(state, {
    programCount: state.programCount + 1,
    carry: false,
  })
}

function addA(state, operand) {
  const addResult = state.registorA + operand
  const carry = addResult > 15
  return Object.assign(state, {
    programCount: state.programCount + 1,
    carry,
    registorA: carry ? addResult - 16 : addResult,
  })
}

function addB(state, operand) {
  const addResult = state.registorB + operand
  const carry = addResult > 15
  return Object.assign(state, {
    programCount: state.programCount + 1,
    carry,
    registorB: carry ? addResult - 16 : addResult,
  })
}