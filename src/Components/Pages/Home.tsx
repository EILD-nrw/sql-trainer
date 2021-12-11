import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import PrimaryButton from '../UI/PrimaryButton'
import initSqlJs, { Database } from 'sql.js'

// @ts-ignore
// eslint-disable-next-line
import sqlWasm from "!!file-loader?name=sql-wasm-[contenthash].wasm!sql.js/dist/sql-wasm.wasm" 

export default function Home () {
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
    <div className="flex flex-col items-center space-y-8 p-4">
      <h1 className="text-4xl font-bold">Willkommen!</h1>
      <p className="text-lg text-center">
        SQL-Trainer!
      </p>

      <Link to="/">
        <PrimaryButton>Weiter</PrimaryButton>
      </Link>
    </div>
  )
}
