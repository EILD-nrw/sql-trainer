interface Props {
  selectedTopic: string
  setSelectedTopic: (newTopic: string) => void
}

export default function TopicSelect({
  selectedTopic,
  setSelectedTopic,
}: Props) {
  return (
    <div className="grid grid-cols-3 gap-4 text-white">
      <button
        className={`list-none py-10 px-4 text-center rounded-lg hover:opacity-95 ${
          selectedTopic === 'dql' ? 'bg-th-violet' : 'bg-gray-500'
        }`}
        onClick={() => setSelectedTopic('dql')}
      >
        <div className="flex flex-col justify-center items-center">
          <span className="text-4xl font-semibold mb-2">DQL</span>
          <span className="font-semibold text-lg">SELECT-Abfragen</span>
        </div>
      </button>
      <button
        className={`list-none py-10 px-4 text-center rounded-lg hover:opacity-95 ${
          selectedTopic === 'ddl' ? 'bg-th-violet' : 'bg-gray-500'
        }`}
        onClick={() => setSelectedTopic('ddl')}
      >
        <div className="flex flex-col justify-center items-center">
          <span className="text-4xl font-semibold mb-2">DDL</span>
          <span className="font-semibold text-lg">
            CREATE, ALTER, DROP, RENAME
          </span>
        </div>
      </button>
      <button
        className={`list-none py-10 px-4 text-center rounded-lg hover:opacity-95 ${
          selectedTopic === 'dml' ? 'bg-th-violet' : 'bg-gray-500'
        }`}
        onClick={() => setSelectedTopic('dml')}
      >
        <div className="flex flex-col justify-center items-center">
          <span className="text-4xl font-semibold mb-2">DML</span>
          <span className="font-semibold text-lg">INSERT, UPDATE, DELETE</span>
        </div>
      </button>
    </div>
  )
}
