import question from './question'
import { expect } from 'chai'
import { getInputStrings } from '../helpers'

const questionNum = 11

describe(`Question ${questionNum}`, () => {
  it('part A sample 0', async () => {
    const input = await getInputStrings(questionNum, "sampleInput0")
    expect(await question.partA(input)).to.equal(1656)
  })

  it('part B sample 0', async () => {
    const input = await getInputStrings(questionNum, "sampleInput0")
    expect(await question.partB(input)).to.equal(195)
  })

  it('part A input 0', async () => {
    const input = await getInputStrings(questionNum, "input")
    expect(await question.partA(input)).to.equal(1632)
  })

  it('part B input 0', async () => {
    const input = await getInputStrings(questionNum, "input")
    expect(await question.partB(input)).to.equal(303)
  })
})
