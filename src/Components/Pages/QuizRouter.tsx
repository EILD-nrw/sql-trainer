import React, { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import SelectionPage from './SelectionPage'
import TaskPage from './TaskPage'

const LOCALSTORAGE_KEY_SCHEMA = 'selection.schema'
const LOCALSTORAGE_KEY_DIFFICULTY = 'selection.difficulty'

export default function QuizRouter () {
  const [schema, setSchema] = useState('busse')
  const [difficulty, setDifficulty] = useState('leicht')

  // Restore settings if possible
  useEffect(() => {
    const lastSchema = window.localStorage.getItem(LOCALSTORAGE_KEY_SCHEMA)
    if (lastSchema) setSchema(lastSchema)

    const lastDifficulty = window.localStorage.getItem(LOCALSTORAGE_KEY_DIFFICULTY)
    if (lastDifficulty) setDifficulty(lastDifficulty)
  }, [])

  // Store settings upon change
  useEffect(() => {
    window.localStorage.setItem(LOCALSTORAGE_KEY_SCHEMA, schema)
    window.localStorage.setItem(LOCALSTORAGE_KEY_DIFFICULTY, difficulty)
  }, [schema, difficulty])

  return (
    <Routes>
      <Route path="selection" element={<SelectionPage schema={schema} setSchema={setSchema} difficulty={difficulty} setDifficulty={setDifficulty} />}></Route>
      <Route path="tasks" element={<TaskPage schema={schema} difficulty={difficulty} />}></Route>
    </Routes>
  )
}
