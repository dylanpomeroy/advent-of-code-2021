const partA = async (input: string[]) => {
  const grid = input.map(line => line.split('').map(value => parseInt(value)).filter(value => !isNaN(value)))

  const lowPoints: number[] = []
  const lowPointIndices: number[][] = []
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      let adjacentHeights: number[] = []
      const positionHeight = grid[i][j]
      
      try {
        adjacentHeights.push(grid[i-1][j])
      } catch (e) {}
      try {
        adjacentHeights.push(grid[i+1][j])
      } catch (e) {}
      try {
        adjacentHeights.push(grid[i][j-1])
      } catch (e) {}
      try {
        adjacentHeights.push(grid[i][j+1])
      } catch (e) {}

      adjacentHeights = adjacentHeights.filter(height => !isNaN(height))

      if (Math.min(...adjacentHeights) > positionHeight) {
        lowPoints.push(positionHeight)
        lowPointIndices.push([i, j])
      }
    }
  }

  let totalRisk = 0
  lowPoints.forEach(lowPoint => {
    totalRisk += (lowPoint + 1)
  })

  return totalRisk
}

const partB = async (input: string[]) => {
  const grid = input.map(line => line.split('').map(value => parseInt(value)).filter(value => !isNaN(value)))

  const lowPoints: number[] = []
  const lowPointIndices: number[][] = []
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      let adjacentHeights: number[] = []
      const positionHeight = grid[i][j]
      
      try {
        adjacentHeights.push(grid[i-1][j])
      } catch (e) {}
      try {
        adjacentHeights.push(grid[i+1][j])
      } catch (e) {}
      try {
        adjacentHeights.push(grid[i][j-1])
      } catch (e) {}
      try {
        adjacentHeights.push(grid[i][j+1])
      } catch (e) {}

      adjacentHeights = adjacentHeights.filter(height => !isNaN(height))

      if (Math.min(...adjacentHeights) > positionHeight) {
        lowPoints.push(positionHeight)
        lowPointIndices.push([i, j])
      }
    }
  }


  const basinSizes: number[] = []
  lowPointIndices.forEach(lowPoint => {
    const indicesInBasin: {[key: string]: boolean} = {}

    const countBasinSpaces = (point: number[]) => {
      try {
        console.log(`checking point ${point}`)
        if (grid[point[0]][point[1]] == 9)
          return

        indicesInBasin[point.join('')] = true
        const topPoint = [point[0]+1, point[1]]
        if (point[0] + 1 < grid.length && !(topPoint.join('') in indicesInBasin))
          countBasinSpaces(topPoint)

        const bottomPoint = [point[0]-1, point[1]]
        if (point[0] - 1 >= 0 && !(bottomPoint.join('') in indicesInBasin))
          countBasinSpaces([point[0]-1, point[1]])

        const rightPoint = [point[0], point[1]+1]
        if (point[1] + 1 < grid[0].length && !(rightPoint.join('') in indicesInBasin))
          countBasinSpaces([point[0], point[1]+1])

        const leftPoint = [point[0], point[1]-1]
        if (point[1] - 1 >= 0 && !(leftPoint.join('') in indicesInBasin))
          countBasinSpaces([point[0], point[1]-1])
      } catch (e) {}
    }

    countBasinSpaces(lowPoint)

    basinSizes.push(Object.keys(indicesInBasin).length)
  })

  basinSizes.sort((a, b) => a - b)
  basinSizes.reverse()

  return basinSizes[0] * basinSizes[1] * basinSizes[2]
}

export default {
  partA,
  partB,
}