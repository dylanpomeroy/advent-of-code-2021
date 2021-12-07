const partA = async (input: string[]) => {
  const initialCrabPositions = input[0].split(',').map(numStr => parseInt(numStr))

  const maxPos = Math.max(...initialCrabPositions)
  const minPos = Math.min(...initialCrabPositions)

  let leastFuelAmount: number | undefined;
  for (let potentialPosition = minPos; potentialPosition <= maxPos; potentialPosition++) {
    const requiredFuel = initialCrabPositions.map(crabPosition => Math.abs(crabPosition - potentialPosition)).reduce((a, b) => a + b)
    if (!leastFuelAmount || leastFuelAmount > requiredFuel) {
      leastFuelAmount = requiredFuel
    }
  }

  return leastFuelAmount
}

const partB = async (input: string[]) => {
  const initialCrabPositions = input[0].split(',').map(numStr => parseInt(numStr))

  const maxPos = Math.max(...initialCrabPositions)
  const minPos = Math.min(...initialCrabPositions)

  const getFuelCost = (initialPosition: number, newPosition: number) => {
    const n = Math.abs(initialPosition - newPosition)

    return n*(n+1)/2
  }

  let leastFuelAmount: number | undefined;
  for (let potentialPosition = minPos; potentialPosition <= maxPos; potentialPosition++) {
    const requiredFuel = initialCrabPositions.map(crabPosition => getFuelCost(crabPosition, potentialPosition)).reduce((a, b) => a + b)
    if (!leastFuelAmount || leastFuelAmount > requiredFuel) {
      leastFuelAmount = requiredFuel
    }
  }

  return leastFuelAmount
}

export default {
  partA,
  partB,
}
