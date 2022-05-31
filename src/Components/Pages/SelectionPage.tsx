import { useNavigate } from 'react-router-dom'
import PrimaryButton from '../UI/PrimaryButton'
import SelectElement from '../UI/SelectElement'
import TopicSelect from '../UI/TopicSelect'

interface Props {
  schema: string
  setSchema: (newSchema: string) => void
  difficulty: string
  setDifficulty: (newDifficulty: string) => void
  topic: string
  setTopic: (newTopic: string) => void
}

export default function SelectionPage({
  schema,
  setSchema,
  difficulty,
  setDifficulty,
  topic,
  setTopic,
}: Props) {
  const schemaOptions = ['Busse', 'Fahrrad', 'Theater', 'Reisen', 'Fussball']
  const difficultyOptions = ['Leicht', 'Mittel', 'Schwer']

  const navigate = useNavigate()

  function startTrainer() {
    navigate(`/sqltrainer/${topic}`)
  }

  return (
    <div className="flex flex-col space-y-4 mx-32 my-6">
      <h1 className="font-semibold text-3xl pb-4">Konfiguration</h1>
      <TopicSelect selectedTopic={topic} setSelectedTopic={setTopic} />
      <p>
        Bitte wählen Sie ein <b>Datenbankschema</b> und einen{' '}
        <b>Schwierigkeitsgrad</b> aus:
      </p>
      <SelectElement
        title="Schema"
        options={schemaOptions}
        selected={schema}
        setSelected={setSchema}
      />
      <SelectElement
        title="Schwierigkeitsgrad"
        options={difficultyOptions}
        selected={difficulty}
        setSelected={setDifficulty}
      />
      <div className="pt-6">
        <PrimaryButton onClick={startTrainer}>Trainer Starten</PrimaryButton>
      </div>
    </div>
  )
}
