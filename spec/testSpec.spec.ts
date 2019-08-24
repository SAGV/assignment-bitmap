import 'mocha' // Importing mocha explicitly gives us types support for it
import { assert } from 'chai'
import { random } from 'lodash'

import { calculate, calculateRecursive, Bitmap, Status, Direction, Matrix } from '../script'

const generateRandomBitmap = (): number[][] => {
  const randomArray: Matrix = []

  for (let rows = random(1, 182); rows > 0; rows--) {
    const row: number[] = []
    for (let columns = random(1, 182); columns > 0; columns--) {
      row.push(random(0, 1))
    }
    randomArray.push(row)
  }

  return randomArray
}

describe('Bitmap', () => {
  describe('getStatus', () => {
    it('should return invalid status', () => {
      // 0 1
      // 1 0
      const bitmap = new Bitmap([[0, 1], [1, 0]])
      assert.equal(bitmap.getStatus([-1, -1]), Status.Invalid)
      assert.equal(bitmap.getStatus([-1, 0]), Status.Invalid)
      assert.equal(bitmap.getStatus([0, -1]), Status.Invalid)
      assert.equal(bitmap.getStatus([2, 1]), Status.Invalid)
      assert.equal(bitmap.getStatus([1, 2]), Status.Invalid)
    })

    it('should return visited status', () => {
      // 0 1
      // 1 0
      const visitedPoints = ['10', '01']
      const bitmap = new Bitmap([[0, 1], [1, 0]])
      assert.notEqual(bitmap.getStatus([0, 0], visitedPoints), Status.Visited)
      assert.notEqual(bitmap.getStatus([1, 1], visitedPoints), Status.Visited)
      assert.equal(bitmap.getStatus([1, 0], visitedPoints), Status.Visited)
      assert.equal(bitmap.getStatus([0, 1], visitedPoints), Status.Visited)
    })

    it('should return white status', () => {
      // 0 1 1
      // 1 0 1
      const bitmap = new Bitmap([[0, 1, 1], [1, 0, 1]])
      assert.equal(bitmap.getStatus([0, 1]), Status.White)
      assert.equal(bitmap.getStatus([0, 2]), Status.White)
      assert.equal(bitmap.getStatus([1, 0]), Status.White)
      assert.equal(bitmap.getStatus([1, 2]), Status.White)
    })

    it('should return black status', () => {
      // 0 1
      // 1 0
      const bitmap = new Bitmap([[0, 1], [1, 0]])
      assert.equal(bitmap.getStatus([0, 0]), Status.Black)
      assert.equal(bitmap.getStatus([1, 1]), Status.Black)
    })
  })

  describe('calculateNewPosition', () => {
    it('should calculate new left position', () => {
      const bitmap = new Bitmap([])
      assert.deepEqual(bitmap.calculateNewPosition([1, 1], Direction.Left), [1, 0])
    })

    it('should calculate new right position', () => {
      const bitmap = new Bitmap([])
      assert.deepEqual(bitmap.calculateNewPosition([1, 1], Direction.Right), [1, 2])
    })

    it('should calculate new top position', () => {
      const bitmap = new Bitmap([])
      assert.deepEqual(bitmap.calculateNewPosition([1, 1], Direction.Top), [0, 1])
    })

    it('should calculate new bottom position', () => {
      const bitmap = new Bitmap([])
      assert.deepEqual(bitmap.calculateNewPosition([1, 1], Direction.Bottom), [2, 1])
    })
  })

  describe('calculateDistance', () => {
    it('should calculate 0 distance', () => {
      const bitmap = new Bitmap([])
      assert.equal(bitmap.calculateDistance([0, 0], [0, 0]), 0)
      assert.equal(bitmap.calculateDistance([1, 0], [1, 0]), 0)
      assert.equal(bitmap.calculateDistance([0, 1], [0, 1]), 0)
      assert.equal(bitmap.calculateDistance([1, 1], [1, 1]), 0)
    })

    it('should calculate row distance', () => {
      const bitmap = new Bitmap([])
      assert.equal(bitmap.calculateDistance([0, 0], [1, 0]), 1)
      assert.equal(bitmap.calculateDistance([1, 0], [0, 0]), 1)
      assert.equal(bitmap.calculateDistance([2, 0], [0, 0]), 2)
      assert.equal(bitmap.calculateDistance([0, 0], [2, 0]), 2)
    })

    it('should calculate column distance', () => {
      const bitmap = new Bitmap([])
      assert.equal(bitmap.calculateDistance([0, 0], [0, 1]), 1)
      assert.equal(bitmap.calculateDistance([0, 1], [0, 0]), 1)
      assert.equal(bitmap.calculateDistance([0, 2], [0, 0]), 2)
      assert.equal(bitmap.calculateDistance([0, 0], [0, 2]), 2)
    })

    it('should calculate combined distance', () => {
      const bitmap = new Bitmap([])
      assert.equal(bitmap.calculateDistance([1, 0], [0, 1]), 2)
      assert.equal(bitmap.calculateDistance([0, 1], [1, 0]), 2)
      assert.equal(bitmap.calculateDistance([0, 2], [2, 0]), 4)
      assert.equal(bitmap.calculateDistance([1, 0], [0, 2]), 3)
    })
  })
})

describe('parseIntoMatrix', () => {
  it('should parse string into matrix', () => {})
})

describe('Calculate', () => {
  it.only('should return bitmap of white points', () => {
    const input = [[0, 0, 0, 1], [0, 0, 1, 1], [0, 1, 1, 0]]

    const result = calculate(input)
    assert.deepEqual(result, [[3, 2, 1, 0], [2, 1, 0, 0], [1, 0, 0, 1]])
  })
})

describe('Calculate recursive', () => {
  it.only('should return bitmap of white points', () => {
    const input = [[0, 0, 0, 1], [0, 0, 1, 1], [0, 1, 1, 0]]

    const result = calculateRecursive(input)
    assert.deepEqual(result, [[3, 2, 1, 0], [2, 1, 0, 0], [1, 0, 0, 1]])
  })
})

describe.skip('cross-checking', () => {
  it('should give same results for me and ricardo', () => {})
})

describe.skip('Performance checking', () => {
  it('should measure how long it takes to parse arrays with my method', () => {
    const amount = 100
    const hrstart = process.hrtime()

    for (let index = 0; index < amount; index++) {
      const input = generateRandomBitmap()
      const output = calculate(input)
    }

    const hrend = process.hrtime(hrstart)
    console.info('Execution time (hr): %ds %dms', hrend[0], hrend[1] / 1000000)
  })

  it.only('should measure how long it takes to parse arrays with chintanghate method', () => {
    const amount = 100
    const hrstart = process.hrtime()

    for (let index = 0; index < amount; index++) {
      const input = generateRandomBitmap()
      const output = calculateRecursive(input)
    }

    const hrend = process.hrtime(hrstart)
    console.info('Execution time (hr): %ds %dms', hrend[0], hrend[1] / 1000000)
  })
})
