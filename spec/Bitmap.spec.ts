import { assert } from 'chai'

import { Status } from '../src/Enums'
import Bitmap from '../src/Bitmap'
import Pointer from '../src/Pointer'

describe('Bitmap', () => {
  describe('getStatus', () => {
    it('should return invalid status', () => {
      /**
       * 0 1
       * 1 0
       */
      const bitmap = new Bitmap([[0, 1], [1, 0]])
      assert.equal(bitmap.getStatus(new Pointer([-1, -1])), Status.Invalid)
      assert.equal(bitmap.getStatus(new Pointer([-1, 0])), Status.Invalid)
      assert.equal(bitmap.getStatus(new Pointer([0, -1])), Status.Invalid)
      assert.equal(bitmap.getStatus(new Pointer([2, 1])), Status.Invalid)
      assert.equal(bitmap.getStatus(new Pointer([1, 2])), Status.Invalid)
    })

    it('should return visited status', () => {
      /**
       * 0 1
       * 1 0
       */
      const visitedPoints = ['10', '01']
      const bitmap = new Bitmap([[0, 1], [1, 0]])
      assert.notEqual(bitmap.getStatus(new Pointer([0, 0]), visitedPoints), Status.Visited)
      assert.notEqual(bitmap.getStatus(new Pointer([1, 1]), visitedPoints), Status.Visited)
      assert.equal(bitmap.getStatus(new Pointer([1, 0]), visitedPoints), Status.Visited)
      assert.equal(bitmap.getStatus(new Pointer([0, 1]), visitedPoints), Status.Visited)
    })

    it('should return white status', () => {
      /**
       * 0 1 1
       * 1 0 1
       */
      const bitmap = new Bitmap([[0, 1, 1], [1, 0, 1]])
      assert.equal(bitmap.getStatus(new Pointer([0, 1])), Status.White)
      assert.equal(bitmap.getStatus(new Pointer([0, 2])), Status.White)
      assert.equal(bitmap.getStatus(new Pointer([1, 0])), Status.White)
      assert.equal(bitmap.getStatus(new Pointer([1, 2])), Status.White)
    })

    it('should return black status', () => {
      /**
       * 0 1
       * 1 0
       */
      const bitmap = new Bitmap([[0, 1], [1, 0]])
      assert.equal(bitmap.getStatus(new Pointer([0, 0])), Status.Black)
      assert.equal(bitmap.getStatus(new Pointer([1, 1])), Status.Black)
    })
  })

  describe('getMatrixOfDistances', () => {
    it('should return bitmap of white points', () => {
      /**
       * 0001
       * 0011
       * 0110
       */
      const input1 = [[0, 0, 0, 1], [0, 0, 1, 1], [0, 1, 1, 0]]
      const bitmap1 = new Bitmap(input1)
      const result1 = bitmap1.getMatrixOfDistances()
      assert.deepEqual(result1, [[3, 2, 1, 0], [2, 1, 0, 0], [1, 0, 0, 1]])

      /**
       * 0001
       * 0011
       * 0111
       * 0111
       * 1011
       */
      const input2 = [[0, 0, 0, 1], [0, 0, 1, 1], [0, 1, 1, 1], [0, 1, 1, 1], [1, 0, 1, 1]]
      const bitmap2 = new Bitmap(input2)
      const result2 = bitmap2.getMatrixOfDistances()
      assert.deepEqual(result2, [[3, 2, 1, 0], [2, 1, 0, 0], [1, 0, 0, 0], [1, 0, 0, 0], [0, 1, 0, 0]])

      /**
       * 100
       * 001
       * 000
       * 100
       */
      const input3 = [[1, 0, 0], [0, 0, 1], [0, 0, 0], [1, 0, 0]]
      const bitmap3 = new Bitmap(input3)
      const result3 = bitmap3.getMatrixOfDistances()
      assert.deepEqual(result3, [[0, 1, 1], [1, 1, 0], [1, 2, 1], [0, 1, 2]])
    })
  })
})
