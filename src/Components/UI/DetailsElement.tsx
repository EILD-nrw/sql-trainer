import React, { useState } from 'react'

interface Props {
  children?: React.ReactNode
  title: string
  startsOpen?: boolean
}

export default function DetailsElement ({ children, title, startsOpen = true }: Props) {
  const [isOpen, setIsOpen] = useState(startsOpen)

  function toggleDetails (e: React.MouseEvent) {
    e.preventDefault()
    setIsOpen(!isOpen)
  }

  return (
    <details open={isOpen}>
      <summary className={`font-semibold p-2 border ${isOpen ? 'rounded-t-lg' : 'rounded-lg'} bg-gray-400 border-gray-600 select-none cursor-pointer`} onClick={toggleDetails}>{title}</summary>
      {children}
    </details>
  )
}
