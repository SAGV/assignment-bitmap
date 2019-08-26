import { assert } from 'chai'

import { Direction } from '../src/Enums'
import Pointer from '../src/Pointer'

describe('Pointer', () => {
  describe('calculateNewPosition', () => {
    it('should calculate new left position', () => {
      const pointer = new Pointer([1, 1])
      assert.deepEqual(pointer.moveAndReturnNew(Direction.Left).position, [1, 0])
    })

    it('should calculate new right position', () => {
      const pointer = new Pointer([1, 1])
      assert.deepEqual(pointer.moveAndReturnNew(Direction.Right).position, [1, 2])
    })

    it('should calculate new top position', () => {
      const pointer = new Pointer([1, 1])
      assert.deepEqual(pointer.moveAndReturnNew(Direction.Top).position, [0, 1])
    })

    it('should calculate new bottom position', () => {
      const pointer = new Pointer([1, 1])
      assert.deepEqual(pointer.moveAndReturnNew(Direction.Bottom).position, [2, 1])
    })
  })

  describe('calculateDistance', () => {
    it('should calculate 0 distance', () => {
      const pointer1 = new Pointer([1, 1])
      assert.equal(pointer1.distanceTo(new Pointer([1, 1])), 0)

      const pointer2 = new Pointer([1, 0])
      assert.equal(pointer2.distanceTo(new Pointer([1, 0])), 0)

      const pointer3 = new Pointer([1, 0])
      assert.equal(pointer3.distanceTo(new Pointer([1, 0])), 0)

      const pointer4 = new Pointer([1, 1])
      assert.equal(pointer4.distanceTo(new Pointer([1, 1])), 0)
    })

    it('should calculate row distance', () => {
      const pointer1 = new Pointer([0, 0])
      assert.equal(pointer1.distanceTo(new Pointer([1, 0])), 1)

      const pointer2 = new Pointer([1, 0])
      assert.equal(pointer2.distanceTo(new Pointer([0, 0])), 1)

      const pointer3 = new Pointer([2, 1])
      assert.equal(pointer3.distanceTo(new Pointer([0, 1])), 2)

      const pointer4 = new Pointer([0, 0])
      assert.equal(pointer4.distanceTo(new Pointer([2, 0])), 2)
    })

    it('should calculate column distance', () => {
      const pointer1 = new Pointer([0, 0])
      assert.equal(pointer1.distanceTo(new Pointer([0, 1])), 1)

      const pointer2 = new Pointer([0, 1])
      assert.equal(pointer2.distanceTo(new Pointer([0, 0])), 1)

      const pointer3 = new Pointer([1, 2])
      assert.equal(pointer3.distanceTo(new Pointer([1, 0])), 2)

      const pointer4 = new Pointer([0, 0])
      assert.equal(pointer4.distanceTo(new Pointer([0, 2])), 2)
    })

    it('should calculate combined distance', () => {
      const pointer1 = new Pointer([1, 0])
      assert.equal(pointer1.distanceTo(new Pointer([0, 1])), 2)

      const pointer2 = new Pointer([0, 1])
      assert.equal(pointer2.distanceTo(new Pointer([1, 0])), 2)

      const pointer3 = new Pointer([0, 2])
      assert.equal(pointer3.distanceTo(new Pointer([2, 0])), 4)

      const pointer4 = new Pointer([1, 0])
      assert.equal(pointer4.distanceTo(new Pointer([0, 2])), 3)
    })
  })
})
