import { ddlTasks } from '../Tasks/DDLTasks'
import { dmlTasks } from '../Tasks/DMLTasks'
import { dqlTasks } from '../Tasks/DQLTasks'
import { Task } from '../Types/Task'

export function useDifficultyOptions(topic: string, schema: string) {
  let tasks: Task[]
  if (topic === 'ddl') {
    tasks = ddlTasks
  } else if (topic === 'dml') {
    tasks = dmlTasks
  } else {
    tasks = dqlTasks
  }

  const difficultyList = ['Leicht', 'Mittel', 'Schwer']

  // Filter out difficulties that dont have any tasks for the selected options
  const difficultyOptions = difficultyList.filter((difficultyName) =>
    tasks.some(
      (task) =>
        task.schema === schema &&
        task.difficulty === difficultyName.toLowerCase()
    )
  )

  return difficultyOptions
}
