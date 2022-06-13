import { Task } from '../Types/Task'

export interface TaskInfo {
  queryType: string
  targetType: string
}

export function getTaskInformation(query: string): TaskInfo {
  const words = query.split(' ')

  return {
    queryType: words?.[0].toLowerCase() || '',
    targetType: words?.[1].toLowerCase() || '',
  }
}

export function validateDrop(
  code: string,
  solutionQuery: string
): { isValid: boolean; feedback?: string } {
  // Remove unnecessary semicolons and capitalization to avoid minor missmatches
  const preparedCode = code.replace(';', '').toLowerCase()
  const preparedSolutionQuery = solutionQuery.replace(';', '').toLowerCase()

  const splitUserCode = preparedCode.split(' ')
  const splitSolutionCode = preparedSolutionQuery.split(' ')

  // Input is sufficiently correct if it fits the pattern "DROP TYPE NAME" and matches the solution in both type and name

  // Must start with "DROP"
  if (splitUserCode[0] !== 'drop')
    return { isValid: false, feedback: 'Eingabe muss mit "DROP" anfangen!' }

  // Must have same TYPE as solution
  if (splitUserCode[1] !== splitSolutionCode[1])
    return {
      isValid: false,
      feedback: `Type-Missmatch! (erwartet: ${splitSolutionCode[1].toUpperCase()})`,
    }

  // Must have same NAME as solution
  if (splitUserCode[2] !== splitSolutionCode[2])
    return {
      isValid: false,
      feedback: `Falscher Name! (erwartet: ${splitSolutionCode[1]})`,
    }

  // Sufficiently correct
  return { isValid: true }
}

function validateRename(
  code: string,
  solutionQuery: string
): { isValid: boolean; feedback?: string } {
  // Remove unnecessary semicolons and capitalization to avoid minor missmatches
  const preparedCode = code.replace(';', '').toLowerCase()
  const preparedSolutionQuery = solutionQuery.replace(';', '').toLowerCase()

  const splitUserCode = preparedCode.split(' ')
  const splitSolutionCode = preparedSolutionQuery.split(' ')

  // Input is sufficiently correct if it fits the pattern "DROP TYPE NAME" and matches the solution in both type and name

  return { isValid: true }
}

export function validateUserInput(
  userQuery: string,
  selectedTask: Task
): { isValid: boolean; feedback?: string } {
  const taskInfo = getTaskInformation(selectedTask.solutionQuery)

  if (taskInfo.queryType === 'create') {
    // TODO
  }

  if (taskInfo.queryType === 'drop') {
    return validateDrop(userQuery, selectedTask.solutionQuery)
  }

  if (taskInfo.queryType === 'alter') {
    // TODO
  }

  if (taskInfo.queryType === 'rename') {
    // TODO
  }

  return {
    isValid: false,
    feedback: 'Validation-Error',
  }
}
