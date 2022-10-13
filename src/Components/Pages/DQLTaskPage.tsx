import { useState } from 'react'
import Editor from '@monaco-editor/react'
import DetailsElement from '../UI/DetailsElement'
import Table from '../UI/Table'

import { Task } from '../../Types/Task'
import TrainerContainer from '../UI/TrainerContainer'
import TableContainer from '../UI/TableContainer'
import { Database } from 'sql.js'
import { useDQLTrainer } from '../../Util/useDQLTrainer'

interface Props {
  database: Database | undefined
  schema: string
  selectedTask: Task | undefined
  nextTask: () => void
}

export default function DQLTaskPage({
  database,
  schema,
  selectedTask,
  nextTask,
}: Props) {
  const [code, setCode] = useState('')
  const [showSolution, setShowSolution] = useState(false)
  const { solutionTable, isCorrect, error, queryData, executeCode } =
    useDQLTrainer(selectedTask, database)

  function handleNextTask(): void {
    nextTask()

    // Reset other states
    setCode('')
    setShowSolution(false)
  }

  return (
    <div className="space-y-4">
      {/* Task description */}
      <h1 className="text-2xl font-semibold">Trainer</h1>
      {selectedTask ? (
        <p className="font-semibold whitespace-pre-line">{selectedTask.text}</p>
      ) : (
        <p className="font-semibold">Loading...</p>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="col-span-1 sm:col-span-2">
          {/* Trainer container */}
          <TrainerContainer title="Editor">
            <div className="flex flex-col h-full">
              <div className="flex-grow">
                <Editor
                  language="sql"
                  theme="vs-dark"
                  height="100%"
                  value={code}
                  onChange={(value: string | undefined) => setCode(value || '')}
                  options={{
                    minimap: { enabled: false },
                    automaticLayout: true,
                  }}
                />
              </div>

              {/* Trainer button bar */}
              <div className="flex justify-between pt-2">
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
            </div>
          </TrainerContainer>
        </div>

        {/* Table lookup bar */}
        {schema && (
          <TableContainer currentSchema={schema} database={database} />
        )}
      </div>

      {/* Output container */}
      <DetailsElement title="Ausgabe" taskSolved={isCorrect}>
        {error ? (
          <p>{(error || '').toString()}</p>
        ) : (
          queryData.map((result, index) => {
            return <Table key={index} tableData={result} />
          })
        )}
      </DetailsElement>

      {/* Solution container */}
      {showSolution && (
        <DetailsElement title="Lösung">
          <h3 className="font-semibold text-lg">SQL-Statement:</h3>
          {selectedTask?.solutionQuery && (
            <p className="px-4 py-1">{selectedTask.solutionQuery}</p>
          )}
          <h3 className="font-semibold text-lg">Output</h3>
          {solutionTable && <Table tableData={solutionTable} />}
        </DetailsElement>
      )}
    </div>
  )
}
