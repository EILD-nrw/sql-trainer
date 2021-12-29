import React, { useEffect, useState } from 'react'
import Editor from '@monaco-editor/react'

// @ts-ignore
// eslint-disable-next-line
import sqlWasm from "!!file-loader?name=sql-wasm-[contenthash].wasm!sql.js/dist/sql-wasm.wasm" 
import initSqlJs, { Database, QueryExecResult } from 'sql.js'
import DetailsElement from '../UI/DetailsElement'
import Table from '../UI/Table'

interface Props {
  schema: string
  difficulty: string
}

export default function TaskPage ({ schema, difficulty }: Props) {
  const [db, setDb] = useState<Database>()
  const [code, setCode] = useState('')
  // eslint-disable-next-line
  const [queryData, setQueryData] = useState<QueryExecResult[]>([])
  const [error, setError] = useState('')

  /*
    Database
  */
  useEffect(() => {
    async function initDB (): Promise<void> {
      try {
        const SQL = await initSqlJs({ locateFile: () => sqlWasm })
        setDb(new SQL.Database())
      } catch (err) {
        console.log(err)
      }
    }
    initDB()
  }, [])

  /*
    Editor
  */

  function handleEditorChange (value: string | undefined): void {
    if (value) setCode(value)
  }

  function executeCode (): void {
    if (!db) return
    try {
      const execResults = db.exec(code)
      setQueryData(execResults)
      setError('')
    } catch (err) {
      setError(err as string)
      setQueryData([])
    }
  }

  function reset (): void {
    setCode('')
    setError('')
    setQueryData([])
  }

  return (
    <div className='space-y-4'>
      <h1 className='text-2xl font-semibold'>Trainer</h1>
      <p className='font-semibold'>Welche Schauspieler ( Name, Wohnort) haben in Dramen von Schiller mitgespielt?</p>
      <DetailsElement title='Editor'>
        <div className='border-l border-r border-b rounded-b-lg border-gray-600 p-2 space-y-2'>
          <Editor height='250px' language='sql' theme='vs-dark' value={code} onChange={handleEditorChange} options={{ minimap: { enabled: false } }} />
          <div className='flex justify-between'>
            <button className='bg-th-red rounded-md border px-2 py-1 font-semibold text-white' type="button" onClick={executeCode}>Ausführen</button>
            <button className='bg-th-violet rounded-md border px-2 py-1 font-semibold text-white' type="button" onClick={reset}>Reset</button>
          </div>
        </div>
      </DetailsElement>
      <DetailsElement title='Ausgabe'>
      <div className='border-l border-r border-b rounded-b-lg border-gray-600 p-2 space-y-4'>
        { error
          ? <p>{(error || '').toString()}</p>
          : queryData.map((result, index) => {
            return <Table key={index} tableData={result} />
          })
        }
      </div>
      </DetailsElement>
    </div>
  )
}
