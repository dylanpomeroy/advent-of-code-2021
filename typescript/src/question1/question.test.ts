import question from './question'
import { expect } from 'chai'
import { getInputNumbers } from '../helpers'

const questionNum = 1

describe(`Question ${questionNum}`, () => {
  it('part A sample 0', async () => {
    const input = await getInputNumbers(questionNum, "sampleInput0")
    expect(await question.partA(input)).to.equal(7)
  })

  it('part B sample 0', async () => {
    const input = await getInputNumbers(questionNum, "sampleInput0")
    expect(await question.partB(input)).to.equal(5)
  })

  it('part A input 0', async () => {
    const input = await getInputNumbers(questionNum, "input")
    expect(await question.partA(input)).to.equal(1215)
  })

  it('part B input 0', async () => {
    const input = await getInputNumbers(questionNum, "input")
    expect(await question.partB(input)).to.equal(1150)
  })
})
