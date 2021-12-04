const parseInput = (input: string[]): { calledNumbers: number[], boards: number[][][] } => {
  const calledNumbers = input[0].split(',')
  .map(numString => parseInt(numString))

  let boards: number[][][] = []
  let currentBoard: number[][] = []
  for (let inputLineIndex = 2; inputLineIndex < input.length; inputLineIndex++) {
    if (input[inputLineIndex].length == 1) {
      boards.push(currentBoard.slice())
      currentBoard = [];
      continue
    }
    currentBoard.push(input[inputLineIndex].split(' ')
      .filter(num => num != '')
      .map(num => parseInt(num.trim())))
  }
  boards.push(currentBoard.slice())

  return {
    calledNumbers,
    boards,
  }
}

const checkForBingos = (boards: number[][][], boardIndexesThatAlreadyWon?: number[]) => {
  const checkForBingo = (board: number[][]) => {
    const checkForHorizontalBingo = (board: number[][]) => {
      let hasBingo = false
      for (let boardRow of board) {
        if (boardRow.every(num => num < 0)) {
          hasBingo = true
          break
        }
      }

      return hasBingo
    }

    const checkForVerticalBingo = (board: number[][]) => {
      const transposedBoard = board[0].map((_, colIndex) => board.map(row => row[colIndex]))
      return checkForHorizontalBingo(transposedBoard)
    }

    return checkForHorizontalBingo(board) || checkForVerticalBingo(board)
  }

  const boardIndexesWithBingos: number[] = []
  boards.forEach((board, boardIndex) => {
    if (boardIndexesThatAlreadyWon
        && boardIndexesThatAlreadyWon.indexOf(boardIndex) > -1)
      return
    
    if (checkForBingo(board))
      boardIndexesWithBingos.push(boardIndex)
  })

  return boardIndexesWithBingos
}

const stampBoards = (num: number, boards: number[][][]) => {
  const stampBoard = (num: number, board: number[][]) => {
    for (let rowIndex = 0; rowIndex < board.length; rowIndex++)
      for (let columnIndex = 0; columnIndex < board[rowIndex].length; columnIndex++)
        if (board[rowIndex][columnIndex] == num)
          board[rowIndex][columnIndex] = -1

    return board
  }

  return boards.map(board => stampBoard(num, board));
}

const getScore = (board: number[][], lastNumberCalled: number) => {
  let sumOfUnmarked = 0

  board.forEach(row =>
    row.forEach(value =>
      sumOfUnmarked += value != -1 ? value : 0))

  return sumOfUnmarked * lastNumberCalled
}

const partA = async (input: string[]) => {
  let { calledNumbers, boards } = parseInput(input)

  for (let calledNumber of calledNumbers) {
    boards = stampBoards(calledNumber, boards)

    const winningBoardIndexes = checkForBingos(boards)
    if (winningBoardIndexes.length != 0) {
      return getScore(boards[winningBoardIndexes[0]], calledNumber)
    }
  }

  return null
}

const partB = async (input: string[]) => {
  let { calledNumbers, boards } = parseInput(input)

  const boardIndexesThatWon: {[key: number]: boolean} = {}
  for (let calledNumber of calledNumbers) {
    boards = stampBoards(calledNumber, boards)

    const indexesThatWonList = Object.keys(boardIndexesThatWon).map(numStr => parseInt(numStr))
    const winningBoardIndexes = checkForBingos(boards, indexesThatWonList)
    for (let winningBoardIndex of winningBoardIndexes) {
      boardIndexesThatWon[winningBoardIndex] = true
    }
    
    if (Object.keys(boardIndexesThatWon).length == boards.length) {
      return getScore(boards[winningBoardIndexes[0]], calledNumber);
    }
  }

  return null
}

export default {
  partA,
  partB,
}