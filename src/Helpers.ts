import { Matrix } from './Types'

/**
 * Converts a string with newlines to a matrix
 * @param string String with the dots
 * @param [ignoreFirstRow] If true, then first row will be removed
 * @returns Matrix a matrix (2-dim array) with dots
 */
export const stringToMatrix = (str: string, ignoreFirstRow = false): Matrix => {
  // Also remove all spaces
  const stringSplitByRows = str.split('\n').filter(r => r.length)

  // Remove width & height line since it is not used in the code. Also remove n of bitmaps if the array is first
  if (ignoreFirstRow) stringSplitByRows.shift()
  const heightAndWidth = (stringSplitByRows.shift() || '0 0').split(' ').filter(r => r.length)
  const height = parseInt(heightAndWidth[0])
  if (isNaN(height) || height > 182 || height < 1)
    throw `Bitmap height should be between 1 and 182, actual is ${height}`
  const width = parseInt(heightAndWidth[1])
  if (isNaN(width) || width > 182 || width < 1) throw `Bitmap width should be between 1 and 182, actual is ${width}`

  // Parse into numbers and filter empty rows
  const matrix: Matrix = stringSplitByRows
    .map(row => {
      const processedRow = row
        .replace(/ /g, '')
        .split('')
        .filter(row => row.length)
        .map(n => parseInt(n))
      if (processedRow.length && processedRow.length !== width)
        throw `Expected ${width} columns but received ${processedRow.length} columns`
      return processedRow
    })
    .filter(r => r.length)

  if (matrix.length !== height) throw `Expected ${height} rows but received ${matrix.length} rows`

  return matrix
}

export const writeToUserInput = (result: Matrix): void => {
  result.forEach(row => {
    process.stdout.write(row.join(' '))
    process.stdout.write(`\n`)
  })
}
