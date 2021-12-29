import React, { useEffect, useState } from 'react'
import Editor from '@monaco-editor/react'

// @ts-ignore
// eslint-disable-next-line
import sqlWasm from "!!file-loader?name=sql-wasm-[contenthash].wasm!sql.js/dist/sql-wasm.wasm" 
import initSqlJs, { Database } from 'sql.js'
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
  const [output, setOutput] = useState([])

  /*
    Database
  */
  useEffect(() => {
    async function initDB () {
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

  function handleEditorChange (value: string | undefined) {
    if (value) setCode(value)
  }

  /*
    Output
  */

  return (
    <div className='space-y-4'>
      <h1 className='text-2xl font-semibold'>Trainer</h1>
      <p className='font-semibold'>Welche Schauspieler ( Name, Wohnort) haben in Dramen von Schiller mitgespielt?</p>
      <DetailsElement title='Editor'>
        <Editor height='250px' language='sql' theme='vs-dark' value={code} onChange={handleEditorChange} options={{ minimap: { enabled: false } }} />
      </DetailsElement>
      <DetailsElement title='Ausgabe'>
      <div className='border-l border-r border-b rounded-b-lg border-gray-600 p-2'>
        {output.length > 0
          ? <Table tableData={output} />
          : 'Keine Elemente wurden ausgewählt.'
        }
      </div>
      </DetailsElement>
    </div>
  )
}
