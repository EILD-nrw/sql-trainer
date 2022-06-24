import { useEffect, useState } from 'react'
import { Database } from 'sql.js'
import { Task } from '../Types/Task'
import { validateUserInput } from './dmlValidators'

export function useDMLTrainer(
  selectedTask: Task | undefined,
  database: Database | undefined
) {
  const [isCorrect, setIsCorrect] = useState<boolean>()
  const [feedback, setFeedback] = useState('')

  useEffect(() => {
    setIsCorrect(undefined)
    setFeedback('')
  }, [selectedTask])

  function executeCode(code: string) {
    if (!selectedTask) {
      setFeedback('Fehler bei der Ausgabenauswahl!')
      return
    }

    if (!database) {
      setFeedback('Fehler beim Laden der Datenbank!')
      return
    }

    const validationResult = validateUserInput(code, selectedTask, database)

    if (validationResult.isValid) {
      setIsCorrect(true)
      setFeedback('Die Aufgabe wurde korrekt gelöst!')
    } else {
      setIsCorrect(false)
      setFeedback(validationResult?.feedback || 'Validation-Error')
    }
  }

  return {
    executeCode,
    isCorrect,
    feedback,
  }
}
