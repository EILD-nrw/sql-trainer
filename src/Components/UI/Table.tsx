import React from 'react'

interface Props {
  tableData: Object[]
}

export default function Table ({ tableData }: Props) {
  return (
    <div className="overflow-x-auto">
      <table className="shadow  w-full">
        <thead>
          <tr className="border">
            {Object.keys(tableData[0]).map(key => {
              return <th className="bg-gray-100 border text-left px-4 py-2" key={key}>{key}</th>
            })}
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, index) => {
            return (
              <tr className={index % 2 === 1 ? 'bg-gray-50' : ''} key={index}>
                {Object.values(row).map((entry, index) => {
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
