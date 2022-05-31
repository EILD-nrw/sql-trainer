import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import SelectionPage from './Pages/SelectionPage'

// @ts-ignore
// eslint-disable-next-line
import sqlWasm from '!!file-loader?name=sql-wasm-[contenthash].wasm!sql.js/dist/sql-wasm.wasm'
import initSqlJs, { Database } from 'sql.js'
import DQLTaskPage from './Pages/DQLTaskPage'
import useShuffledTasks from '../Util/useShuffledTasks'

const LOCALSTORAGE_KEY_SCHEMA = 'selection.schema'
const LOCALSTORAGE_KEY_DIFFICULTY = 'selection.difficulty'

export default function QuizRouter() {
  const [schema, setSchema] = useState('busse')
  const [difficulty, setDifficulty] = useState('leicht')
  const [topic, setTopic] = useState('dql')
  const { selectedTask, nextTask } = useShuffledTasks(topic, schema, difficulty)
  const [database, setDatabase] = useState<Database>()

  // Restore settings if possible
  useEffect(() => {
    const lastSchema = window.localStorage.getItem(LOCALSTORAGE_KEY_SCHEMA)
    if (lastSchema) setSchema(lastSchema)

    const lastDifficulty = window.localStorage.getItem(
      LOCALSTORAGE_KEY_DIFFICULTY
    )
    if (lastDifficulty) setDifficulty(lastDifficulty)
  }, [])

  // Store settings upon change
  useEffect(() => {
    window.localStorage.setItem(LOCALSTORAGE_KEY_SCHEMA, schema)
    window.localStorage.setItem(LOCALSTORAGE_KEY_DIFFICULTY, difficulty)
  }, [schema, difficulty])

  /*
    Database
  */
  async function initDB(): Promise<void> {
    try {
      // Get SQL File
      const dbFile = await fetch(`./db/${schema}.db`).then((res) =>
        res.arrayBuffer()
      )

      // Initialize DB
      const SQL = await initSqlJs({ locateFile: () => sqlWasm })
      setDatabase(new SQL.Database(new Uint8Array(dbFile)))
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    initDB()
  }, [schema])

  return (
    <Routes>
      <Route
        path="selection"
        element={
          <SelectionPage
            schema={schema}
            setSchema={setSchema}
            difficulty={difficulty}
            setDifficulty={setDifficulty}
            topic={topic}
            setTopic={setTopic}
          />
        }
      ></Route>
      <Route
        path="dql"
        element={
          <DQLTaskPage
            database={database}
            selectedTask={selectedTask}
            nextTask={nextTask}
            schema={schema}
          />
        }
      ></Route>
    </Routes>
  )
}
