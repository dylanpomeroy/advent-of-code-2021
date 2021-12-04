import question from './question'
import { expect } from 'chai'
import { getInputStrings } from '../helpers'

const questionNum = 4

describe(`Question ${questionNum}`, () => {
  it('part A sample 0', async () => {
    const input = await getInputStrings(questionNum, "sampleInput0")
    expect(await question.partA(input)).to.equal(4512)
  })

  it('part B sample 0', async () => {
    const input = await getInputStrings(questionNum, "sampleInput0")
    expect(await question.partB(input)).to.equal(1924)
  })

  it('part A input 0', async () => {
    const input = await getInputStrings(questionNum, "input")
    expect(await question.partA(input)).to.equal(58412)
  })

  it('part B input 0', async () => {
    const input = await getInputStrings(questionNum, "input")
    expect(await question.partB(input)).to.equal(10030)
  })
})
