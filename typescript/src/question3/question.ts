const partA = async (input: string[]) => {
  const counts = []

  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
      if (input[i][j] == '0') {
        if (counts.length <= j) {
          counts.push(-1)
        } else {
          counts[j] -= 1
        }
      } else if (input[i][j] == '1') {
        if (counts.length <= j) {
          counts.push(1)
        } else {
          counts[j] += 1
        }
      }
    }
  }

  let gammaString = ''
  let epsilonString = ''
  for (let i = 0; i < counts.length; i++) {
    if (counts[i] >= 0) {
      gammaString += '1'
      epsilonString += '0'
    } else {
      gammaString += '0'
      epsilonString += '1'
    }
  }

  const result = parseInt(gammaString, 2) * parseInt(epsilonString, 2)
  return result
}

const partB = async (input: string[]) => {
  const getCounts = (candidates: string[]) => {
    const counts = []
    for (let i = 0; i < candidates.length; i++) {
      for (let j = 0; j < candidates[i].length; j++) {
        if (candidates[i][j] == '0') {
          if (counts.length <= j) {
            counts.push(-1)
          } else {
            counts[j] -= 1
          }
        } else if (candidates[i][j] == '1') {
          if (counts.length <= j) {
            counts.push(1)
          } else {
            counts[j] += 1
          }
        }
      }
    }

    return counts
  }

  let oxygenCounts = getCounts(input);

  let oxygenCandidates = [...input]
  for (let columnIndex = 0; columnIndex < oxygenCandidates[0].length && oxygenCandidates.length > 1; columnIndex++) {
    for (let candidateIndex = 0; candidateIndex < oxygenCandidates.length; candidateIndex++) {
      let char = oxygenCandidates[candidateIndex][columnIndex]
      if ((char == '0' && oxygenCounts[columnIndex] >= 0)
        || (char == '1' && oxygenCounts[columnIndex] < 0)) {
        oxygenCandidates.splice(candidateIndex, 1)
        candidateIndex--
      }
    }
    oxygenCounts = getCounts(oxygenCandidates)
  }

  let co2Counts = getCounts(input);

  let co2Candidates = [...input]
  for (let columnIndex = 0; columnIndex < co2Candidates[0].length && co2Candidates.length > 1; columnIndex++) {
    for (let candidateIndex = 0; candidateIndex < co2Candidates.length; candidateIndex++) {
      let char = co2Candidates[candidateIndex][columnIndex]
      if ((char == '1' && co2Counts[columnIndex] >= 0)
        || (char == '0' && co2Counts[columnIndex] < 0)) {
        co2Candidates.splice(candidateIndex, 1)
        candidateIndex--
      }
    }
    co2Counts = getCounts(co2Candidates)
  }

  return parseInt(oxygenCandidates[0], 2) * parseInt(co2Candidates[0], 2);
}

export default {
  partA,
  partB,
}