const partA = async (input: number[]) => {
  let totalIncreases = 0
  let last = input[0]
  input.forEach(number => {
    if (number > last)
      totalIncreases++
    last = number
  })

  return totalIncreases
}

const partB = async (input: number[]) => {
  let totalIncreases = 0
  let last = input[0] + input[1] + input[2]
  for (let i = 1; i < input.length-1; i++) {
    const sum = input[i-1] + input[i] + input[i+1];
    if (sum > last)
      totalIncreases++
    last = sum
  }

  return totalIncreases
}

export default {
  partA,
  partB,
}