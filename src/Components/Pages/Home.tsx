import React from 'react'
import { Link } from 'react-router-dom'
import PrimaryButton from '../UI/PrimaryButton'

export default function Home () {
  return (
    <div className="flex flex-col items-center space-y-8 p-4">
      <h1 className="text-4xl font-bold">Willkommen!</h1>
      <p className="text-lg text-center">
        Ziel dieses SQL-Trainers ist es, den Entwurf von <b>SELECT-Abfragen</b> einzuüben.
        <br/>
        Aus einem Pool von insgesamt über <b>300 Fragen</b> werden zufällig Aufgaben ausgewählt und vom Nutzer bearbeitet.
        Die vom Nutzer geschriebenen Anfragen, werden anschließend direkt im Browser ausgeführt und mit einer Musterlösung verglichen.
      </p>
      <p className="text-lg text-center">
        Hierzu wird im Browser selbst eine kleine <b>SQLite-Datenbank</b> betrieben in der die Aufgaben ausgeführt werden.
        <br/>
        Diese Datenbank versteht den großteil des SQL-Standards, den auch Oracle oder MySQL verwenden, hat aber gewisse Einschränkungen, beispielsweise bei der Verarbeitung von <i>Date</i> Typen.
      </p>
      <p className="text-lg text-center pb-6">
        Wenn Sie die unterstützten Befehle nachschlagen möchten, stellt <b>SQLite.org</b> eine <b><a href="https://www.sqlite.org/lang.html">entsprechende Übersicht</a></b> bereit.
      </p>

      <Link to="/sqltrainer/selection">
        <PrimaryButton>Weiter</PrimaryButton>
      </Link>
    </div>
  )
}
