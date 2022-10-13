import { QueryExecResult, SqlValue } from 'sql.js'

export function compareSqlValueLists(x: SqlValue[], y: SqlValue[]) {
  // Lists need to have equal lengths
  if (x.length !== y.length) return false

  // Strings get transformed to lowercase
  const preparedX = x.map((value) => {
    return typeof value === 'string' ? value.toLowerCase() : value
  })
  const preparedY = y.map((value) => {
    return typeof value === 'string' ? value.toLowerCase() : value
  })

  const sortedX = preparedX.sort()
  const sortedY = preparedY.sort()

  return sortedX.every((entry, index) => entry === sortedY[index])
}

function columnNamesAreEqual(columnsX: string[], columnsY: string[]): boolean {
  if (columnsX.length !== columnsY.length) return false

  const preparedX = columnsX.map((column) => column.toLowerCase())
  const preparedY = columnsY.map((column) => column.toLowerCase())

  const sortedX = preparedX.sort()
  const sortedY = preparedY.sort()

  return sortedX.every(
    (entry, index) =>
      entry === sortedY[index] ||
      ['avg', 'count', 'max', 'sum'].some(
        (aggregator) =>
          entry.includes(aggregator) && sortedY[index].includes(aggregator)
      )
  )
}

function findCorrespondingIndex(
  columnName: string,
  columnList: string[]
): number {
  columnName = columnName.toLowerCase()
  columnList = columnList.map((column) => column.toLowerCase())

  return columnList.findIndex(
    (column) =>
      column === columnName ||
      ['avg', 'count', 'max', 'sum'].some(
        (aggregator) =>
          columnName.includes(aggregator) && column.includes(aggregator)
      )
  )
}

export function compareQueryResults(x: QueryExecResult, y: QueryExecResult) {
  // Check Column-names
  if (!columnNamesAreEqual(x.columns, y.columns)) return false

  // Check entries columnwise
  for (const column of x.columns) {
    const columnIndexX = findCorrespondingIndex(column, x.columns)
    const columnIndexY = findCorrespondingIndex(column, y.columns)

    const columnEntriesX = x.values.map((line) => line[columnIndexX])
    const columnEntriesY = y.values.map((line) => line[columnIndexY])

    // Compare Column-values
    if (!compareSqlValueLists(columnEntriesX, columnEntriesY)) return false
  }

  return true
}
