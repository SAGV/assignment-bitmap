import { Matrix } from './Types'

/**
 * Converts a string with newlines to a matrix
 * @param string String with the dots
 * @param [ignoreFirstRow] If true, then first row will be removed
 * @returns Matrix a matrix (2-dim array) with dots
 */
export const stringToMatrix = (str: string, ignoreFirstRow = false): Matrix => {
  // Also remove all spaces
  const stringSplitByRows = str
    .replace(/ /g, '')
    .split('\n')
    .filter(r => r.length)

  // Remove width & height line since it is not used in the code. Also remove n of bitmaps if the array is first
  if (ignoreFirstRow) stringSplitByRows.shift()
  const heightAndWidth = stringSplitByRows.shift() || '00'
  const height = parseInt(heightAndWidth[0])
  const width = parseInt(heightAndWidth[1])

  // Parse into numbers and filter empty rows
  const matrix: Matrix = stringSplitByRows.map(row => {
    const processedRow = row
      .split('')
      .filter(row => row.length)
      .map(n => parseInt(n))
    if (processedRow.length !== width) throw `Expected ${width} columns but received ${row.length} columns`
    return processedRow
  })

  if (matrix.length !== height) throw `Expected ${height} rows but received ${matrix.length} rows`

  return matrix
}

export const writeToUserInput = (result: Matrix): void => {
  result.forEach(row => {
    process.stdout.write(row.join(' '))
    process.stdout.write(`\n`)
  })
}
