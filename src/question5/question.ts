const createMap = (size: number) => {
  const map: number[][] = []
  for (let rowIndex = 0; rowIndex < size; rowIndex++) {
    map.push(Array(size).fill(0))
  }

  return map
}

const getPointsFromInputLine = (inputLine: string): { pointA: number[], pointB: number[] } => {
  const pointStrings = inputLine.split(' -> ')
    .map(pointString => pointString.split(',')
      .map(numString => parseInt(numString)))
  
  return {
    pointA: pointStrings[0],
    pointB: pointStrings[1],
  }
}

const countGreaterThanIn = (map: number[][], greaterThan: number): number => {
  let countOfGreaterThan = 0
  for (let i = 0; i < map.length; i++)
    for (let j = 0; j < map[0].length; j++)
      if (map[i][j] > greaterThan) countOfGreaterThan++
  return countOfGreaterThan
}

const partA = async (input: string[]) => {
  const map = createMap(1000)

  for (let lineInput of input) {
    const { pointA, pointB } = getPointsFromInputLine(lineInput)

    if (pointA[0] == pointB[0])
      // vertical line
      if (pointA[1] < pointB[1])
        // point0 is lower than point1
        for (let i = pointA[1]; i <= pointB[1]; i++)
          map[i][pointA[0]] += 1
      else
        // point1 is lower than point0
        for (let i = pointB[1]; i <= pointA[1]; i++)
          map[i][pointA[0]] += 1
    else if (pointA[1] == pointB[1])
      // horizontal line
      if (pointA[0] < pointB[0])
        // point0 is left of point1
        for (let i = pointA[0]; i <= pointB[0]; i++)
          map[pointA[1]][i] += 1
      else
        // point1 is right of point0
        for (let i = pointB[0]; i <= pointA[0]; i++)
          map[pointA[1]][i] += 1
  }

  return countGreaterThanIn(map, 1);
}

const partB = async (input: string[]) => {

  const map = createMap(1000)

  for (let lineInput of input) {
    const { pointA, pointB } = getPointsFromInputLine(lineInput)
    const diagnonalLength = Math.abs(pointA[0] - pointB[0])

    const isVerticalLeftToRight = pointA[0] == pointB[0] && pointA[1] < pointB[1]
    const isVerticalRightToLeft = pointA[0] == pointB[0] && pointA[1] >= pointB[1]
    const isHorizontalLeftToRight = pointA[1] == pointB[1] && pointA[0] < pointB[0]
    const isHorizontalRightToLeft = pointA[1] == pointB[1] && pointA[0] >= pointB[0]
    const isDiagonalTopLeftToBottomRight = pointA[0] < pointB[0] && pointA[1] < pointB[1]
    const isDiagonalBottomLeftToTopRight = pointA[0] < pointB[0] && pointA[1] > pointB[1]
    const isDiagonalTopRightToBottomLeft = pointA[0] > pointB[0] && pointA[1] < pointB[1]
    const isDiagonalBottomRightToTopLeft = pointA[0] > pointB[0] && pointA[1] > pointB[1]

    if (isVerticalLeftToRight) for (let i = pointA[1]; i <= pointB[1]; i++) map[i][pointA[0]] += 1
    else if (isVerticalRightToLeft) for (let i = pointB[1]; i <= pointA[1]; i++) map[i][pointA[0]] += 1 
    else if (isHorizontalLeftToRight) for (let i = pointA[0]; i <= pointB[0]; i++) map[pointA[1]][i] += 1
    else if (isHorizontalRightToLeft) for (let i = pointB[0]; i <= pointA[0]; i++) map[pointA[1]][i] += 1
    else {
      for (let i = 0; i <= diagnonalLength; i++) {
        if (isDiagonalTopLeftToBottomRight) map[pointA[1] + i][pointA[0] + i] += 1
        else if (isDiagonalBottomLeftToTopRight) map[pointA[1] - i][pointA[0] + i] += 1
        else if (isDiagonalTopRightToBottomLeft) map[pointA[1] + i][pointA[0] - i] += 1
        else if (isDiagonalBottomRightToTopLeft) map[pointA[1] - i][pointA[0] - i] += 1
      }
    }
  } 

  return countGreaterThanIn(map, 1);
}

export default {
  partA,
  partB,
}