const partA = async (input: string[]) => {
  let positionX = 0
  let positionY = 0

  for (let i = 0; i < input.length; i++) {
    const amount = parseInt(input[i].split(' ')[1])
    if (input[i].startsWith('forward')) {
      positionX += amount
    } else if (input[i].startsWith('down')) {
      positionY += amount
    } else if (input[i].startsWith('up')) {
      positionY -= amount
    }
  }

  return positionX * positionY
}

const partB = async (input: string[]) => {
  let positionX = 0
  let positionY = 0
  let aim = 0

  for (let i = 0; i < input.length; i++) {
    const amount = parseInt(input[i].split(' ')[1])
    if (input[i].startsWith('forward')) {
      positionX += amount
      positionY += aim * amount
    } else if (input[i].startsWith('down')) {
      aim += amount
    } else if (input[i].startsWith('up')) {
      aim -= amount
    }
  }

  return positionX * positionY
}

export default {
  partA,
  partB,
}