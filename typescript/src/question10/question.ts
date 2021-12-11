var BreakException = {}
const partA = async (input: string[]) => {

  let totalSyntaxErrorScore = 0
  input.forEach(inputLine => {
    const stack: string[] = []

    try {
      inputLine.split('').forEach(inputChar => {
        if (['(', '[', '{', '<'].includes(inputChar)) {
          stack.push(inputChar)
        } else {
          switch (inputChar) {
            case ')':
              if (stack[stack.length-1] != '(') {
                totalSyntaxErrorScore += 3
                throw BreakException
              } else {
                stack.pop()
              }
              break;
            case ']':
              if (stack[stack.length-1] != '[') {
                totalSyntaxErrorScore += 57
                throw BreakException
              } else {
                stack.pop()
              }
              break;
            case '}':
              if (stack[stack.length-1] != '{') {
                totalSyntaxErrorScore += 1197
                throw BreakException
              } else {
                stack.pop()
              }
              break;
            case '>':
              if (stack[stack.length-1] != '<') {
                totalSyntaxErrorScore += 25137
                throw BreakException
              } else {
                stack.pop()
              }
              break;
          }
        }
      })
    } catch (e) {
      if (e !== BreakException) throw e
    }
  })
  
  return totalSyntaxErrorScore
}

interface IncompleteLine {
  inputLine: string;
  stack: string[]
}

const partB = async (input: string[]) => {
  const incompleteLines: IncompleteLine[] = []

  input.forEach(inputLine => {
    const stack: string[] = []
    let finishedCharIndex = 0
    try {
      inputLine.split('').forEach((inputChar, index) => {
        if (['(', '[', '{', '<'].includes(inputChar)) {
          stack.push(inputChar)
        } else {
          switch (inputChar) {
            case ')':
              if (stack[stack.length-1] != '(') {
                throw BreakException
              } else {
                stack.pop()
              }
              break;
            case ']':
              if (stack[stack.length-1] != '[') {
                throw BreakException
              } else {
                stack.pop()
              }
              break;
            case '}':
              if (stack[stack.length-1] != '{') {
                throw BreakException
              } else {
                stack.pop()
              }
              break;
            case '>':
              if (stack[stack.length-1] != '<') {
                throw BreakException
              } else {
                stack.pop()
              }
              break;
          }
        }

        finishedCharIndex = index
      })
    } catch (e) {
      if (e !== BreakException) throw e
    }

    if (finishedCharIndex != inputLine.length - 1) {
      // corrupted line
    } else if (stack.length != 0) {
      // incomplete line!
      incompleteLines.push({
        inputLine,
        stack,
      })
    }
  })
  
  const lineScores: number[] = []
  incompleteLines.forEach(lineInfo => {
    const { inputLine, stack } = lineInfo

    let lineScore = 0
    stack.reverse()
    stack.forEach(char => {
      lineScore *= 5
      if (char == '(') lineScore += 1
      if (char == '[') lineScore += 2
      if (char == '{') lineScore += 3
      if (char == '<') lineScore += 4
    })

    lineScores.push(lineScore)
  })

  lineScores.sort((a, b) => a - b)
  return lineScores[Math.round((lineScores.length - 1) / 2)]
}

export default {
  partA,
  partB,
}