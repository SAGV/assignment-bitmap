import Bitmap from './src/Bitmap'
import { writeToUserInput, stringToMatrix } from './src/Helpers'

/**
 * I've made [a video]() with explanations of why this solution is chosen, how it works and why is it faster than what can be found over the web:
 * https://youtu.be/n8WoFJQkKI8
 **/

// Start reading from input
process.stdin.on('readable', () => {
  let bufferOrStr: Buffer | string
  let str = ''

  // Read file / input or exit if it looks empty
  while ((bufferOrStr = process.stdin.read()) !== null) {
    str += bufferOrStr.toString().replace(/ /g, '')
  }
  if (!str) process.exit()

  const nOfBitmaps = parseInt(str[0])
  if (isNaN(nOfBitmaps)) throw 'N of bitmaps should be a number'

  // Split each string into arrays of matrixes
  const allMatrixes = str.split('\n\n').map((strMatrix, index) => stringToMatrix(strMatrix, index === 0))

  // Make sure that we've received as many bitmaps as was specified
  if (nOfBitmaps !== allMatrixes.length) throw `Expected ${nOfBitmaps} but received ${allMatrixes.length}`
  process.stdout.write(`Total bitmaps: ${nOfBitmaps}\n\n`)

  // Process bitmaps and output each one as soon as it is processed
  allMatrixes.forEach((matrix, index) => {
    process.stdout.write(`Bitmap #${index + 1}\n`)
    const bitmap = new Bitmap(matrix)
    const results = bitmap.getMatrixOfDistances()
    writeToUserInput(results)
    process.stdout.write(`\n`)
  })

  process.stdout.write(`Done!\n`)
})
