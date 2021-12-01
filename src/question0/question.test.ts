import question from './question'
import { expect } from 'chai'
import { getInputNumbers } from '../helpers'

const questionNum = 0

describe(`Question ${questionNum}`, () => {
  it('part A sample 0', async () => {
    const input = await getInputNumbers(questionNum, "sampleInput0")
    expect(await question.partA(input)).to.equal(0)
  })

  it('part B sample 0', async () => {
    const input = await getInputNumbers(questionNum, "sampleInput0")
    expect(await question.partB(input)).to.equal(0)
  })

  it('part A input 0', async () => {
    const input = await getInputNumbers(questionNum, "input")
    expect(await question.partA(input)).to.equal(0)
  })
})
