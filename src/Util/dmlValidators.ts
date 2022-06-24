import { Database } from 'sql.js'
import { Task } from '../Types/Task'
import { ValidationResult } from '../Types/ValidationResult'

export function validateUserInput(
  code: string,
  selectedTask: Task,
  database: Database
): ValidationResult {
  return { isValid: true }
}
