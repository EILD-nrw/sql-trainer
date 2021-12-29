import React from 'react'
import { QueryExecResult } from 'sql.js'

interface Props {
  tableData: QueryExecResult
}

export default function Table ({ tableData }: Props) {
  const { columns, values } = tableData

  return (
    <div className="overflow-x-auto">
      <table className="shadow  w-full">
        <thead>
          <tr className="border">
            {columns.map(key => {
              return <th className="bg-gray-100 border text-left px-4 py-2" key={key}>{key}</th>
            })}
          </tr>
        </thead>
        <tbody>
          {values.map((row, index) => {
            return (
              <tr className={index % 2 === 1 ? 'bg-gray-50' : ''} key={index}>
                {row.map((entry, index) => {
                  return <td className="border px-4 py-2" key={index}>{entry}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
