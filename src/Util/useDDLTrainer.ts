import { Database } from 'sql.js'
import { Task } from '../Types/Task'

export function useDDLTrainer(
  selectedTask: Task | undefined,
  database: Database | undefined
) {
  return {
    executeCode: (code: string) => {},
    isCorrect: undefined,
    error: '',
  }
}
