import React, { useEffect, useState } from 'react'
import Editor from '@monaco-editor/react'

// @ts-ignore
// eslint-disable-next-line
import sqlWasm from "!!file-loader?name=sql-wasm-[contenthash].wasm!sql.js/dist/sql-wasm.wasm" 
import initSqlJs, { Database, QueryExecResult, SqlValue } from 'sql.js'
import DetailsElement from '../UI/DetailsElement'
import Table from '../UI/Table'

import tasks from '../../Tasks'
import { Task } from '../../Types/Task'
import tables from '../../Tables'
import TrainerContainer from '../UI/TrainerContainer'
import TableLookupModal from '../UI/TableLookupModal'

interface Props {
  schema: string
  difficulty: string
}

export default function TaskPage ({ schema, difficulty }: Props) {
  const [db, setDb] = useState<Database>()
  const [code, setCode] = useState('')
  const [queryData, setQueryData] = useState<QueryExecResult[]>([])
  const [error, setError] = useState('')
  const [selectedTask, setSelectedTask] = useState<Task>()
  const [taskSolved, setTaskSolved] = useState(false)
  const [selectedLookupTable, setSelectedLookupTable] = useState('')

  /*
    Init
  */
  const taskPool = tasks.filter(task => task.difficulty === difficulty && task.schema === schema)

  function setNewRandomTask (): void {
    const newTask = taskPool[Math.floor(Math.random() * taskPool.length)]
    if (!newTask) return
    setSelectedTask(newTask)

    // Reset other states
    setTaskSolved(false)
    setCode('')
    setError('')
    setQueryData([])
  }

  useEffect(() => {
    setNewRandomTask()
  }, [])

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
      { selectedTask &&
        <p className='font-semibold whitespace-pre-line'>{selectedTask.text}</p>
      }
      <div className='flex flex-row space-x-4'>
        <div className='flex-grow'>
          <TrainerContainer title='Editor'>
            <Editor height='278px' language='sql' theme='vs-dark' value={code} onChange={handleEditorChange} options={{ minimap: { enabled: false } }} />
            <div className='flex justify-between'>
              <button className='bg-th-red rounded-md border px-2 py-1 font-semibold text-white' type="button" onClick={executeCode}>Ausführen</button>
              <button className='bg-th-orange rounded-md border px-2 py-1 font-semibold text-white' type="button" onClick={reset}>Reset</button>
            </div>
          </TrainerContainer>
        </div>
        <div className='max-w-sm flex-1'>
          <TrainerContainer title="Tabellen">
            <div className='max-h-80 overflow-y-auto overflow-x-hidden'>
              {tables[schema].map(table => {
                return <p key={table} onClick={() => setSelectedLookupTable(table)}>{table}</p>
              })}
            </div>
            { db &&
            <TableLookupModal db={db} tableName={selectedLookupTable} />
            }
          </TrainerContainer>
        </div>
      </div>
      <DetailsElement title='Ausgabe'>
        { error
          ? <p>{(error || '').toString()}</p>
          : queryData.map((result, index) => {
            return <Table key={index} tableData={result} />
          })
        }
      </DetailsElement>
      <DetailsElement title='Lösung' startsOpen={false}></DetailsElement>
      {taskSolved &&
        <p>Richtig!</p>
      }
      <button className='bg-th-violet rounded-md border px-2 py-1 font-semibold text-white float-right' type='button' onClick={setNewRandomTask}>Neue Aufgabe</button>
    </div>
  )
}
