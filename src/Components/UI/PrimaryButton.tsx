import { ReactNode } from 'react'

interface PropTypes {
  children?: ReactNode
  onClick?: () => void
  disabled?: boolean
}

export default function PrimaryButton ({
  children,
  onClick,
  disabled = false
}: PropTypes) {
  return (
    <button
      className={`px-4 py-2 text-white text-lg font-semibold border shadow-md rounded-md cursor-pointer ${
        disabled
          ? 'bg-gray-400 pointer-events-none'
          : 'bg-th-red hover:bg-red-600'
      }`}
      type="button"
      onClick={onClick}
    >
      {children}
    </button>
  )
}
