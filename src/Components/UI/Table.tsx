import { QueryExecResult } from 'sql.js'

interface Props {
  tableData: QueryExecResult
}

export default function Table ({ tableData }: Props) {
  const { columns, values } = tableData

  return (
    <div className="overflow-x-auto max-h-80">
      <table className="shadow w-full">
        <thead>
          <tr className="sticky top-0">
            {columns.map(key => {
              return <th className="bg-gray-200 text-left px-4 py-2" key={key}>{key}</th>
            })}
          </tr>
        </thead>
        <tbody>
          {values.map((row, index) => {
            return (
              <tr className={`bg-opacity-70 ${index % 2 === 1 ? 'bg-gray-50' : 'bg-white'}`} key={index}>
                {row.map((entry, index) => {
                  return <td className="border-b border-l px-4 py-2" key={index}>{entry}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
