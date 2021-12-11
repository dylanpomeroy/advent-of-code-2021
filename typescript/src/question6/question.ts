const addToOrSetValue = (key: number, value: number, map: { [key: number]: number }) => {
  if (key in map)
    map[key] += value
  else map[key] = value
}

const partA = async (input: string[]) => {
  const fish: number[] = input[0].split(',').map(numString => parseInt(numString))

  for (let day = 0; day < 80; day++) {
    const fishLength = fish.length
    for (let fishIndex = 0; fishIndex < fishLength; fishIndex++) {
      if (fish[fishIndex] == 0) {
        fish.push(8)
        fish[fishIndex] = 6
      } else {
        fish[fishIndex] -= 1
      }
    }
  }

  return fish.length
}

const partB = async (input: string[]) => {
  const fish: number[] = input[0].split(',').map(numString => parseInt(numString))
  let fishMap: { [key: number]: number } = {}
  for (let i = 0; i < fish.length; i++) {
    addToOrSetValue(fish[i], 1, fishMap)
  }


  for (let day = 0; day < 256; day++) {
    const newFishMap: { [key: number]: number} = { }
    
    for (let fishKey of Object.keys(fishMap)) {
      const fishKeyNum = parseInt(fishKey)

      if (fishKeyNum == 0) {
        addToOrSetValue(8, fishMap[fishKeyNum], newFishMap)
        addToOrSetValue(6, fishMap[fishKeyNum], newFishMap)
      } else {
        addToOrSetValue(fishKeyNum-1, fishMap[fishKeyNum], newFishMap)
      }
    }

    fishMap = newFishMap
  }

  let totalFish = 0
  for (let fishKey of Object.keys(fishMap)) {
    totalFish += fishMap[parseInt(fishKey)]
  }
  console.log(totalFish)
  return totalFish
}

export default {
  partA,
  partB,
}