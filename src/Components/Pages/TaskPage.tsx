import React, { useEffect, useState } from 'react'
import Editor from '@monaco-editor/react'

// @ts-ignore
// eslint-disable-next-line
import sqlWasm from "!!file-loader?name=sql-wasm-[contenthash].wasm!sql.js/dist/sql-wasm.wasm" 
import initSqlJs, { Database, QueryExecResult, SqlValue } from 'sql.js'
import DetailsElement from '../UI/DetailsElement'
import Table from '../UI/Table'

import tasks from '../../Tasks'

interface Props {
  schema: string
  difficulty: string
}

export default function TaskPage ({ schema, difficulty }: Props) {
  const [db, setDb] = useState<Database>()
  const [code, setCode] = useState('')
  const [queryData, setQueryData] = useState<QueryExecResult[]>([])
  const [error, setError] = useState('')

  const selectedTask = tasks[1]

  /*
    Database
  */
  useEffect(() => {
    async function initDB (): Promise<void> {
      try {
        const dbFile = await fetch(`./db/${schema}.db`).then(res => res.arrayBuffer())
        const SQL = await initSqlJs({ locateFile: () => sqlWasm })
        setDb(new SQL.Database(new Uint8Array(dbFile)))
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

  function compareSqlValueLists (x: SqlValue[], y: SqlValue[]) {
    // Lists need to have equal lengths
    if (x.length !== y.length) return false

    // Strings get transformed to lowercase
    const preparedX = x.map(value => {
      return typeof value === 'string' ? value.toLowerCase() : value
    })
    const preparedY = y.map(value => {
      return typeof value === 'string' ? value.toLowerCase() : value
    })

    const sortedX = preparedX.sort()
    const sortedY = preparedY.sort()

    return sortedX.every((entry, index) => entry === sortedY[index])
  }

  function compareQueryResults (x: QueryExecResult, y: QueryExecResult) {
    // Check Column-names
    if (!compareSqlValueLists(x.columns, y.columns)) return false

    // Check entries columnwise
    for (const column of x.columns) {
      const columnIndexX = x.columns.findIndex(xColumn => xColumn === column)
      const columnIndexY = y.columns.findIndex(yColumn => yColumn === column)

      const columnEntriesX = x.values.map(line => line[columnIndexX])
      const columnEntriesY = y.values.map(line => line[columnIndexY])

      // Compare Column-values
      if (!compareSqlValueLists(columnEntriesX, columnEntriesY)) return false
    }

    return true
  }

  function evaluateQuery (queryResult: QueryExecResult) {
    if (!db || !selectedTask) return
    const solution = db.exec(selectedTask.solutionQuery)
    if (compareQueryResults(queryResult, solution[0])) {
      setTaskSolved(true)
    }
  }

  function executeCode (): void {
    if (!db) return
    try {
      const execResults = db.exec(code)
      setQueryData(execResults)
      evaluateQuery(execResults[0])
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
      <p className='font-semibold whitespace-pre-line'>{selectedTask.text}</p>
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
