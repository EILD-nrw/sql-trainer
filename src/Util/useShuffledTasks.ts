import { useEffect, useState } from 'react'
import { ddlTasks } from '../Tasks/DDLTasks'
import { dmlTasks } from '../Tasks/DMLTasks'
import { dqlTasks } from '../Tasks/DQLTasks'
import { Task } from '../Types/Task'

export default function useShuffledTasks(
  topic: string,
  schema: string,
  difficulty: string
) {
  const [tasks, setTasks] = useState<Task[]>()
  const [selectedTask, setSelectedTask] = useState<Task>()

  function nextTask() {
    setSelectedTask(tasks?.[0])
    setTasks((oldTasks) => {
      if (!oldTasks) return

      const [current, ...remaining] = oldTasks
      return [...remaining, current]
    })
  }

  useEffect(() => {
    let topicTasks: Task[] = []
    if (topic === 'ddl') {
      topicTasks = ddlTasks
    } else if (topic === 'dml') {
      topicTasks = dmlTasks
    } else {
      topicTasks = dqlTasks
    }

    const filteredTasks = topicTasks.filter(
      (task) => task.schema === schema && task.difficulty === difficulty
    )
    const shuffledTasks = filteredTasks.sort(() => Math.random() - 0.5)
    setTasks(shuffledTasks)
    nextTask()
  }, [topic, schema, difficulty])

  return {
    selectedTask,
    nextTask,
  }
}
