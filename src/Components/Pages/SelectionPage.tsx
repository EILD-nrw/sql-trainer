import React, { useState } from 'react'
import PrimaryButton from '../UI/PrimaryButton'
import SelectElement from '../UI/SelectElement'

export default function SelectionPage () {
  const schemaOptions = ['Busse', 'Fahrrad', 'Reisen', 'Fußball', 'Welt']
  const difficultyOptions = ['Leicht', 'Mittel', 'Schwer']

  const [schema, setSchema] = useState('busse')
  const [difficulty, setDifficulty] = useState('leicht')

  return (
    <div className="flex flex-col space-y-4">
      <h1 className="font-semibold text-2xl">Konfiguration</h1>
      <p>Bitte wählen Sie ein Datenbankschema und einen Schwierigkeitsgrad aus:</p>
      <SelectElement title="Schema" options={schemaOptions} selected={schema} setSelected={setSchema} />
      <SelectElement title="Schwierigkeitsgrad" options={difficultyOptions} selected={difficulty} setSelected={setDifficulty} />
      <PrimaryButton>Trainer Starten</PrimaryButton>
    </div>
  )
}
