const partA = async (input: string[]) => {
  const map: number[][] = []
  for (let i = 0; i < 1000; i++) {
    const row = []
    for (let j = 0; j < 1000; j++) {
      row.push(0)
    }
    map.push(row)
  }

  for (let lineInput of input) {
    const point0 = lineInput.split(' -> ')[0].split(',').map(numString => parseInt(numString))
    const point1 = lineInput.split(' -> ')[1].split(',').map(numString => parseInt(numString))

    if (point0[0] == point1[0]) {
      // vertical line
      if (point0[1] < point1[1]) {
        // point0 is lower than point1
        for (let i = point0[1]; i <= point1[1]; i++) {
          map[i][point0[0]] += 1
        }
      } else {
        // point1 is lower than point0
        for (let i = point1[1]; i <= point0[1]; i++) {
          map[i][point0[0]] += 1
        }
      }
    } else if (point0[1] == point1[1]) {
      // horizontal line
      if (point0[0] < point1[0]) {
        // point0 is left of point1
        for (let i = point0[0]; i <= point1[0]; i++) {
          map[point0[1]][i] += 1
        }
      } else {
        // point1 is right of point0
        for (let i = point1[0]; i <= point0[0]; i++) {
          map[point0[1]][i] += 1
        }
      }
    }
  }

  let countOfGreaterThan2 = 0
  for (let i = 0; i < 1000; i++) {
    for (let j = 0; j < 1000; j++) {
      if (map[i][j] > 1) countOfGreaterThan2++
    }
  }

  return countOfGreaterThan2
}

const partB = async (input: string[]) => {
  const mapSize = 1000
  const map: number[][] = []
  for (let i = 0; i < mapSize; i++) {
    const row = []
    for (let j = 0; j < mapSize; j++) {
      row.push(0)
    }
    map.push(row)
  }

  for (let lineInput of input) {
    const point0 = lineInput.split(' -> ')[0].split(',').map(numString => parseInt(numString))
    const point1 = lineInput.split(' -> ')[1].split(',').map(numString => parseInt(numString))

    if (point0[0] == point1[0]) {
      // vertical line
      if (point0[1] < point1[1]) {
        // point0 is lower than point1
        for (let i = point0[1]; i <= point1[1]; i++) {
          map[i][point0[0]] += 1
        }
      } else {
        // point1 is lower than point0
        for (let i = point1[1]; i <= point0[1]; i++) {
          map[i][point0[0]] += 1
        }
      }
    } else if (point0[1] == point1[1]) {
      // horizontal line
      if (point0[0] < point1[0]) {
        // point0 is left of point1
        for (let i = point0[0]; i <= point1[0]; i++) {
          map[point0[1]][i] += 1
        }
      } else {
        // point1 is right of point0
        for (let i = point1[0]; i <= point0[0]; i++) {
          map[point0[1]][i] += 1
        }
      }
    } else if (point0[0] < point1[0] && point0[1] < point1[1]) {
      // top left point0 to bottom right point1
      const length = Math.abs(point0[0] - point1[0])
      for (let i = 0; i <= length; i++) {
        map[point0[1] + i][point0[0] + i] += 1
      }
    } else if (point0[0] < point1[0] && point0[1] > point1[1] ) {
      // bottom left point0 to top right point1
      const length = Math.abs(point0[0] - point1[0])
      for (let i = 0; i <= length; i++) {
        map[point0[1] - i][point0[0] + i] += 1
      }
    } else if (point0[0] > point1[0] && point0[1] < point1[1]) {
      // top right point0 to bottom left point1
      const length = Math.abs(point0[0] - point1[0])
      for (let i = 0; i <= length; i++) {
        map[point0[1] + i][point0[0] - i] += 1
      }
    } else if (point0[0] > point1[0] && point0[1] > point1[1]) {
      // bottom right point0 to top left point1
      const length = Math.abs(point0[0] - point1[0])
      for (let i = 0; i <= length; i++) {
        map[point0[1] - i][point0[0] - i] += 1
      }
    }
  } 

  let countOfGreaterThan2 = 0
  for (let i = 0; i < mapSize; i++) {
    for (let j = 0; j < mapSize; j++) {
      if (map[i][j] > 1) countOfGreaterThan2++
    }
  }

  return countOfGreaterThan2
}

export default {
  partA,
  partB,
}