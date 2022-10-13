import { useState } from 'react'
import { Database } from 'sql.js'
import downloadIcon from '../../img/download.png'
import tables from '../../Tables'
import TableLookupModal from './TableLookupModal'

interface Props {
  currentSchema: string
  database: Database | undefined
}

export default function TableContainer({ currentSchema, database }: Props) {
  const [selectedLookupTable, setSelectedLookupTable] = useState('')

  return (
    <div>
      <div
        className={
          'flex justify-between items-center border rounded-t-lg bg-gray-200 border-gray-600 select-none'
        }
      >
        <span className="m-2 font-semibold">Tabellen</span>
        <a
          className="border border-gray-400 bg-gray-300 hover:bg-gray-400 rounded-lg p-1 mr-2"
          href={`./pdf/${currentSchema}.pdf`}
          download
        >
          <img className="w-4 h-4" src={downloadIcon} alt="Download" />
        </a>
      </div>
      <div className="border-l border-r border-b rounded-b-lg border-gray-600 p-2 space-y-2 h-80 overflow-auto">
        <div className="space-y-2">
          {tables[currentSchema].map((table) => {
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
      </div>
    </div>
  )
}
