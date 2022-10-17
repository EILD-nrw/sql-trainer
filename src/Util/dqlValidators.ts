import { QueryExecResult } from 'sql.js'
import { ValidationResult } from '../Types/ValidationResult'
import { compareQueryResults } from './commonValidationHelper'

export function validateDQLInput(
  userQueryData: QueryExecResult,
  solutionQueryData: QueryExecResult
): ValidationResult {
  if (compareQueryResults(userQueryData, solutionQueryData)) {
    return {
      isValid: true
    } 
  } else {
    return {
      isValid: false
    }
  }
}
