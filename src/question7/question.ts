const partA = async (input: number[]) => {
  let leastFuelAmount = Number.MAX_VALUE
  for (
    let potentialPosition = Math.min(...input);
    potentialPosition <= Math.max(...input);
    potentialPosition++) {

    const requiredFuel = input
      .map(crabPosition => Math.abs(crabPosition - potentialPosition))
      .reduce((a, b) => a + b)

    leastFuelAmount = Math.min(leastFuelAmount, requiredFuel)
  }

  return leastFuelAmount
}

const partB = async (input: number[]) => {
  const getFuelCost = (initialPosition: number, newPosition: number) => {
    const n = Math.abs(initialPosition - newPosition)
    return n*(n+1)/2
  }

  let leastFuelAmount = Number.MAX_VALUE
  for (
    let potentialPosition = Math.min(...input);
    potentialPosition <= Math.max(...input);
    potentialPosition++) {
    
      const requiredFuel = input
      .map(crabPosition => getFuelCost(crabPosition, potentialPosition))
      .reduce((a, b) => a + b)
    
    leastFuelAmount = Math.min(leastFuelAmount, requiredFuel)
  }

  return leastFuelAmount
}

export default {
  partA,
  partB,
}
