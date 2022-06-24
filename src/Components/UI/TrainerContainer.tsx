import { ReactNode } from 'react'

interface Props {
  children?: ReactNode
  title: string
}

export default function TrainerContainer ({ children, title }: Props) {
  return (
    <div>
      <div className={'font-semibold p-2 border rounded-t-lg bg-gray-200 border-gray-600 select-none'}>{title}</div>
      <div className='border-l border-r border-b rounded-b-lg border-gray-600 p-2 space-y-2'>
        {children}
      </div>
    </div>
  )
}
