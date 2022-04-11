import React from 'react'
import downloadIcon from '../../img/download.png'

interface Props {
  children?: React.ReactNode
  currentSchema: string
}

export default function TableContainer ({ children, currentSchema }: Props) {
  return (
    <div>
      <div className={'flex justify-between items-center border rounded-t-lg bg-gray-200 border-gray-600 select-none'}>
        <span className='m-2 font-semibold'>
          Tabellen
        </span>
        <a className='border border-gray-400 bg-gray-300 hover:bg-gray-400 rounded-lg p-1 mr-2' href={`./pdf/ER-DIAGRAM_DE_${currentSchema}.pdf`} download>
          <img className='w-4 h-4' src={downloadIcon} alt="Download" />
        </a>
      </div>
      <div className='border-l border-r border-b rounded-b-lg border-gray-600 p-2 space-y-2'>
        {children}
      </div>
    </div>
  )
}
