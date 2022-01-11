import React, { useEffect, useState } from 'react'
import { Database, QueryExecResult } from 'sql.js'
import Table from './Table'

interface Props {
  db: Database
  tableName: string
}

export default function TableLookupModal ({ db, tableName }: Props) {
  const [isVisible, setIsVisible] = useState(false)
  const [currentTabledata, setCurrentTabledata] = useState<QueryExecResult>()
  const [error, setError] = useState('')

  useEffect(() => {
    if (!db || tableName === '') return
    try {
      const execResults = db.exec(`SELECT * FROM ${tableName}`)
      console.log(execResults)
      setCurrentTabledata(execResults[0])
      setIsVisible(true)
      setError('')
    } catch (err) {
      setError(err as string)
      setIsVisible(true)
      setCurrentTabledata(undefined)
    }
  }, [tableName])

  return (
    <div
        className={`${
          isVisible ? '' : 'hidden'
        } fixed z-0 left-0 top-0 w-full h-full overflow-auto bg-black bg-opacity-40`}
      >
        <div className="bg-white mt-6 mx-auto max-w-4xl shadow-2xl text-black p-4">
          <div className="flex flex-row justify-between items-center border-b pb-2">
            <h1 className="text-lg font-semibold">Inhalt von {tableName}</h1>
            <span
              className="cursor-pointer select-none font-bold text-3xl text-gray-500"
              onClick={() => setIsVisible(false)}
            >
              &times;
            </span>
          </div>
          { currentTabledata &&
            <Table tableData={currentTabledata}></Table>
          }
          { error &&
            <div className="py-4 whitespace-pre-line">{(error || '').toString()}</div>
          }
          <div className="pt-2 flex flex-row justify-end border-t">
            <button
              className="bg-th-violet rounded-md px-3 py-1.5 text-white"
              type="button"
              onClick={() => setIsVisible(false)}
            >
              Schließen
            </button>
          </div>
        </div>
      </div>
  )
}
