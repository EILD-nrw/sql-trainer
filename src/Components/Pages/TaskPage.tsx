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
import TableContainer from '../UI/TableContainer'

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
  const [solutionTable, setSolutionTable] = useState<QueryExecResult>()

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
        // Get SQL File
        const dbFile = await fetch(`./db/${schema}.db`).then(res => res.arrayBuffer())

        // Initialize DB
        const SQL = await initSqlJs({ locateFile: () => sqlWasm })
        setDb(new SQL.Database(new Uint8Array(dbFile)))
      } catch (err) {
        console.log(err)
      }
    }
    initDB()
  }, [])

  useEffect(() => {
    // Fetch Solution
    if (!db || !selectedTask) return
    try {
      const solution = db.exec(selectedTask.solutionQuery)
      setSolutionTable(solution[0])
    } catch (err) {
      console.error(err)
    }
  }, [selectedTask, db])

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

  function columnNamesAreEqual (columnsX: string[], columnsY: string[]): boolean {
    if (columnsX.length !== columnsY.length) return false

    const preparedX = columnsX.map(column => column.toLowerCase())
    const preparedY = columnsY.map(column => column.toLowerCase())

    const sortedX = preparedX.sort()
    const sortedY = preparedY.sort()

    return sortedX.every((entry, index) => entry === sortedY[index] || ['avg', 'count', 'max', 'sum'].some(aggregator => entry.includes(aggregator) && sortedY[index].includes(aggregator)))
  }

  function findCorrespondingIndex (columnName: string, columnList: string[]): number {
    columnName = columnName.toLowerCase()
    columnList = columnList.map(column => column.toLowerCase())

    return columnList.findIndex(column => column === columnName ||
      ['avg', 'count', 'max', 'sum'].some(aggregator => columnName.includes(aggregator) && column.includes(aggregator)))
  }

  function compareQueryResults (x: QueryExecResult, y: QueryExecResult) {
    // Check Column-names
    if (!columnNamesAreEqual(x.columns, y.columns)) return false

    // Check entries columnwise
    for (const column of x.columns) {
      const columnIndexX = findCorrespondingIndex(column, x.columns)
      const columnIndexY = findCorrespondingIndex(column, y.columns)

      const columnEntriesX = x.values.map(line => line[columnIndexX])
      const columnEntriesY = y.values.map(line => line[columnIndexY])

      // Compare Column-values
      if (!compareSqlValueLists(columnEntriesX, columnEntriesY)) return false
    }

    return true
  }

  function evaluateQuery (queryResult: QueryExecResult) {
    if (!solutionTable) return
    if (compareQueryResults(queryResult, solutionTable)) {
      setTaskSolved(true)
    }
  }

  function executeCode (): void {
    if (!db) return
    try {
      const execResults = db.exec(code)

      if (execResults.length === 0) throw Error('No Results!')

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
              <button className='bg-th-violet rounded-md border px-2 py-1 font-semibold text-white float-right' type='button' onClick={setNewRandomTask}>Neue Aufgabe</button>
            </div>
          </TrainerContainer>
        </div>
        <div className='max-w-sm flex-1'>
          <TableContainer currentSchema={schema}>
            <div className='h-80 overflow-y-auto overflow-x-hidden space-y-2'>
              {tables[schema].map(table => {
                return <p className='cursor-pointer bg-gray-50 border-gr shadow-md rounded-md px-2 py-1' key={table} onClick={() => setSelectedLookupTable(table)} >{table}</p>
              })}
            </div>
            { db &&
            <TableLookupModal db={db} tableName={selectedLookupTable} resetLookup={() => setSelectedLookupTable('')} />
            }
          </TableContainer>
        </div>
      </div>
      <DetailsElement title='Ausgabe' taskSolved={taskSolved}>
        { error
          ? <p>{(error || '').toString()}</p>
          : queryData.map((result, index) => {
            return <Table key={index} tableData={result} />
          })
        }
      </DetailsElement>
      <DetailsElement title='Lösung' startsOpen={false}>
        <h3 className='font-semibold text-lg'>Query</h3>
        { selectedTask?.solutionQuery &&
          <p className='px-4 py-1'>{selectedTask.solutionQuery}</p>
        }
        <h3 className='font-semibold text-lg'>Output</h3>
        { solutionTable &&
          <Table tableData={solutionTable} />
        }
      </DetailsElement>
    </div>
  )
}
