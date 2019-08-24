export enum Direction {
  Right,
  Bottom,
  Left,
  Top,
}

export enum Status {
  Black,
  White,
  Visited,
  Invalid,
}

export enum Dimension {
  Row,
  Column,
}

export type Matrix = number[][]
export type Point = [number, number]

export class Bitmap {
  directionsToSearch = [Direction.Right, Direction.Bottom, Direction.Left, Direction.Top]

  constructor(public matrix: Matrix) {}

  getStatus = (position: Point, visitedPoints?: string[]): Status => {
    if (this.matrix[position[0]] === undefined || this.matrix[position[0]][position[1]] === undefined)
      return Status.Invalid
    if (visitedPoints && visitedPoints.includes(position.join(''))) return Status.Visited
    return this.matrix[position[0]][position[1]]
  }

  calculateNewPosition = (currentPosition: Point, direction: Direction): Point => {
    const newPosition: Point = [currentPosition[Dimension.Row], currentPosition[Dimension.Column]]

    if (direction === Direction.Right) {
      newPosition[Dimension.Column]++
    } else if (direction === Direction.Left) {
      newPosition[Dimension.Column]--
    } else if (direction === Direction.Top) {
      newPosition[Dimension.Row]--
    } else if (direction === Direction.Bottom) {
      newPosition[Dimension.Row]++
    }

    return newPosition
  }

  calculateDistance = (currentPoint: Point, visitingPoint: Point): number => {
    return (
      Math.abs(currentPoint[Dimension.Row] - visitingPoint[Dimension.Row]) +
      Math.abs(currentPoint[Dimension.Column] - visitingPoint[Dimension.Column])
    )
  }

  findClosest = (initialPoint: Point): number => {
    const queue: Point[] = [initialPoint]
    let whitePoint: Point | null = null
    const visitedPoints: string[] = [initialPoint.join('')]

    if (this.getStatus(initialPoint) === Status.White) return 0

    while (queue.length > 0) {
      const visitingPoint = queue.shift() || initialPoint

      this.directionsToSearch.some((pickedDirection: Direction): boolean => {
        const movedPoint = this.calculateNewPosition(visitingPoint, pickedDirection)
        const status = this.getStatus(movedPoint, visitedPoints)

        if (status === Status.White) {
          whitePoint = movedPoint
        } else if (status === Status.Black) {
          visitedPoints.push(movedPoint.join(''))
          queue.push(movedPoint)
        }
        return !!whitePoint
      })

      if (whitePoint) break
    }

    return whitePoint ? this.calculateDistance(initialPoint, whitePoint) : Infinity
  }

  // Recursive way
  bfs = (results: Matrix, x: number, y: number, d: number): void => {
    const n = results.length
    const m = results[0].length
    if (x >= 0 && x < n && y >= 0 && y < m && results[x][y] > d) {
      results[x][y] = d
      this.bfs(results, x + 1, y, d + 1)
      this.bfs(results, x - 1, y, d + 1)
      this.bfs(results, x, y + 1, d + 1)
      this.bfs(results, x, y - 1, d + 1)
    }
    return
  }
}

export function calculateRecursive(arr: Matrix): Matrix {
  const arrLength = arr.length
  const arrHeight = arr[0].length

  const resultArray: Matrix = new Array(arr.length)
  for (let index = 0; index < arr.length; index++) {
    const newArr = new Array(arr[0].length)
    newArr.fill(400)
    resultArray[index] = newArr
  }

  const bitmap = new Bitmap(arr)

  for (let i = 0; i < arrLength; i++) {
    for (let j = 0; j < arrHeight; j++) {
      if (bitmap.matrix[i][j] === 1) {
        bitmap.bfs(resultArray, i, j, 0)
      }
    }
  }

  return resultArray
}

// [[0, 0, 0, 1], [0, 0, 1, 1], [0, 1, 1, 0]]
export function calculate(arr: Matrix): Matrix {
  const resultArray: Matrix = new Array(arr.length)
  const bitmap = new Bitmap(arr)

  arr.forEach((row, rowIndex) => {
    const rowResult: number[] = new Array(row.length)

    row.forEach((value, columnIndex) => {
      const position: Point = [rowIndex, columnIndex]
      rowResult[columnIndex] = bitmap.findClosest(position)
    })

    resultArray[rowIndex] = rowResult
  })

  return resultArray
}

// export function stringToMatrix(input: string): Matrix {}
