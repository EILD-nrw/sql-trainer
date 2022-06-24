import { Database, QueryExecResult } from 'sql.js'
import { Task } from '../Types/Task'
import { ValidationResult } from '../Types/ValidationResult'

/*
  PRAGMA TABLE_INFO OUTPUT Example:

  cid	name	type	  notnull	dflt_value	pk
  0	  id	  INTEGER	0		                0
  1	  name	TEXT	  0		                0

  Indexes:
  name  =>   1
  type  =>   2
  notnull => 3
*/

function validateTableInfo(
  solutionTableInfo: QueryExecResult,
  userTableInfo: QueryExecResult,
  compareNotNull: boolean = false,
  comparePrimaryKeys: boolean = false
): ValidationResult {
  const solutionColumnNames = solutionTableInfo.values
    .map((row) => row[1])
    .map((columnName) => String(columnName).toLowerCase())
  const userColumnNames = userTableInfo.values
    .map((row) => row[1])
    .map((columnName) => String(columnName).toLowerCase())

  // Wrong number of columns
  if (solutionColumnNames.length !== userColumnNames.length) {
    return {
      isValid: false,
      feedback: `Die Tabelle hat zu  ${
        solutionColumnNames.length > userColumnNames.length ? 'wenig' : 'viele'
      } Spalten! (Erwartet: ${solutionColumnNames.length} Eingabe: ${
        userColumnNames.length
      })`,
    }
  }

  // Same column names
  const missingColumns = solutionColumnNames.filter(
    (columnName) => !userColumnNames.includes(columnName)
  )
  if (missingColumns.length > 0) {
    return {
      isValid: false,
      feedback: `In der Tabelle fehlen Spalten! (Es fehlen: ${missingColumns
        .map((column) => column.toUpperCase())
        .join(', ')})`,
    }
  }

  // Check NotNull constraints
  if (compareNotNull) {
    const solutionNotNulls = solutionTableInfo.values.map((row) => row[3])
    const userNotNulls = userTableInfo.values.map((row) => row[3])

    if (
      !solutionNotNulls.every(
        (solutionNotNull, index) => solutionNotNull === userNotNulls[index]
      )
    ) {
      return {
        isValid: false,
        feedback: `Not-Null Constraint wurde nicht eingehalten!`,
      }
    }
  }

  // Check Primary Key Constraints
  if (comparePrimaryKeys) {
    const solutionPKs = solutionTableInfo.values.map((row) => row[3])
    const userPKs = userTableInfo.values.map((row) => row[3])

    if (
      !solutionPKs.every((solutionPK, index) => solutionPK === userPKs[index])
    ) {
      return {
        isValid: false,
        feedback: `Primary Key Constraint wurde nicht eingehalten!`,
      }
    }
  }

  // Passed all checks
  return { isValid: true }
}

export function validateCreate(
  code: string,
  solutionQuery: string,
  database: Database
): ValidationResult {
  // Get create type and name ("CREATE TABLE X" -> TYPE: TABLE NAME: X)
  const type = solutionQuery.split(' ')[1].toLowerCase()
  const name = solutionQuery.split(' ')[2].toLowerCase()
  if (type === 'table' || type === 'view') {
    try {
      // Wrap queries in transaction to rollback later
      database.run('BEGIN TRANSACTION;')

      database.run(solutionQuery)
      const solutionResult = database.exec(`PRAGMA TABLE_INFO(${name})`)

      // Rollback solution code
      database.run('ROLLBACK;')
      database.run('BEGIN TRANSACTION;')

      database.run(code)
      const userResult = database.exec(`PRAGMA TABLE_INFO(${name})`)

      // TABLE_INFO returns nothing if there is a typo in the name of the created table
      if (userResult.length === 0) {
        return {
          isValid: false,
          feedback:
            'Tabelle konnte nicht gefunden werden (Tippfehler beim Tabellennamen?)',
        }
      }

      return validateTableInfo(
        solutionResult[0],
        userResult[0],
        solutionQuery.toLowerCase().includes('not null'),
        solutionQuery.toLowerCase().includes('primary key')
      )

      // last rollback in finally block
    } catch (err: any) {
      // Return the error as feedback in case something unexpected fails
      return {
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
  } else if (type === 'index') {
    try {
      // Wrap queries in transaction to rollback later
      database.run('BEGIN TRANSACTION;')

      database.run(solutionQuery)
      const solutionResult = database.exec(`PRAGMA INDEX_INFO(${name})`)
      const solutionColumnNames = solutionResult[0].values
        .map((row) => row[2])
        .map((columnName) => String(columnName).toLowerCase())

      // Rollback solution code
      database.run('ROLLBACK;')
      database.run('BEGIN TRANSACTION;')

      database.run(code)
      const userResult = database.exec(`PRAGMA INDEX_INFO(${name})`)
      if (userResult.length === 0) {
        return {
          isValid: false,
          feedback:
            'Index konnte nicht gefunden werden (Tippfehler beim Tabellennamen?)',
        }
      }
      const userColumnNames = userResult[0].values
        .map((row) => row[2])
        .map((columnName) => String(columnName).toLowerCase())

      if (
        solutionColumnNames.length === userColumnNames.length &&
        solutionColumnNames.every((columnName) =>
          userColumnNames.includes(columnName)
        )
      ) {
        return {
          isValid: true,
        }
      } else {
        return {
          isValid: false,
          feedback:
            'Index stimmt nicht mit Lösung überein! (Gibt es vielleicht einen Tippfehler?)',
        }
      }

      // last rollback in finally block
    } catch (err: any) {
      // Return the error as feedback in case something unexpected fails
      return {
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
  } else {
    throw Error('Unknown task type (Only TABLE, VIEW and INDEX are supported)')
  }
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
      feedback: `Falscher Typ! (erwartet: "${splitSolutionCode[1].toUpperCase()}")`,
    }
  }

  // Must have same NAME as solution
  if (splitUserCode[2] !== splitSolutionCode[2]) {
    return {
      isValid: false,
      feedback: `Falscher Name! (erwartet: "${splitSolutionCode[2]}")`,
    }
  }

  // Sufficiently correct
  return { isValid: true }
}

function validateRename(code: string, solutionQuery: string): ValidationResult {
  // Remove unnecessary semicolons and capitalization to avoid minor missmatches
  const preparedCode = code.replace(';', '').toLowerCase()
  const preparedSolutionQuery = solutionQuery.replace(';', '').toLowerCase()

  const splitUserCode = preparedCode.split(' ')
  const splitSolutionCode = preparedSolutionQuery.split(' ')

  // Input is sufficiently correct if it fits the pattern "ALTER TABLE OLD RENAME TO NEW" and matches the solution in both old and new

  // Has to fit pattern
  if (
    splitUserCode[0] !== 'alter' ||
    splitUserCode[1] !== 'table' ||
    splitUserCode[3] !== 'rename' ||
    splitUserCode[4] !== 'to'
  ) {
    return {
      isValid: false,
      feedback:
        'Eingabe muss dem Schema "ALTER TABLE OLD_NAME RENAME TO NEW_NAME" folgen!',
    }
  }

  // Must match old name
  if (splitUserCode[2] !== splitSolutionCode[2]) {
    return {
      isValid: false,
      feedback: `Falscher alter Name! (erwartet: "${splitSolutionCode[2]}")`,
    }
  }

  // Must match new name
  if (splitUserCode[5] !== splitSolutionCode[5]) {
    return {
      isValid: false,
      feedback: `Falscher neuer Name! (erwartet: "${splitSolutionCode[5]}")`,
    }
  }

  return { isValid: true }
}

function validateAlter(
  code: string,
  solutionQuery: string,
  database: Database
): ValidationResult {
  if (solutionQuery.includes('rename to'))
    return validateRename(code, solutionQuery)
  // Get name of affected table from solutionQuery ("ALTER TABLE X" -> X)
  const affectedTable = solutionQuery.split(' ')[2]

  try {
    // Wrap queries in transaction to rollback later
    database.run('BEGIN TRANSACTION;')

    // Execute solution and save expected result
    database.run(solutionQuery)
    const solutionResult = database.exec(`PRAGMA TABLE_INFO(${affectedTable});`)

    // Rollback solution code
    database.run('ROLLBACK;')
    database.run('BEGIN TRANSACTION;')

    // Execute user code
    database.run(code)
    const userResult = database.exec(`PRAGMA TABLE_INFO(${affectedTable});`)

    return validateTableInfo(
      solutionResult[0],
      userResult[0],
      solutionQuery.toLowerCase().includes('not null'),
      solutionQuery.toLowerCase().includes('primary key')
    )

    // last rollback in finally block
  } catch (err: any) {
    // Return the error as feedback in case something unexpected fails
    return {
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
}

export function validateUserInput(
  userQuery: string,
  selectedTask: Task,
  database: Database
): ValidationResult {
  const queryType =
    selectedTask.solutionQuery.split(' ')?.[0]?.toLowerCase() || ''
  const preparedSolutionQuery = selectedTask.solutionQuery
    .replace(/\s\s+/g, ' ')
    .trim()
    .toLowerCase()

  if (queryType === 'create') {
    return validateCreate(userQuery, preparedSolutionQuery, database)
  }

  if (queryType === 'drop') {
    return validateDrop(userQuery, preparedSolutionQuery)
  }

  if (queryType === 'alter') {
    return validateAlter(userQuery, preparedSolutionQuery, database)
  }

  return {
    isValid: false,
    feedback: 'Validation-Error',
  }
}
