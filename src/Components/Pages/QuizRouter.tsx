import React from 'react'
import { Route, Routes } from 'react-router-dom'
import SelectionPage from './SelectionPage'
import TaskPage from './TaskPage'

export default function QuizRouter () {
  return (
    <Routes>
      <Route path="selection" element={<SelectionPage />}></Route>
      <Route path="tasks" element={<TaskPage />}></Route>
    </Routes>
  )
}
