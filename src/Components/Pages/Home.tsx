import { Link } from 'react-router-dom'
import PrimaryButton from '../UI/PrimaryButton'

export default function Home() {
  return (
    <div className="flex flex-col items-center space-y-8 p-4">
      <h1 className="text-4xl font-bold">Willkommen!</h1>
      <p className="text-lg text-center">
        Ziel dieses <b>SQL-Trainers</b> ist es, dem Nutzer verschiedene Aufgaben
        zum Entwurf von SQL-Statements zu bieten.
        <br />
        Neben über 200 Aufgaben zu SELECT-Befehlen gibt es außerdem knapp 160
        DML-Aufgaben, sowie fast 40 DDL-Aufgaben.
      </p>
      <p className="text-lg text-center">
        Die Aufgaben sind dabei auf die 5 Themenbereiche Busfahrten,
        Fahrradhersteller, Theather, Reisen und Fußball verteilt.
        <br />
        Jeder Themenbereich ist dabei weiter in 3 Schwierigkeitsgrade (Leicht,
        Mittel und Schwer) aufgeteilt.
      </p>
      <p className="text-lg text-center">
        Die vom Nutzer geschriebenen Anfragen, werden anschließend direkt im
        Browser ausgeführt und mit einer Musterlösung verglichen.
        <br />
        Hierzu wird im Browser selbst eine kleine <b>SQLite-Datenbank</b>{' '}
        betrieben in der die Aufgaben ausgeführt werden.
        <br />
        SQLite versteht den Großteil des SQL-Standards, den auch Oracle oder
        MySQL verwenden, hat aber gewisse Einschränkungen, beispielsweise bei
        der Verarbeitung von <i>Date</i> Typen.
      </p>
      <p className="text-lg text-center pb-6">
        Wenn Sie die unterstützten Befehle nachschlagen möchten, stellt{' '}
        <b>SQLite.org</b> eine{' '}
        <b>
          <a href="https://www.sqlite.org/lang.html">entsprechende Übersicht</a>
        </b>{' '}
        bereit.
      </p>

      <Link to="/sqltrainer/selection">
        <PrimaryButton>Weiter</PrimaryButton>
      </Link>
    </div>
  )
}
