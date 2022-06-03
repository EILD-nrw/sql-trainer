import { useEffect, useState } from 'react'
import { Database, QueryExecResult, SqlValue } from 'sql.js'
import { Task } from '../Types/Task'

/*
  Helper Functions
*/

function compareSqlValueLists(x: SqlValue[], y: SqlValue[]) {
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

function compareQueryResults(x: QueryExecResult, y: QueryExecResult) {
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

export function useDQLTrainer(
  selectedTask: Task | undefined,
  database: Database | undefined
) {
  const [isCorrect, setIsCorrect] = useState<boolean | undefined>()
  const [error, setError] = useState('')
  const [queryData, setQueryData] = useState<QueryExecResult[]>([])
  const [solutionTable, setSolutionTable] = useState<QueryExecResult>()

  useEffect(() => {
    setIsCorrect(undefined)
    setError('')
    setQueryData([])
  }, [selectedTask])

  useEffect(() => {
    // Fetch Solution
    if (!database || !selectedTask) return
    try {
      const solution = database.exec(selectedTask.solutionQuery)
      setSolutionTable(solution[0])
    } catch (err: any) {
      // Trainer might try to load data from default schema on page reload which can fail
      if (err?.message?.includes('no such table')) return

      console.error(err)
    }
  }, [selectedTask, database])

  function evaluateQuery(queryResult: QueryExecResult) {
    if (!solutionTable) {
      setIsCorrect(false)
      return
    }

    if (compareQueryResults(queryResult, solutionTable)) {
      setIsCorrect(true)
    } else {
      setIsCorrect(false)
    }
  }

  function executeCode(code: string) {
    if (!database) return

    try {
      const execResults = database.exec(code)

      if (execResults.length === 0) throw Error('No Results!')

      setQueryData(execResults)
      evaluateQuery(execResults[0])
      setError('')
    } catch (err) {
      setError(err as string)
      setQueryData([])
    }
  }

  return {
    solutionTable,
    isCorrect,
    error,
    queryData,
    executeCode
  }
}
