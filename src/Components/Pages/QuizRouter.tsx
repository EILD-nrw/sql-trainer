import React, { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import SelectionPage from './SelectionPage'
import TaskPage from './TaskPage'

export default function QuizRouter () {
  const [schema, setSchema] = useState('busse')
  const [difficulty, setDifficulty] = useState('leicht')

  return (
    <Routes>
      <Route path="selection" element={<SelectionPage schema={schema} setSchema={setSchema} difficulty={difficulty} setDifficulty={setDifficulty} />}></Route>
      <Route path="tasks" element={<TaskPage schema={schema} difficulty={difficulty} />}></Route>
    </Routes>
  )
}
