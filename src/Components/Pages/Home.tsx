import React from 'react'
import { Link } from 'react-router-dom'
import PrimaryButton from '../UI/PrimaryButton'

export default function Home () {
  return (
    <div className="flex flex-col items-center space-y-8 p-4">
      <h1 className="text-4xl font-bold">Willkommen!</h1>
      <p className="text-lg text-center">
        SQL-Trainer!
      </p>

      <Link to="/sqltrainer/selection">
        <PrimaryButton>Weiter</PrimaryButton>
      </Link>
    </div>
  )
}
