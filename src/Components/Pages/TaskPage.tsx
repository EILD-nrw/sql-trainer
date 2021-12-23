import React, { useEffect, useState } from 'react'

// @ts-ignore
// eslint-disable-next-line
import sqlWasm from "!!file-loader?name=sql-wasm-[contenthash].wasm!sql.js/dist/sql-wasm.wasm" 
import initSqlJs, { Database } from 'sql.js'

interface Props {
  schema: string
  difficulty: string
}

export default function TaskPage ({ schema, difficulty }: Props) {
  // Create Database
  const [db, setDb] = useState<Database>()
  useEffect(() => {
    async function initDB () {
      // sql.js needs to fetch its wasm file, so we cannot immediately instantiate the database
      // without any configuration, initSqlJs will fetch the wasm files directly from the same path as the js
      // see ../craco.config.js
      try {
        const SQL = await initSqlJs({ locateFile: () => sqlWasm })
        setDb(new SQL.Database())
        console.log(db?.exec('SELECT 1;'))
      } catch (err) {
        console.log(err)
      }
    }
    initDB()
  }, [])

  return (
    <div>
      {schema} {difficulty}
    </div>
  )
}
