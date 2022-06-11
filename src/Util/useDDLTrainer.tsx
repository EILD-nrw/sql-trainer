import { useEffect, useState } from 'react'
import { Database } from 'sql.js'
import { Task } from '../Types/Task'

interface TaskInfo {
  queryType: string
  targetType: string
}

function parseSolutionQuery(query: string): TaskInfo {
  const words = query.split(' ')

  return {
    queryType: words?.[0].toLowerCase() || '',
    targetType: words?.[1].toLowerCase() || '',
  }
}

function compareDropQuery(code: string, solutionQuery: string) {
  const preparedCode = code.replace(';', '')
  const preparedSolutionQuery = solutionQuery.replace(';', '')

  return preparedCode === preparedSolutionQuery
}

export function useDDLTrainer(
  selectedTask: Task | undefined,
  database: Database | undefined
) {
  const [isCorrect, setIsCorrect] = useState<boolean>()
  const [error, setError] = useState('')
  const [taskInfo, setTaskInfo] = useState<TaskInfo | undefined>()

  useEffect(() => {
    if (!selectedTask) return

    setTaskInfo(parseSolutionQuery(selectedTask.solutionQuery))
  }, [selectedTask])

  // Check the users code using the solution
  function executeCode(code: string) {
    if (!selectedTask || !taskInfo) {
      setError('Fehler bei der Ausgabenauswahl!')
      return
    }

    if (taskInfo?.queryType === 'drop') {
      if (compareDropQuery(code, selectedTask.solutionQuery)) {
        setIsCorrect(true)
        setError('')
      } else {
        setIsCorrect(false)
      }
    }
  }

  return {
    executeCode,
    isCorrect,
    error,
    renderableOutput: <p>Output</p>,
  }
}
