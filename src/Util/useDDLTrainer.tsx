import { useState } from 'react'
import { Database } from 'sql.js'
import { Task } from '../Types/Task'
import { validateUserInput } from './ddlHelper'

export function useDDLTrainer(
  selectedTask: Task | undefined,
  database: Database | undefined
) {
  const [isCorrect, setIsCorrect] = useState<boolean>()
  const [error, setError] = useState('')

  // Check the users code using the solution
  function executeCode(code: string) {
    if (!selectedTask) {
      setError('Fehler bei der Ausgabenauswahl!')
      return
    }

    if (!database) {
      setError('Fehler beim Laden der Datenbank!')
      return
    }

    const validationResult = validateUserInput(code, selectedTask, database)

    if (validationResult.isValid) {
      setIsCorrect(true)
      setError('')
    } else {
      setIsCorrect(false)
      setError(validationResult?.feedback || 'Validation-Error')
    }
  }

  return {
    executeCode,
    isCorrect,
    error,
    renderableOutput: <p>Output</p>,
  }
}
