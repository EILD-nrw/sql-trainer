import React from 'react'

interface Props {
  children?: React.ReactNode
  title: string
  startsOpen?: boolean
}

export default function DetailsElement ({ children, title, startsOpen = true }: Props) {
  return (
    <details open={startsOpen} >
      <summary className='font-semibold p-2 border rounded-t-lg bg-gray-400 border-gray-600 select-none cursor-pointer'>{title}</summary>
      {children}
    </details>
  )
}
