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
  const schemaOptions = ['Busse', 'Fahrrad', 'Theater', 'Reisen', 'Fußball']
  const difficultyOptions = ['Leicht', 'Mittel', 'Schwer']

  return (
    <div className="flex flex-col space-y-4">
      <h1 className="font-semibold text-2xl">Konfiguration</h1>
      <p>Bitte wählen Sie ein Datenbankschema und einen Schwierigkeitsgrad aus:</p>
      <SelectElement title="Schema" options={schemaOptions} selected={schema} setSelected={setSchema} />
      <SelectElement title="Schwierigkeitsgrad" options={difficultyOptions} selected={difficulty} setSelected={setDifficulty} />
      <Link to="/sqltrainer/tasks">
        <PrimaryButton>Trainer Starten</PrimaryButton>
      </Link>
    </div>
  )
}
