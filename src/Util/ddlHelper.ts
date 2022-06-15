import { Database } from 'sql.js'
import { Task } from '../Types/Task'

export interface ValidationResult {
  isValid: boolean
  feedback?: string
}

export function validateCreate(
  code: string,
  solutionQuery: string,
  database: Database
): ValidationResult {
  return { isValid: true }
}

export function validateDrop(
  code: string,
  solutionQuery: string
): ValidationResult {
  // Remove unnecessary semicolons and capitalization to avoid minor missmatches
  const preparedCode = code.replace(';', '').toLowerCase()
  const preparedSolutionQuery = solutionQuery.replace(';', '').toLowerCase()

  const splitUserCode = preparedCode.split(' ')
  const splitSolutionCode = preparedSolutionQuery.split(' ')

  // Input is sufficiently correct if it fits the pattern "DROP TYPE NAME" and matches the solution in both type and name

  // Must start with "DROP"
  if (splitUserCode[0] !== 'drop') {
    return { isValid: false, feedback: 'Eingabe muss mit "DROP" beginnen!' }
  }

  // Must have same TYPE as solution
  if (splitUserCode[1] !== splitSolutionCode[1]) {
    return {
      isValid: false,
      feedback: `Type-Missmatch! (erwartet: "${splitSolutionCode[1].toUpperCase()}")`,
    }
  }

  // Must have same NAME as solution
  if (splitUserCode[2] !== splitSolutionCode[2]) {
    return {
      isValid: false,
      feedback: `Falscher Name! (erwartet: "${splitSolutionCode[1]}")`,
    }
  }

  // Sufficiently correct
  return { isValid: true }
}

function validateAlter(
  code: string,
  solutionQuery: string,
  database: Database
): ValidationResult {
  // Prepare validationResult
  let validation: ValidationResult = { isValid: false }

  // Get name of affected table from solutionQuery ("ALTER TABLE X" -> X)
  const affectedTable = solutionQuery.split(' ')[2]

  try {
    // Wrap userquery in transaction to rollback later
    database.run('BEGIN TRANSACTION;')

    // Execute solution and save expected result
    database.run(solutionQuery)
    const solutionResult = database.exec(`PRAGMA TABLE_INFO(${affectedTable});`)
    // table_info returns ['cid', 'name', 'type', 'notnull', 'dflt_value', 'pk'] for each column in the table
    const solutionColumnNames = solutionResult[0].values
      .map((row) => row[1])
      .map((columnName) => String(columnName).toLowerCase())

    // Rollback solution code
    database.run('ROLLBACK;')
    database.run('BEGIN TRANSACTION;')
    // Execute user code
    database.run(code)

    const userResult = database.exec(`PRAGMA TABLE_INFO(${affectedTable});`)
    const userColumnNames = userResult[0].values
      .map((row) => row[1])
      .map((columnName) => String(columnName).toLowerCase())

    // Compares columns after the solution alter to the user code
    // If all columns match the alter was performed sufficiently correct
    if (
      solutionColumnNames.length === userColumnNames.length &&
      solutionColumnNames.every((columnName) =>
        userColumnNames.includes(columnName)
      )
    ) {
      validation = { isValid: true }
    } else {
      validation = {
        isValid: false,
        feedback: 'Tabelle stimmt nicht mit Lösung überein! (Gibt es vielleicht einen Tippfehler?)',
      }
    }
  } catch (err: any) {
    // Return the error as feedback in case something unexpected fails
    validation = {
      isValid: false,
      feedback: err?.message || 'Unknown error',
    }
  } finally {
    // Revert alterations by the user
    try {
      database.run('ROLLBACK;')
    } catch (e) {
      console.log('Rollback failed.')
    }
  }

  return validation
}

function validateRename(code: string, solutionQuery: string): ValidationResult {
  // Remove unnecessary semicolons and capitalization to avoid minor missmatches
  const preparedCode = code.replace(';', '').toLowerCase()
  const preparedSolutionQuery = solutionQuery.replace(';', '').toLowerCase()

  const splitUserCode = preparedCode.split(' ')
  const splitSolutionCode = preparedSolutionQuery.split(' ')

  // Input is sufficiently correct if it fits the pattern "RENAME OLD TO NEW" and matches the solution in both old and new

  // Has to fit "FROM OLD TO NEW" pattern
  if (splitUserCode[0] !== 'rename' || splitSolutionCode[2] !== 'to') {
    return {
      isValid: false,
      feedback: 'Eingabe muss dem Schema "RENAME OLD_NAME TO NEW_NAME" folgen!',
    }
  }

  // Must match old name
  if (splitUserCode[1] !== splitSolutionCode[1]) {
    return {
      isValid: false,
      feedback: `Falscher alter Name! (erwartet: "${splitSolutionCode[1]}"`,
    }
  }

  // Must match new name
  if (splitUserCode[3] !== splitSolutionCode[3]) {
    return {
      isValid: false,
      feedback: `Falscher neuer Name! (erwartet: "${splitSolutionCode[3]}"`,
    }
  }

  return { isValid: true }
}

export function validateUserInput(
  userQuery: string,
  selectedTask: Task,
  database: Database
): ValidationResult {
  const queryType =
    selectedTask.solutionQuery.split(' ')?.[0]?.toLowerCase() || ''

  if (queryType === 'create') {
    return validateCreate(userQuery, selectedTask.solutionQuery, database)
  }

  if (queryType === 'drop') {
    return validateDrop(userQuery, selectedTask.solutionQuery)
  }

  if (queryType === 'alter') {
    return validateAlter(userQuery, selectedTask.solutionQuery, database)
  }

  if (queryType === 'rename') {
    return validateRename(userQuery, selectedTask.solutionQuery)
  }

  return {
    isValid: false,
    feedback: 'Validation-Error',
  }
}
