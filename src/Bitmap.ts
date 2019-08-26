import { Matrix } from './Types'
import { Direction, Status } from './Enums'
import Pointer from './Pointer'

/*******************************************************************************
 * Bitmap represents 2-dimensional array with white/black points.
 *******************************************************************************/
export default class Bitmap {
  private directionsToSearch = [Direction.Right, Direction.Bottom, Direction.Left, Direction.Top]

  constructor(public matrix: Matrix) {}

  /**
   * Gets a status of pixel on the position.
   * @param position A pointer to position to the matrix
   * @param [visitedPoints] An optional array of ids with already visited points
   * @returns Status status enum. Can be Invalid, (already) Visited, White or Black.
   */
  getStatus = (position: Pointer, visitedPoints?: string[]): Status => {
    if (this.matrix[position.row] === undefined || this.matrix[position.row][position.column] === undefined)
      return Status.Invalid
    if (visitedPoints && visitedPoints.includes(position.uid)) return Status.Visited

    // Since enums in typescript are internally numbers, `0` would equal to Status.Black and `1` to Status.White
    return this.matrix[position.row][position.column]
  }

  /**
   * Uses breadth first search algorithm to find the closest white pixel
   * @param blackPixelPosition A pointer to the black pixel
   * @returns number a Distance to the closest white pixel or Infinity if Bitmap has no white pixels at all
   */
  findClosestWithBfs = (blackPixelPosition: Pointer): number => {
    const queue: Pointer[] = [blackPixelPosition]
    let whitePixelPosition: Pointer | null = null
    const visitedPoints: string[] = [blackPixelPosition.uid]

    // If black pixel is actually white, return zero distance right away
    if (this.getStatus(blackPixelPosition) === Status.White) return 0

    while (queue.length > 0) {
      const initialPosition = queue.shift() || blackPixelPosition

      // Iterate through four possible directions and check pixels there
      this.directionsToSearch.some((pickedDirection: Direction): boolean => {
        const shiftedPosition = initialPosition.moveAndReturnNew(pickedDirection)
        const status = this.getStatus(shiftedPosition, visitedPoints)

        // In case of white, save it and stop iterating
        if (status === Status.White) {
          whitePixelPosition = shiftedPosition
          // In case of black, add it to "visited" and add to "to be checked next"
        } else if (status === Status.Black) {
          visitedPoints.push(shiftedPosition.uid)
          queue.push(shiftedPosition)
        }
        // In case of Invalid/Visited, simply do nothing

        // Stop iterating through directions if white pixel is found
        return !!whitePixelPosition
      })

      // Stop iterating through the matrix if white pixel is found
      if (whitePixelPosition) break
    }

    return whitePixelPosition ? whitePixelPosition.distanceTo(blackPixelPosition) : Infinity
  }

  /**
   * Returns a matrix of distances between white pixels for each pixel in the bitmap
   * @returns Matrix a two-dimensional array of distances
   */
  getMatrixOfDistances = (): Matrix => {
    const resultArray: Matrix = new Array(this.matrix.length)

    this.matrix.forEach((row, rowIndex) => {
      const rowResult: number[] = new Array(row.length)

      row.forEach((value, columnIndex) => {
        const position = new Pointer([rowIndex, columnIndex])
        rowResult[columnIndex] = this.findClosestWithBfs(position)
      })

      resultArray[rowIndex] = rowResult
    })

    return resultArray
  }
}
