import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Components/Pages/Home'
import MainLayout from './Components/UI/MainLayout'

function App () {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
      </Route>
    </Routes>
  )
}

export default App
