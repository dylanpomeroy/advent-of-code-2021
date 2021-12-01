import fs from 'fs'

export const getInputNumbers = async (questionNum: number, filename: string) => {
  const inputFileContent = await fs.promises.readFile(
    `./src/question${questionNum}/inputs/${filename}`, `utf8`)
  return inputFileContent.split("\n").map(numberString => Number.parseInt(numberString))
}

export const getInputStrings = async (questionNum: number, filename: string) => {
  const inputFileContent = await fs.promises.readFile(
    `./src/question${questionNum}/inputs/${filename}`, `utf8`)
  return inputFileContent.split("\n")
}

export const getInputGrid = async (questionNum: number, filename: string) => {
  return (await getInputStrings(questionNum, filename))
    .map(line => line.split(''))
}

export const sumItems = (items: any[]) => {
  return items.reduce((a, b) => a + b)
}

export const multiplyItems = (items: any[]) => {
  return items.reduce((a, b) => a * b)
}
