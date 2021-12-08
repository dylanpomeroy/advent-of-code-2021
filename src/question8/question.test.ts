import question from './question'
import { expect } from 'chai'
import { getInputStrings } from '../helpers'

const questionNum = 8

describe(`Question ${questionNum}`, () => {
  it('part A sample 0', async () => {
    const input = await getInputStrings(questionNum, "sampleInput0")
    expect(await question.partA(input)).to.equal(26)
  })

  it('part B sample 0', async () => {
    const input = await getInputStrings(questionNum, "sampleInput0")
    expect(await question.partB(input)).to.equal(61229)
  })

  it('part A input 0', async () => {
    const input = await getInputStrings(questionNum, "input")
    expect(await question.partA(input)).to.equal(445)
  })

  it('part B input 0', async () => {
    const input = await getInputStrings(questionNum, "input")
    expect(await question.partB(input)).to.equal(1043101)
  })
})
