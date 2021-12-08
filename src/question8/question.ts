const partA = async (input: string[]) => {
  let totalCount = 0

  for (let inputLine of input) {
    const output = inputLine.split(' | ')[1]
    const outputList = output.split(' ')

    for (let outputItem of outputList) {
      if ([2, 4, 3, 7].includes(outputItem.trim().length)) {
        totalCount++
      }
    }
  }

  return totalCount
}

const partB = async (input: string[]) => {
  /*
  
    0:      1:      2:      3:      4:
    0000    ....    0000    0000    ....
   1    2  .    2  .    2  .    2  1    2
   1    2  .    2  .    2  .    2  1    2
    ....    ....    3333    3333    3333
   4    5  .    5  4    .  .    5  .    5
   4    5  .    5  4    .  .    5  .    5
    6666    ....    6666    6666    ....
   
     5:      6:      7:      8:      9:
    0000    0000    0000    0000    0000
   1    .  1    .  .    2  1    2  1    2
   1    .  1    .  .    2  1    2  1    2
    3333    3333    ....    3333    3333
   .    5  4    5  .    5  4    5  .    5
   .    5  4    5  .    5  4    5  .    5
    6666    6666    ....    6666    6666
  
    */
  let totalResult = 0
  for (let inputLine of input) {
    const wordMap: { [key: string]: number } = {}
    const quadrantMap: { [key: string]: number[] } = {}

    const narrowQuadrants = (encodedChar: string, newRestrictions: number[]) => {
      if (!(encodedChar in quadrantMap))
        quadrantMap[encodedChar] = newRestrictions
      else {
        quadrantMap[encodedChar] = quadrantMap[encodedChar].filter(value => newRestrictions.includes(value))
      }

      if (quadrantMap[encodedChar].length == 1) {
        Object.keys(quadrantMap).forEach(key => {
          if (quadrantMap[key].length > 1) {
            quadrantMap[key] = quadrantMap[key].filter(num => num != quadrantMap[encodedChar][0])
          }
        })
      }
    }

    const allWords = inputLine
      .split(' | ')[0]
      .split(' ')
      .map(word => word.trim().split('').sort().join(''))

    // 1, 7, 4, 8
    const oneWord = allWords.filter(word => word.length == 2)[0] // ab
    wordMap[oneWord] = 1
    for (let char of oneWord)
      narrowQuadrants(char, [2, 5])
    

    const sevenWord = allWords.filter(word => word.length == 3)[0] // dab
    wordMap[sevenWord] = 7
    for (let char of sevenWord)
      narrowQuadrants(char, [0, 2, 5])
    const charNotInOneWord = sevenWord.split('').filter(char => !oneWord.includes(char))[0]
    narrowQuadrants(charNotInOneWord, [0])

    const fourWord = allWords.filter(word => word.length == 4)[0] // eafb 
    wordMap[fourWord] = 4
    for (let char of fourWord)
      narrowQuadrants(char, [ 1, 2, 3, 5 ])
    const charsNotInOneWord = fourWord.split('').filter(char => !oneWord.includes(char))
    for (let char of charsNotInOneWord)
      narrowQuadrants(char, [1, 3])

    const eightWord = allWords.filter(word => word.length == 7)[0] // acedgfb
    wordMap[eightWord] = 8
    for (let char of eightWord)
      narrowQuadrants(char, [0, 1, 2, 3, 4, 5, 6])
    const charsNotIn47 = eightWord.split('').filter(char => !fourWord.includes(char) && !sevenWord.includes(char))
    for (let char of charsNotIn47)
      narrowQuadrants(char, [0, 4, 6])

    // 3
    const threeWord = allWords.filter(word => word.length == 5 && word.includes(oneWord[0]) && word.includes(oneWord[1]))[0]
    wordMap[threeWord] = 3
    for (let char of threeWord)
      narrowQuadrants(char, [0, 2, 3, 5, 6])


    const getEncoded = (quadrant: number): string => {
      const result = Object.keys(quadrantMap)
        .filter(key => quadrantMap[key].length == 1
          && quadrantMap[key][0] == quadrant)

      return result[0]
    }

    const findWord = (filters:{
      length?: number,
      hasQuadrants?: number[],
      excludesQuadrants?: number[]}) => {
      const encodedHasQuadrants = !filters.hasQuadrants ? null
        : filters.hasQuadrants.map(quadrant => getEncoded(quadrant))

      const encodedExcludesQuadrants = !filters.excludesQuadrants ? null
      : filters.excludesQuadrants.map(quadrant => getEncoded(quadrant))

      const foundWords: string[] = []
      for (let word of allWords) {
        if (filters.length && word.length != filters.length)
          continue

        if (!word.split('').every(char => !encodedExcludesQuadrants || !encodedExcludesQuadrants.includes(char)))
          continue

        if (encodedHasQuadrants && !encodedHasQuadrants.every(encodedChar => word.split('').includes(encodedChar)))
          continue
        
        foundWords.push(word)
      }

      return foundWords[0]
    }

    // 0
    const zeroWord = findWord({ length: 6, excludesQuadrants: [3]})
    const quadrantThreeEncodedChar = getEncoded(3)
    wordMap[zeroWord] = 0
    for (let char of zeroWord)
      narrowQuadrants(char, [0, 1, 2, 4, 5, 6])


    // 5
    const quadrantZeroEncodedChar = Object.keys(quadrantMap).filter(key => quadrantMap[key][0] == 0)[0]
    const quadrantOneEncodedChar = Object.keys(quadrantMap).filter(key => quadrantMap[key][0] == 1)[0]
    const fiveWord = allWords.filter(word => word.length == 5 && word.includes(quadrantZeroEncodedChar) && word.includes(quadrantOneEncodedChar) && word.includes(quadrantThreeEncodedChar))[0]

    wordMap[fiveWord] = 5
    for (let char of fiveWord)
      narrowQuadrants(char, [0, 1, 3, 5, 6])


    // 2
    const quadrantTwoEncodedChar = Object.keys(quadrantMap).filter(key => quadrantMap[key][0] == 2)[0]
    const quadrantFourEncodedChar = Object.keys(quadrantMap).filter(key => quadrantMap[key][0] == 4)[0]
    const quadrantSixEncodedChar = Object.keys(quadrantMap).filter(key => quadrantMap[key][0] == 6)[0]
    const twoWord = allWords.filter(word => word.length == 5
      && word.split('').every(char => [
        quadrantZeroEncodedChar,
        quadrantTwoEncodedChar,
        quadrantThreeEncodedChar,
        quadrantFourEncodedChar,
        quadrantSixEncodedChar].includes(char)))[0]
    wordMap[twoWord] = 2

    // 6
    const quadrantFiveEncodedChar = Object.keys(quadrantMap).filter(key => quadrantMap[key][0] == 5)[0]
    const sixWord = allWords.filter(word => word.length == 6
      && word.split('').every(char => [
        quadrantZeroEncodedChar,
        quadrantOneEncodedChar,
        quadrantThreeEncodedChar,
        quadrantFourEncodedChar,
        quadrantFiveEncodedChar,
        quadrantSixEncodedChar
      ].includes(char)))[0]
    wordMap[sixWord] = 6

    // 9
    const nineWord = allWords.filter(word => word.length == 6
      && word.split('').every(char => [
        quadrantZeroEncodedChar,
        quadrantOneEncodedChar,
        quadrantTwoEncodedChar,
        quadrantThreeEncodedChar,
        quadrantFiveEncodedChar,
        quadrantSixEncodedChar
      ].includes(char)))[0]
    wordMap[nineWord] = 9
    

    const outputWords = inputLine
      .split(' | ')[1]
      .split(' ')
      .map(word => word.trim().split('').sort().join(''))

    const lineOutput = wordMap[outputWords[0]] * 1000
      + wordMap[outputWords[1]] * 100
      + wordMap[outputWords[2]] * 10
      + wordMap[outputWords[3]]

    totalResult+= lineOutput

  }

  return totalResult
}


export default {
  partA,
  partB,
}
