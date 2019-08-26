import { Direction } from './Enums'

/*******************************************************************************
 * Pointers are used to navigate in 2-dimensional matrix.
 * To avoid the possible mess, every pointer is immutable.
 *******************************************************************************/
export default class Pointer {
  constructor(readonly position: [number, number]) {}

  get row(): number {
    return this.position[0]
  }
  get column(): number {
    return this.position[1]
  }

  /**
   * Returns a uniq id of each pointer in specific array. Can be used to track whether the point waws already visited or not
   * @returns Unique id as a string
   */
  get uid(): string {
    return this.position.join('')
  }

  /**
   * Returns a new pointer moved 1 point towards the chosen direction
   * @param direction Direction to move. Use direction enum to pass
   * @returns A new pointer moved in the chosen direction
   */
  moveAndReturnNew = (direction: Direction): Pointer => {
    let currentRow = this.row
    let currentColumn = this.column

    if (direction === Direction.Right) {
      currentColumn++
    } else if (direction === Direction.Left) {
      currentColumn--
    } else if (direction === Direction.Top) {
      currentRow--
    } else if (direction === Direction.Bottom) {
      currentRow++
    }

    return new Pointer([currentRow, currentColumn])
  }

  /**
   * Calculates distances between two pointers using d(p1,p2)=|i1-i2|+|j1-j2| formula
   * @param pointer Another pointer to relative to which distance needs to be calculated
   * @returns Distance in points
   */
  distanceTo = (point: Pointer): number => {
    return Math.abs(this.row - point.row) + Math.abs(this.column - point.column)
  }
}
