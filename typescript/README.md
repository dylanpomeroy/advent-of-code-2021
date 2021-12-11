# Advent of Code Solutions 2020

This repo stores my solutions to the questions in [Advent of Code](https://adventofcode.com/).

## Run
After cloning the repo, install dependencies
```
npm install
```

All problems are configured to run on tests. To execute them all, run the 
following
```
npm test
```

## Project Structure
Each day has a new question, and each question has a part A and part B. Inside 
the `src` folder there is a folder for each question, and in each of these 
folders there is:
- `inputs` folder, containing files with test inputs
- `question.ts` containing the solution defintions for part A and B
- `question.test.ts` containing the tests for both parts
