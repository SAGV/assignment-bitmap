import 'mocha' // Importing mocha explicitly gives us types support for it
import { assert } from 'chai'

import { calculate } from '../previous-solutions/ricardo'
// import { heatMaps } from '../previous-solutions/jamup'

const testString = `3
3 4
0001
0011
0110

5 4
0001
0011
0111
0111
1011

4 3 
100
001
000
100
`

const expectedResult = `3 2 1 0 
2 1 0 0 
1 0 0 1 

3 2 1 0 
2 1 0 0 
1 0 0 0 
1 0 0 0 
0 1 0 0 

0 1 1 
1 1 0 
1 2 1 
0 1 2 

`

describe('Testing ricardo solution', () => {
  it('should make sure ricardo solution works', async () => {
    const result = calculate(testString)
    assert.equal(result, expectedResult)
  })
})

// describe('Testing jamup solution', () => {
//   it('should make sure ricardo solution works', async () => {
//     const result = heatMaps(testString)
//     // assert.equal(result, expectedResult)
//   })
// })
