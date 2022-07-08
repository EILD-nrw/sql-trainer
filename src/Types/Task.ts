export interface Task {
  id: number
  schema: string
  difficulty: 'leicht' | 'mittel' | 'schwer'
  text: string
  solutionQuery: string
  taskType: number
}
