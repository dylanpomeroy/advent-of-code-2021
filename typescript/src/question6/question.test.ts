import question from './question'
import { expect } from 'chai'
import { getInputStrings } from '../helpers'

const questionNum = 6

describe(`Question ${questionNum}`, () => {
  it('part A sample 0', async () => {
    const input = await getInputStrings(questionNum, "sampleInput0")
    expect(await question.partA(input)).to.equal(5934)
  })

  it('part B sample 0', async () => {
    const input = await getInputStrings(questionNum, "sampleInput0")
    expect(await question.partB(input)).to.equal(26984457539)
  })

  it('part A input 0', async () => {
    const input = await getInputStrings(questionNum, "input")
    expect(await question.partA(input)).to.equal(394994)
  })

  it('part B input 0', async () => {
    const input = await getInputStrings(questionNum, "input")
    expect(await question.partB(input)).to.equal(1765974267455)
  })
})
