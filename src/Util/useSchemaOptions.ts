import { ddlTasks } from '../Tasks/DDLTasks'
import { dmlTasks } from '../Tasks/DMLTasks'
import { dqlTasks } from '../Tasks/DQLTasks'
import { Task } from '../Types/Task'

export const SCHEMA_OPTIONS = ['Busse', 'Fahrrad', 'Theater', 'Reisen', 'Fussball']

export function useSchemaOptions(topic: string) {
  let tasks: Task[]
  if (topic === 'ddl') {
    tasks = ddlTasks
  } else if (topic === 'dml') {
    tasks = dmlTasks
  } else {
    tasks = dqlTasks
  }

  const schemaOptions = SCHEMA_OPTIONS.filter((schemaName) =>
    tasks.some((task) => task.schema === schemaName.toLowerCase())
  )

  return schemaOptions
}
