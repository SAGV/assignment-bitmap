/* These are performance checks where current solution is tested against big chunks of data as well as against other solutions found on the web. By default I'm skipping these tests because it takes a while. However, enable it and see yourself! */

import { random } from 'lodash'

import { Matrix } from '../src/Types'
import Bitmap from '../src/Bitmap'
import { calculateChintanghate } from '../previous-solutions/recursive-way'
import { writeToUserInput } from '../src/Helpers'

const amount = 1000

const generateRandomMatrix = (): number[][] => {
  const randomArray: Matrix = []

  const nOfRows = random(1, 182)
  const nOfColumns = random(1, 182)

  for (let rows = 0; rows <= nOfRows; rows++) {
    const row: number[] = []
    for (let columns = 0; columns <= nOfColumns; columns++) {
      row.push(random(0, 1))
    }
    randomArray.push(row)
  }

  return randomArray
}

describe.skip('Performance checking', () => {
  it('should measure how long it takes to parse arrays with my method', () => {
    const hrstart = process.hrtime()

    for (let index = 0; index < amount; index++) {
      const input = generateRandomMatrix()
      const bitmap = new Bitmap(input)
      bitmap.getMatrixOfDistances()
    }

    const hrend = process.hrtime(hrstart)
    console.info('Execution time: %ds %dms', hrend[0], hrend[1] / 1000000)
  })

  it('should measure how long it takes to parse arrays with chintanghate method', () => {
    const hrstart = process.hrtime()

    for (let index = 0; index < amount; index++) {
      const input = generateRandomMatrix()
      const output = calculateChintanghate(input)
    }

    const hrend = process.hrtime(hrstart)
    console.info('Execution time: %ds %dms', hrend[0], hrend[1] / 1000000)
  })
})
