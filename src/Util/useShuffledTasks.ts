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

  function nextTask() {
    setTasks((oldTasks) => {
      if (!oldTasks) return

      const [current, ...remaining] = oldTasks
      return [...remaining, current]
    })
  }

  // Reset task list upon topic, schema or difficulty change
  useEffect(() => {
    if (!topic || !schema || !difficulty) return

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
  }, [topic, schema, difficulty])

  return {
    selectedTask: tasks?.[0],
    nextTask,
  }
}
