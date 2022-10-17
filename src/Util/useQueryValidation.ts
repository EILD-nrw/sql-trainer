import { Database, QueryExecResult } from 'sql.js'
import { Task } from '../Types/Task'
import { useEffect, useState } from 'react'
import { compareQueryResults } from './commonValidationHelper'
import { validateDMLInput } from './dmlValidators'
import { validateDDLInput } from './ddlValidators'

export function useQueryValidation(
  selectedTask: Task | undefined,
  database: Database | undefined,
  selectedTopic: string
) {
  const [isCorrect, setIsCorrect] = useState<boolean | undefined>()
  const [feedback, setFeedback] = useState('')
  const [queryData, setQueryData] = useState<QueryExecResult[]>([])
  const [solutionTable, setSolutionTable] = useState<QueryExecResult>()

  // Reset states when the task changes
  useEffect(() => {
    setIsCorrect(undefined)
    setFeedback('')
    setSolutionTable(undefined)
  }, [selectedTask])

  // Prepare Solution Table for Query Tasks
  useEffect(() => {
    if (!database || !selectedTask || selectedTopic !== 'dql') return

    try {
      const solution = database.exec(selectedTask.solutionQuery)
      setSolutionTable(solution[0])
    } catch (err: any) {
      // Trainer might try to load data from default schema on page reload which can fail
      if (err?.message?.includes('no such table')) return

      console.error(err)
    }
  }, [selectedTask, database])

  // Compares User Query with Solution and sets states accordingly
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
    if (!selectedTask) {
      setFeedback('Fehler bei der Ausgabenauswahl!')
      return
    }

    if (!database) {
      setFeedback('Fehler beim Laden der Datenbank!')
      return
    }

    // Use corresponding helper functions to evaluate user input
    if (selectedTopic === 'dql') {
      try {
        const execResults = database.exec(code)

        if (execResults.length === 0) throw Error('No Results!')

        setQueryData(execResults)
        evaluateQuery(execResults[0])
        setFeedback('')
      } catch (err) {
        setFeedback(err as string)
        setQueryData([])
        setIsCorrect(false)
      }
    } else if (selectedTopic === 'dml') {
      const validationResult = validateDMLInput(code, selectedTask, database)

      if (validationResult.isValid) {
        setIsCorrect(true)
        setFeedback('Die Aufgabe wurde korrekt gelöst!')
      } else {
        setIsCorrect(false)
        setFeedback(validationResult?.feedback || 'Validation-Error')
      }
    } else if (selectedTopic === 'ddl') {
      const validationResult = validateDDLInput(code, selectedTask, database)

      if (validationResult.isValid) {
        setIsCorrect(true)
        setFeedback('Die Aufgabe wurde korrekt gelöst!')
      } else {
        setIsCorrect(false)
        setFeedback(validationResult?.feedback || 'Validation-Error')
      }
    } else {
      setFeedback('Fehler bei der Auswahl des Aufgabentypen!')
    }
  }

  return {
    isCorrect,
    feedback,
    queryData,
    solutionTable,
    executeCode,
  }
}
