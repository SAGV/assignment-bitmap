import { stringToMatrix } from '../src/Helpers'
import { assert } from 'chai'

describe('stringToMatrix', () => {
  it('should convert string to matrix', async () => {
    // Make input slightly "wrong" to fix at least simplest typing mistakes such as extra spaces
    const input = `3 4
       0001
    00 11
    0 1 1 0
`
    const result = stringToMatrix(input)
    assert.deepEqual(result, [[0, 0, 0, 1], [0, 0, 1, 1], [0, 1, 1, 0]])
  })

  it('should get rid of 1st row if asked', async () => {
    const input = `
    1
    3 4
    0001
    0011
    0110
  
    `
    const result = stringToMatrix(input, true)
    assert.deepEqual(result, [[0, 0, 0, 1], [0, 0, 1, 1], [0, 1, 1, 0]])
  })

  it('should throw a error if matrix has wrong amount of columns', async () => {
    const input = `3 4
    000
    0011
    0110`

    try {
      stringToMatrix(input)
      assert.fail()
    } catch (e) {
      assert.equal(e, 'Expected 4 columns but received 3 columns')
    }
  })

  it('should throw a error if matrix has wrong amount of rows', async () => {
    const input = `3 4
    0000
    0011
    `

    try {
      stringToMatrix(input)
      assert.fail()
    } catch (e) {
      assert.equal(e, 'Expected 3 rows but received 2 rows')
    }
  })
})
