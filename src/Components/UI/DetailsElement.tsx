import React, { useState } from 'react'

interface Props {
  children?: React.ReactNode
  title: string
  startsOpen?: boolean
  taskSolved?: boolean
}

export default function DetailsElement ({ children, title, startsOpen = true, taskSolved = false }: Props) {
  const [isOpen, setIsOpen] = useState(startsOpen)

  function toggleDetails (e: React.MouseEvent) {
    e.preventDefault()
    setIsOpen(!isOpen)
  }

  return (
    <details open={isOpen}>
      <summary className={`font-semibold p-2 border ${isOpen ? 'rounded-t-lg' : 'rounded-lg'} ${taskSolved ? 'bg-green-200' : 'bg-gray-200'} border-gray-600 select-none cursor-pointer`} onClick={toggleDetails}>{title}</summary>
      <div className={`border-l border-r border-b rounded-b-lg border-gray-600 p-2 space-y-2 ${taskSolved ? 'bg-green-50' : ''}`}>
        {children}
      </div>
    </details>
  )
}
