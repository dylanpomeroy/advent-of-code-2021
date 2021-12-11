const partA = async (input: string[]) => {
  const grid = input.map(inputLine => inputLine.split('').map(char => parseInt(char)).filter(char => !isNaN(char)))

  let totalFlashes = 0
  for (let step = 0; step < 100; step++) {
    for (let row = 0; row < grid.length; row++) {
      for (let column = 0; column < grid[0].length; column++) {
        grid[row][column] += 1
      }
    }

    let iterations = 0
    const memoizedFlashes: {[key: string]: boolean} = {}
    let hadAFlash = true
    while (hadAFlash) {
      hadAFlash = false
      for (let row = 0; row < grid.length; row++) {
        for (let column = 0; column < grid[0].length; column++) {
          iterations++
          if (iterations > 10000) throw 'iterated too many times'
          console.log(`Position: ${row}, ${column}. Iterations: ${iterations}`)
          
          if (grid[row][column] > 9 && !(`${row}-${column}` in memoizedFlashes)) {
            hadAFlash = true
            memoizedFlashes[`${row}-${column}`] = true
            grid[row][column] = 0
            if (row-1 >= 0 && !(`${row-1}-${column}` in memoizedFlashes))
              grid[row-1][column] += 1
            if (row+1 < grid.length && !(`${row+1}-${column}` in memoizedFlashes))
              grid[row+1][column] += 1
            if (column-1 >= 0 && !(`${row}-${column-1}` in memoizedFlashes))
              grid[row][column-1] += 1
            if (column+1 < grid[row].length && !(`${row}-${column+1}` in memoizedFlashes))
              grid[row][column+1] += 1
            if (row-1 >= 0 && column-1 >= 0 && !(`${row-1}-${column-1}` in memoizedFlashes))
              grid[row-1][column-1] += 1
            if (row+1 < grid.length && column-1 >= 0 && !(`${row+1}-${column-1}` in memoizedFlashes))
              grid[row+1][column-1] += 1
            if (row-1 >= 0 && column+1 < grid[row].length && !(`${row-1}-${column+1}` in memoizedFlashes))
              grid[row-1][column+1] += 1
            if (row+1 < grid.length && column+1 < grid[row].length && !(`${row+1}-${column+1}` in memoizedFlashes))
              grid[row+1][column+1] += 1
          }
        }
      }
    }
    

    totalFlashes += Object.keys(memoizedFlashes).length
  }

  return totalFlashes
}

const partB = async (input: string[]) => {
  const grid = input.map(inputLine => inputLine.split('').map(char => parseInt(char)).filter(char => !isNaN(char)))

  for (let step = 0; step < 500; step++) {

    for (let row = 0; row < grid.length; row++) {
      for (let column = 0; column < grid[0].length; column++) {
        grid[row][column] += 1
      }
    }

    let iterations = 0
    const memoizedFlashes: {[key: string]: boolean} = {}
    let hadAFlash = true
    while (hadAFlash) {
      hadAFlash = false
      for (let row = 0; row < grid.length; row++) {
        for (let column = 0; column < grid[0].length; column++) {
          iterations++
          if (iterations > 10000) throw 'iterated too many times'
          console.log(`Position: ${row}, ${column}. Iterations: ${iterations}`)
          
          if (grid[row][column] > 9 && !(`${row}-${column}` in memoizedFlashes)) {
            hadAFlash = true
            memoizedFlashes[`${row}-${column}`] = true
            grid[row][column] = 0
            if (row-1 >= 0 && !(`${row-1}-${column}` in memoizedFlashes))
              grid[row-1][column] += 1
            if (row+1 < grid.length && !(`${row+1}-${column}` in memoizedFlashes))
              grid[row+1][column] += 1
            if (column-1 >= 0 && !(`${row}-${column-1}` in memoizedFlashes))
              grid[row][column-1] += 1
            if (column+1 < grid[row].length && !(`${row}-${column+1}` in memoizedFlashes))
              grid[row][column+1] += 1
            if (row-1 >= 0 && column-1 >= 0 && !(`${row-1}-${column-1}` in memoizedFlashes))
              grid[row-1][column-1] += 1
            if (row+1 < grid.length && column-1 >= 0 && !(`${row+1}-${column-1}` in memoizedFlashes))
              grid[row+1][column-1] += 1
            if (row-1 >= 0 && column+1 < grid[row].length && !(`${row-1}-${column+1}` in memoizedFlashes))
              grid[row-1][column+1] += 1
            if (row+1 < grid.length && column+1 < grid[row].length && !(`${row+1}-${column+1}` in memoizedFlashes))
              grid[row+1][column+1] += 1
          }
        }
      }
    }
    
    if (Object.keys(memoizedFlashes).length == grid.length * grid[0].length) {
      return step + 1
    }
  }

  return null
}

export default {
  partA,
  partB,
}