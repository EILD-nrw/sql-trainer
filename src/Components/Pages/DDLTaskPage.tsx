import Editor from '@monaco-editor/react'
import { useState } from 'react'
import { Database } from 'sql.js'
import tables from '../../Tables'
import { Task } from '../../Types/Task'
import { useDDLTrainer } from '../../Util/useDDLTrainer'
import TableContainer from '../UI/TableContainer'
import TableLookupModal from '../UI/TableLookupModal'
import TrainerContainer from '../UI/TrainerContainer'

interface Props {
  database: Database | undefined
  selectedTask: Task | undefined
  nextTask: () => void
  schema: string
}

export default function DDLTaskPage({
  database,
  selectedTask,
  nextTask,
  schema,
}: Props) {
  const [code, setCode] = useState('')
  const [selectedLookupTable, setSelectedLookupTable] = useState('')
  const [showSolution, setShowSolution] = useState(false)
  const { executeCode } = useDDLTrainer(selectedTask, database)

  function handleNextTask(): void {
    nextTask()

    // Reset other states
    setCode('')
    setShowSolution(false)
  }

  console.log(showSolution)

  return (
    <div className="space-y-4">
      {/* Task description */}
      <h1 className="text-2xl font-semibold">Trainer</h1>
      {selectedTask ? (
        <p className="font-semibold whitespace-pre-line">{selectedTask.text}</p>
      ) : (
        <p className="font-semibold">Loading...</p>
      )}
      <div className="flex flex-row space-x-4">
        <div className="flex-grow">
          {/* Trainer container */}
          <TrainerContainer title="Editor">
            <Editor
              height="278px"
              language="sql"
              theme="vs-dark"
              value={code}
              onChange={(value: string | undefined) => setCode(value || '')}
              options={{ minimap: { enabled: false } }}
            />

            {/* Trainer button bar */}
            <div className="flex justify-between">
              <button
                className="bg-th-red rounded-md border px-2 py-1 font-semibold text-white"
                type="button"
                onClick={() => executeCode(code)}
              >
                Ausführen
              </button>
              <button
                className="bg-th-orange rounded-md border px-2 py-1 font-semibold text-white"
                type="button"
                onClick={() => setShowSolution(true)}
              >
                Lösung anzeigen
              </button>
              <button
                className="bg-th-violet rounded-md border px-2 py-1 font-semibold text-white float-right"
                type="button"
                onClick={handleNextTask}
              >
                Neue Aufgabe
              </button>
            </div>
          </TrainerContainer>
        </div>

        {/* Table lookup bar */}
        <div className="max-w-sm flex-1">
          <TableContainer currentSchema={schema}>
            <div className="h-80 overflow-y-auto overflow-x-hidden space-y-2">
              {tables[schema].map((table) => {
                return (
                  <p
                    className="cursor-pointer bg-gray-100 hover:bg-gray-200 border-gray shadow-md rounded-md px-2 py-1"
                    key={table}
                    onClick={() => setSelectedLookupTable(table)}
                  >
                    {table}
                  </p>
                )
              })}
            </div>
            {database && (
              <TableLookupModal
                db={database}
                tableName={selectedLookupTable}
                resetLookup={() => setSelectedLookupTable('')}
              />
            )}
          </TableContainer>
        </div>
      </div>
    </div>
  )
}
