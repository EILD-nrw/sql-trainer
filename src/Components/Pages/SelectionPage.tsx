import React from 'react'
import { Link } from 'react-router-dom'
import PrimaryButton from '../UI/PrimaryButton'
import SelectElement from '../UI/SelectElement'

interface Props {
  schema: string
  setSchema: (newSchema: string) => void
  difficulty: string
  setDifficulty: (newDifficulty: string) => void
}

export default function SelectionPage ({ schema, setSchema, difficulty, setDifficulty }: Props) {
  const schemaOptions = ['Busse', 'Fahrrad', 'Theater', 'Reisen', 'Fussball']
  const difficultyOptions = ['Leicht', 'Mittel', 'Schwer']

  return (
    <div className="flex flex-col space-y-4 mx-32 my-6">
      <h1 className="font-semibold text-3xl pb-4">Konfiguration</h1>
      <p>Bitte wählen Sie ein <b>Datenbankschema</b> und einen <b>Schwierigkeitsgrad</b> aus:</p>
      <SelectElement title="Schema" options={schemaOptions} selected={schema} setSelected={setSchema} />
      <SelectElement title="Schwierigkeitsgrad" options={difficultyOptions} selected={difficulty} setSelected={setDifficulty} />
      <div className='pt-6'>
        <Link to="/sqltrainer/tasks">
          <PrimaryButton>Trainer Starten</PrimaryButton>
        </Link>
      </div>
    </div>
  )
}
