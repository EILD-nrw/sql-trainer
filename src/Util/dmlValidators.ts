import { Database, QueryExecResult } from 'sql.js'
import { Task } from '../Types/Task'
import { ValidationResult } from '../Types/ValidationResult'

function compareTableData(
  solutionTableData: QueryExecResult,
  userTableData: QueryExecResult
): ValidationResult {
  // Must have the same number of rows
  if (solutionTableData.values.length !== userTableData.values.length) {
    return {
      isValid: false,
      feedback: `Anzahl der Zeilen stimmt nicht mit Lösung überein! (Lösung: ${solutionTableData.values.length}, Nutzer: ${userTableData.values.length})`,
    }
  }

  // For every row of the solution table ...
  for (const solutionRow of solutionTableData.values) {
    if (
      // must exist a row in the user table ...
      !userTableData.values.some((userRow) =>
        // that shares all values (in any order)
        solutionRow.every((value) => userRow.includes(value))
      )
    ) {
      // if not, return missing column
      const missingRow = solutionRow
        .map((entry, index) => `${solutionTableData.columns[index]}: ${entry}`)
        .join(',   ')

      return {
        isValid: false,
        feedback: `Mindestens eine Zeile ist falsch! \n\n(Erste fehlende Zeile: ( ${missingRow} )`,
      }
    }
  }

  // Passed all tests -> valid
  return { isValid: true }
}

export function validateDMLInput(
  code: string,
  selectedTask: Task,
  database: Database
): ValidationResult {
  const splitSolutionQuery = selectedTask.solutionQuery
    .split(' ')
    .map((word) => word.toLowerCase())

  // insert, update or delete
  const type = splitSolutionQuery[0]

  // Extract TableName from solutionQuery
  const tableName =
    type === 'update'
      ? splitSolutionQuery[1] // 'UPDATE X' -> TableName in SECOND position
      : splitSolutionQuery[2] // 'INSERT INTO X' or 'DELETE FROM X' -> TableName in THIRD position

  try {
    // Wrap queries in transaction to rollback later
    database.run('BEGIN TRANSACTION;')

    // Get solution table
    database.run(selectedTask.solutionQuery)
    const solutionResult = database.exec(`SELECT * FROM ${tableName}`)

    // Rollback solution and begin user transaction
    database.run('ROLLBACK;')
    database.run('BEGIN TRANSACTION;')

    // Get user table
    database.run(code)
    const userResult = database.exec(`SELECT * FROM ${tableName}`)

    // Evaluate query data
    return compareTableData(solutionResult[0], userResult[0])
  } catch (err: any) {
    return {
      isValid: false,
      feedback: err?.message || 'Unknown error',
    }
  } finally {
    // Always revert any alterations by the user
    try {
      database.run('ROLLBACK;')
    } catch (e) {
      console.log('Rollback failed.')
    }
  }
}
