import { Task } from '../Types/Task'

export const dmlTasks: Task[] = [
  {
    id: 128,
    schema: 'busse',
    difficulty: 'schwer',
    text:
      'Löschen Sie den Mitarbeiter, der die meisten Fahrten im Einsatzplan hatte!',
    solutionQuery:
      'DELETE FROM mitarbeiter WHERE mita_id = (SELECT mita_id FROM einsatzplan GROUP BY mita_id ORDER BY COUNT(*) DESC LIMIT 1)',
    taskType: 2,
  },
  {
    id: 129,
    schema: 'busse',
    difficulty: 'schwer',
    text:
      'Löschen Sie den Mitarbeiter, der im Einsatzplan alle Fahrzeuge gefahren ist!',
    solutionQuery:
      'DELETE FROM mitarbeiter AS m WHERE NOT EXISTS (SELECT * FROM busse b WHERE NOT EXISTS (SELECT * FROM einsatzplan e WHERE e.mita_id = m.mita_id AND b.fahrzeug_id = e.fahrzeug_id))',
    taskType: 2,
  },
  {
    id: 130,
    schema: 'busse',
    difficulty: 'schwer',
    text:
      'Löschen Sie die Linie, die eine Verbindung mit der größten Fahrstrecke gefahren ist!',
    solutionQuery:
      'DELETE FROM linie AS l WHERE linien_id = (SELECT l.linien_id FROM linie l, bestehen b WHERE b.linien_id = l.linien_id AND b.kanten_id = (SELECT v.kanten_id FROM verbindung v WHERE v.fahrstrecke = (SELECT MAX(v2.fahrstrecke) FROM verbindung v2)))',
    taskType: 2,
  },
  {
    id: 250,
    schema: 'fussball',
    difficulty: 'leicht',
    text:
      'Österreich nimmt jetzt doch an der WM teil mit dem Trainer Josef Höbli und in der Gruppe D. Tragen Sie dies ein!',
    solutionQuery:
      "INSERT INTO nation (nationname, trainername, gruppe) VALUES ('Österreich', 'Josef Höbli', 'D')",
    taskType: 1,
  },
  {
    id: 252,
    schema: 'fussball',
    difficulty: 'leicht',
    text:
      'Natürlich stand Deutschland im Finale als mannschaft_1. Ändern Sie dies in der Datenbank.',
    solutionQuery:
      "UPDATE spiele SET mannschaft_1 = 'Deutschland' WHERE typ = 'Finale'",
    taskType: 3,
  },
  {
    id: 253,
    schema: 'fussball',
    difficulty: 'leicht',
    text:
      'Das Spiel, das in der Datenbank mit 0:0 eingetragen wurde und in einer Stadt mit F am Anfang gespielt wurde, ist falsch bearbeitet worden. Das Ergebnis ist 1:0. Ändern Sie dies!',
    solutionQuery:
      "UPDATE spiele SET ergebnis = '1:0' WHERE ausfuehrungsort like 'F%' AND ergebnis LIKE '0:0'",
    taskType: 3,
  },
  {
    id: 254,
    schema: 'fussball',
    difficulty: 'leicht',
    text:
      'Ändern Sie das Ergebnis von dem Spiel, bei dem Argentinien 0:0 gespielt hat, auf 2:3.',
    solutionQuery:
      "UPDATE spiele SET ergebnis = '2:3' WHERE (mannschaft_1 = 'Argentinien'  OR Mannschaft_2 = 'Argentinien') AND ergebnis = '0:0'",
    taskType: 3,
  },
  {
    id: 255,
    schema: 'fussball',
    difficulty: 'leicht',
    text:
      'Alle Spiele, die in Berlin stattfinden sollten, finden nun in Köln statt. Berichtigen Sie dies in der Datenbank!',
    solutionQuery:
      "UPDATE spiele SET ausfuehrungsort = 'Köln' WHERE ausfuehrungsort = 'Berlin'",
    taskType: 3,
  },
  {
    id: 257,
    schema: 'fussball',
    difficulty: 'leicht',
    text:
      'Alle Spieler, deren Nachname mit Y anfängt, sollen gelöscht werden.',
    solutionQuery: "DELETE FROM Spieler WHERE Nachname LIKE 'Y%'",
    taskType: 2,
  },
  {
    id: 258,
    schema: 'fussball',
    difficulty: 'leicht',
    text:
      "Die Funktion bei den Spielern soll von 'mittelfeld' einfach nur in 'mittel' geändert werden.",
    solutionQuery:
      "UPDATE spieler SET funktion = 'Mittel' WHERE funktion = 'Mittelfeld'",
    taskType: 3,
  },
  {
    id: 259,
    schema: 'fussball',
    difficulty: 'leicht',
    text:
      'Löschen Sie alle Spieler, die bei Costa Rica im Mittelfeld spielen!',
    solutionQuery:
      "DELETE FROM spieler  WHERE NATIONNAME = 'Costa Rica'  AND Funktion = 'Mittelfeld'",
    taskType: 2,
  },
  {
    id: 119,
    schema: 'busse',
    difficulty: 'mittel',
    text:
      'Ändern Sie den Namen der Firma auf "Abwrack" in der Inspektionstabelle, deren Busse die größte Anzahl an Sitzplätzen enthält!',
    solutionQuery:
      "UPDATE inspektionen SET firma = 'Abwrack' WHERE fahrzeug_id IN (SELECT fahrzeug_id FROM busse WHERE anzahl_sitzplaetze >= (SELECT MAX(anzahl_sitzplaetze) FROM busse))",
    taskType: 3,
  },
  {
    id: 121,
    schema: 'busse',
    difficulty: 'schwer',
    text:
      'Ändern Sie den Vornamen des Mitarbeiters auf Hans, der den niedrigsten Stundenlohn besitzt!',
    solutionQuery:
      "UPDATE mitarbeiter SET vorname = 'Hans' WHERE vorname in (SELECT vorname FROM mitarbeiter m, busfahrer b WHERE b.mita_id = m.mita_id AND b.stundenlohn <= (SELECT MIN(stundenlohn) FROM busfahrer))",
    taskType: 3,
  },
  {
    id: 122,
    schema: 'busse',
    difficulty: 'schwer',
    text:
      'Löschen Sie alle Mitarbeiter, deren Gehalt größer ist als das Durchschnittsgehalt aller Nichtbusfahrer!',
    solutionQuery:
      'DELETE FROM mitarbeiter WHERE mita_id IN (SELECT mita_id FROM nichtbusfahrer WHERE gehalt >= (SELECT AVG(gehalt) FROM nichtbusfahrer))',
    taskType: 2,
  },
  {
    id: 123,
    schema: 'busse',
    difficulty: 'schwer',
    text:
      'Ändern Sie den Vornamen des Mitarbeiters auf Hugo, der alle Führerscheinklassen besitzt!',
    solutionQuery:
      "UPDATE mitarbeiter SET vorname = 'Hugo' WHERE mita_id = (SELECT m.mita_id FROM busfahrer b, mitarbeiter m WHERE m.mita_id = b.mita_id AND NOT EXISTS (SELECT * FROM fuehrerscheinklassen f WHERE NOT EXISTS (SELECT * FROM besitzt_fuehrerschein bf WHERE bf.mita_id = b.mita_id AND bf.fklassen_id = f.fklassen_id)))",
    taskType: 3,
  },
  {
    id: 124,
    schema: 'busse',
    difficulty: 'schwer',
    text:
      'Ändern Sie die Bezeichnung der Linie in RB28, die unter allen Beschränkungen fährt!',
    solutionQuery:
      "UPDATE linie SET bezeichnung = 'RB28' WHERE linien_id = (SELECT l.linien_id FROM linie l WHERE NOT EXISTS (SELECT * FROM beschraenkungen be WHERE NOT EXISTS (SELECT * FROM linie_beschraenkungen lb WHERE lb.linien_id = l.linien_id AND be.beschr_id = lb.beschr_id)))",
    taskType: 3,
  },
  {
    id: 262,
    schema: 'fussball',
    difficulty: 'mittel',
    text:
      'Alle Spiele von England in der Vorrunde haben in Gummersbach stattgefunden. Bitte Ändern Sie das.',
    solutionQuery:
      "UPDATE spiele SET ausfuehrungsort = 'Gummersbach' WHERE (mannschaft_1 = 'England'  OR mannschaft_2 = 'England') AND typ = 'Vorrunde'",
    taskType: 3,
  },
  {
    id: 263,
    schema: 'fussball',
    difficulty: 'mittel',
    text:
      "Löschen Sie alle Torhüter (Funktion ist 'torhueter') aus Costa Rica!",
    solutionQuery:
      "DELETE FROM Spieler WHERE NATIONNAME = 'Costa Rica'  AND Funktion = 'Torhueter'",
    taskType: 2,
  },
  {
    id: 265,
    schema: 'fussball',
    difficulty: 'mittel',
    text:
      'Philipp Lahm hat in der 86. Minute im ersten Spiel mit der ID 1 ein Tor geschossen. Tragen Sie dieses Tor noch zusätzlich ein!',
    solutionQuery:
      "INSERT INTO tore (minute, spiel_id, spieler_id) VALUES (86, 1, (SELECT spieler_id FROM spieler WHERE vorname LIKE 'Philipp%' AND nachname LIKE 'Lahm%'))",
    taskType: 1,
  },
  {
    id: 267,
    schema: 'fussball',
    difficulty: 'mittel',
    text:
      'Löschen Sie alle brasilianischen Spieler, die keine Tore geschossen haben.',
    solutionQuery:
      "DELETE FROM spieler WHERE spieler_id IN (SELECT spieler.spieler_id FROM spieler, tore WHERE spieler.nationname='Brasilien' AND spieler.spieler_id NOT IN (SELECT tore.spieler_id FROM tore, spieler WHERE  tore.spieler_id=spieler.spieler_id))",
    taskType: 2,
  },
  {
    id: 268,
    schema: 'fussball',
    difficulty: 'mittel',
    text:
      'Der Trainer der mannschaft_1, der nur Spiele in Dortmund betreut hat, heißt eigentlich "Koosheeder". Ändern Sie das!',
    solutionQuery:
      "UPDATE nation SET trainername = 'Koosheeder' WHERE trainername in (SELECT n.trainername FROM   spiele w, nation n WHERE  w.MANNSCHAFT_1 = n.NATIONNAME AND w.AUSFUEHRUNGSORT = 'Dortmund' AND  n.TRAINERNAME NOT IN (SELECT n.trainername FROM   spiele w, nation n WHERE  w.MANNSCHAFT_1 = n.NATIONNAME AND    w.AUSFUEHRUNGSORT != 'Dortmund'))",
    taskType: 3,
  },
  {
    id: 269,
    schema: 'fussball',
    difficulty: 'mittel',
    text:
      'Der Spieler aus Polen mit dem höchsten Gehalt soll gelöscht werden.',
    solutionQuery:
      "DELETE FROM spieler WHERE nationname = 'Polen' AND gehalt_in_euro = (SELECT MAX(gehalt_in_euro) FROM spieler WHERE nationname = 'Polen')",
    taskType: 2,
  },
  {
    id: 270,
    schema: 'fussball',
    difficulty: 'mittel',
    text:
      'Der Spieler aus Deutschland mit dem höchsten Jahresgehalt soll 20500 Euro weniger bekommen. Ändern Sie dieses.',
    solutionQuery:
      "UPDATE spieler SET gehalt_in_euro=gehalt_in_euro-20500 WHERE nationname ='Deustchland' AND gehalt_in_euro = (SELECT MAX(gehalt_in_euro) FROM spieler WHERE nationname LIKE 'Deutschland')",
    taskType: 3,
  },
  {
    id: 271,
    schema: 'fussball',
    difficulty: 'mittel',
    text:
      'Der Trainername, der den Spieler mit der ID 55 trainiert, ist falsch. Er heißt "Lagerfeldt". Ändern Sie den Trainernamen.',
    solutionQuery:
      "UPDATE nation SET trainername = 'Lagerfeldt' WHERE trainername = (SELECT trainername FROM spieler, nation  WHERE spieler.nationname = nation.nationname  AND spieler.spieler_ID = 55)",
    taskType: 3,
  },
  {
    id: 272,
    schema: 'fussball',
    difficulty: 'mittel',
    text: 'Löschen Sie alle Spieler, die kein Tor geschossen haben.',
    solutionQuery:
      'DELETE FROM spieler WHERE NOT EXISTS (SELECT tore.spieler_id FROM tore WHERE spieler.spieler_id = tore.spieler_id)',
    taskType: 2,
  },
  {
    id: 273,
    schema: 'fussball',
    difficulty: 'schwer',
    text:
      'Ändern Sie den Trainernamen der Mannschaft, die in der Vorrunde die meisten Tore kassiert hat, auf "Kniggel".',
    solutionQuery:
`WITH mannschaft_1_kassiert_tore AS (
    SELECT mannschaft_1 AS mannschaft,
          SUM(SUBSTR(spiele.ergebnis, 3, 1)) AS teil_kassiert_tore
    FROM spiele WHERE Typ = 'Vorrunde' GROUP BY mannschaft_1
),
mannschaft_2_kassiert_tore AS (
    SELECT mannschaft_2 AS mannschaft, 
           SUM(SUBSTR(spiele.ergebnis, 1, 1)) AS teil_kassiert_tore
    FROM spiele WHERE Typ = 'Vorrunde' GROUP BY mannschaft_2
),
mannschaft_kassiert_tore AS (
    SELECT mannschaft, 
           SUM(teil_kassiert_tore) AS kassiert_tore 
    FROM (
        SELECT * FROM mannschaft_1_kassiert_tore 
        UNION SELECT * FROM mannschaft_2_kassiert_tore
    ) 
    GROUP BY mannschaft
)
UPDATE nation SET trainername = 'Kniggel' WHERE nationname = (
    SELECT mannschaft 
    FROM mannschaft_kassiert_tore 
    GROUP BY mannschaft
    ORDER BY kassiert_tore DESC LIMIT 1
)`,
    taskType: 3,
  },
  {
    id: 274,
    schema: 'fussball',
    difficulty: 'schwer',
    text:
      'Geben Sie folgende Bestellung neu ein: Die Bestellung hat die ID 4 und wurde von der Person getätigt, die bisher noch keine Bestellungen durchgeführt hat. Es ist für das Spiel, welches Polen gewonnen hat. Die Anzahl der bestellten und reservierten Karten ist 5 und die max. Preiskategorie ist 2.',
    solutionQuery:
      "INSERT INTO bestellungen (bestell_id, personen_id, spiel_id, anzahl_gewuenschter_karten, anzahl_reservierter_karten, max_preiskategorie) VALUES (4,(SELECT personen_id FROM personen WHERE NOT EXISTS (SELECT bestellungen.personen_id FROM bestellungen WHERE bestellungen.personen_id = personen.personen_id)), (SELECT spiele.SPIEL_ID FROM spiele   WHERE spiele.MANNSCHAFT_1 = 'Polen'   AND SUBSTR(spiele.ergebnis, 1, 1)> SUBSTR(spiele.ergebnis, 3, 1)   UNION  SELECT spiele.SPIEL_ID FROM spiele  WHERE spiele.MANNSCHAFT_2 = 'Polen'   AND SUBSTR(spiele.ergebnis, 1, 1)< SUBSTR(spiele.ergebnis, 3, 1)), 5,5,2)",
    taskType: 1,
  },
  {
    id: 276,
    schema: 'fussball',
    difficulty: 'schwer',
    text:
      'Ändern Sie die Gruppe auf H bei der Mannschaft, die kein Spiel gewonnen hat.',
    solutionQuery:
      "UPDATE nation SET gruppe = 'H' WHERE nationname in (SELECT spiele.MANNSCHAFT_1 as Manschaft   FROM spiele  WHERE Mannschaft_1 not IN  (SELECT mannschaft_1 FROM spiele   WHERE substr(Ergebnis, 1,1) > 0)    INTERSECT  SELECT spiele.MANNSCHAFT_2 as Manschaft   FROM spiele  WHERE Mannschaft_2 not IN  (SELECT mannschaft_2 FROM spiele   WHERE substr(Ergebnis, 3,1) > 0))",
    taskType: 3,
  },
  {
    id: 277,
    schema: 'fussball',
    difficulty: 'schwer',
    text:
      'Ändern Sie den Trainernamen der Mannschaft, die die Weltmeisterschaft gewonnen hat, auf "Spaghotti"!',
    solutionQuery:
      "UPDATE nation SET trainername = 'Spaghotti' WHERE nationname in (SELECT Mannschaft_1 FROM Spiele WHERE TYP = 'Finale' and SUBSTR(Ergebnis, 1,1) > SUBSTR(Ergebnis, 3,1) union SELECT Mannschaft_2 FROM Spiele WHERE TYP = 'Finale' and SUBSTR(Ergebnis, 3,1) > SUBSTR(Ergebnis, 1,1))",
    taskType: 3,
  },
  {
    id: 278,
    schema: 'fussball',
    difficulty: 'schwer',
    text:
      'Setzen Sie die Gehälter der Spieler, die am meisten verdienen, um 5% hoch.',
    solutionQuery:
      'UPDATE spieler SET gehalt_in_euro = gehalt_in_euro * 1.05 WHERE gehalt_in_euro >= (SELECT MAX(gehalt_in_euro) FROM spieler)',
    taskType: 3,
  },
  {
    id: 279,
    schema: 'fussball',
    difficulty: 'schwer',
    text:
      'Löschen Sie alle Karten von den Spielen, in denen kein Tor gefallen ist.',
    solutionQuery:
      'DELETE FROM karten WHERE karten_id IN (SELECT karten_id FROM karten WHERE spiel_id IN (SELECT spiel_id FROM spiele WHERE NOT EXISTS (SELECT spiel_id FROM tore WHERE spiele.spiel_id = tore.spiel_id)))',
    taskType: 2,
  },
  {
    id: 280,
    schema: 'fussball',
    difficulty: 'schwer',
    text: 'Löschen Sie alle Personen, die keine Karten bestellt haben!',
    solutionQuery:
      'DELETE FROM personen WHERE NOT EXISTS (SELECT personen_id FROM karten WHERE personen.personen_id = karten.personen_id)',
    taskType: 2,
  },
  {
    id: 281,
    schema: 'fussball',
    difficulty: 'schwer',
    text:
      'Der Nachname des Spielers, der am meisten Tore geschossen hat, soll auf "Wagner" geändert werden.',
    solutionQuery:
      "UPDATE spieler SET nachname = 'Wagner' WHERE spieler_id = (SELECT spieler_id FROM tore GROUP BY spieler_id ORDER BY COUNT(*) DESC LIMIT 1)",
    taskType: 3,
  },
  {
    id: 282,
    schema: 'fussball',
    difficulty: 'schwer',
    text: 'Löschen Sie alle Karten von dem Spiel mit dem meisten Toren.',
    solutionQuery:
      'DELETE FROM karten WHERE spiel_id = (SELECT spiel_id FROM tore GROUP BY spiel_id ORDER BY COUNT(*) DESC LIMIT 1)',
    taskType: 2,
  },
  {
    id: 201,
    schema: 'reisen',
    difficulty: 'leicht',
    text:
      'Der neue Kunde heisst mit Vornamen "Andreas" und mit Namen "Fischer". Die Adresse lautet: Zülpicher Str.4, 50674 Köln. Die Kundennummer soll eine Zahl höher sein, als die bisher höchste.',
    solutionQuery:
      "INSERT INTO kunde (kundennr, vorname, name, adresse) values ((select max(kundennr)+1 from kunde),'Andreas','Zülpicher Str.4, 50674 Köln','Fischer')",
    taskType: 1,
  },
  {
    id: 202,
    schema: 'reisen',
    difficulty: 'leicht',
    text:
      'Die Hotels mit der höchsten Klasse bekommen noch einen Punkt dazu. Ändern Sie dieses in der Datenbank.',
    solutionQuery:
      'UPDATE hotel SET klasse = klasse + 1 WHERE klasse = (SELECT MAX(klasse) FROM hotel)',
    taskType: 3,
  },
  {
    id: 203,
    schema: 'reisen',
    difficulty: 'leicht',
    text:
      'Geben Sie folgendes Hotel in die Datenbank ein: Der Name ist "Gummersbacher Inn" und es steht in Köln. Die Klasse ist genauso wie die bisher am höchsten vergebene Klasse. Es hat jeweils 100 Einzel- und Doppelzimmer, wobei ein Einzelzimmer 300 Euro und ein Doppelzimmer 500 Euro kostet.',
    solutionQuery:
      "INSERT INTO hotel (hotelname, stadtname, klasse, anzahlez, anzahldz, preisez, preisdz) VALUES ('Gummersbacher Inn', 'Köln', (SELECT MAX(klasse) FROM hotel), 100, 100, 300, 500)",
    taskType: 1,
  },
  {
    id: 204,
    schema: 'reisen',
    difficulty: 'leicht',
    text:
      'Fügen Sie folgende neue Reisezeit ein: \\nDie Zeit soll eins höher sein, als die bisher höchste. Die Reisezeit ist 18, Flughafen 1 ist "Düsseldorf Flughafen" und Flughafen 2 ist "Ufa Aeroport"',
    solutionQuery:
      "INSERT INTO reisezeit (zeit, rzeit, flughafen1, flughafen2) VALUES ((SELECT MAX(zeit)+1 FROM reisezeit), 18, 'Düsseldorf Flughafen', 'Ufa Aeroport')",
    taskType: 1,
  },
  {
    id: 205,
    schema: 'reisen',
    difficulty: 'leicht',
    text: 'Löschen Sie alle Städte, von denen es keine Abhängigkeiten gibt.',
    solutionQuery:
      'DELETE FROM stadt WHERE NOT EXISTS (SELECT * FROM hotel WHERE hotel.stadtname = stadt.stadtname)',
    taskType: 2,
  },
  {
    id: 206,
    schema: 'reisen',
    difficulty: 'leicht',
    text:
      'Ein neues Hotel hat eröffnet. Es heisst "Kingdom" und steht in Köln. Es hat die höchste Klasse, die es momentan gibt. Ausserdem hat es jeweils 100 Einzel- und Doppelzimmer, wobei ein Einzelzimmer 200 Euro und ein Doppelzimmer 350 Euro kostet. Tragen Sie das neue Hotel ein.',
    solutionQuery:
      "INSERT INTO hotel (hotelname, stadtname, klasse, anzahlez, anzahldz, preisez, preisdz) VALUES ('Kingdom', 'Köln', (SELECT MAX(klasse) FROM hotel), 100, 100, 200, 350)",
    taskType: 1,
  },
  {
    id: 207,
    schema: 'reisen',
    difficulty: 'leicht',
    text:
      'Setzen Sie die Anzahl der gebuchten Einzelzimmer auf 20 bei der Buchung, die am meisten gebuchte Einzelzimmer hat.',
    solutionQuery:
      'UPDATE buchung SET gebuchteez = 20 WHERE gebuchteez = (SELECT MAX(gebuchteez) FROM buchung)',
    taskType: 3,
  },
  {
    id: 208,
    schema: 'reisen',
    difficulty: 'leicht',
    text:
      'Setzen Sie die Zeit auf 5 bei der Buchung mit den wenigsten gebuchten Doppelzimmern.',
    solutionQuery:
      'UPDATE buchung SET zeit = 5 WHERE gebuchtedz = (SELECT MIN(gebuchtedz) FROM buchung)',
    taskType: 3,
  },
  {
    id: 209,
    schema: 'reisen',
    difficulty: 'leicht',
    text:
      'Löschen Sie alle Kunden, die ein Hotel gebucht haben, welches über mehr Einzelzimmer als Doppelzimmer verfügt!',
    solutionQuery:
      'DELETE FROM kunde WHERE kundennr = (SELECT k.kundennr FROM kunde k, hotel h, buchung b WHERE h.anzahlez > h.anzahldz AND h.stadtname = b.stadtname AND b.kundennr = k.kundennr)',
    taskType: 2,
  },
  {
    id: 210,
    schema: 'reisen',
    difficulty: 'leicht',
    text:
      'Das Hotel, in dem die Doppelzimmer am teuersten sind, hat geschlossen und soll aus der Datenbank gelöscht werden.',
    solutionQuery:
      'DELETE FROM hotel WHERE preisdz = (SELECT MAX(preisdz) FROM hotel)',
    taskType: 2,
  },
  {
    id: 211,
    schema: 'reisen',
    difficulty: 'mittel',
    text:
      'Bei dem Kunden mit den meisten gebuchten Einzelzimmern ist ein falscher Vorname eingetragen. Ändern Sie den Namen auf "Erna".',
    solutionQuery:
      "UPDATE kunde SET vorname = 'Erna' WHERE kundennr = (SELECT kundennr FROM buchung WHERE gebuchteez = (SELECT MAX(gebuchteez) FROM buchung))",
    taskType: 3,
  },
  {
    id: 212,
    schema: 'reisen',
    difficulty: 'mittel',
    text: 'Löschen Sie alle Kunden, die keine Buchung getätigt haben.',
    solutionQuery:
      'DELETE FROM kunde WHERE kundennr IN (SELECT kundennr FROM kunde WHERE NOT EXISTS (SELECT kundennr FROM buchung WHERE buchung.kundennr = kunde.kundennr))',
    taskType: 2,
  },
  {
    id: 213,
    schema: 'reisen',
    difficulty: 'mittel',
    text: 'Löschen Sie alle Hotels, die in den USA stehen!',
    solutionQuery:
      "DELETE FROM hotel WHERE stadtname IN (SELECT stadtname FROM stadt WHERE land LIKE 'USA%')",
    taskType: 2,
  },
  {
    id: 214,
    schema: 'reisen',
    difficulty: 'mittel',
    text:
      'Ändern Sie den Vornamen auf "Hugo" und den Namen auf "Bügel" bei dem Kunden, der in einer Buchung die meisten Einzelzimmer gebucht hat.',
    solutionQuery:
      "UPDATE kunde SET vorname = 'Hugo', name = 'Bügel' WHERE kundennr = (SELECT kundennr FROM buchung WHERE buchung.kundennr = kunde.kundennr AND gebuchteez = (SELECT MAX(gebuchteez) FROM buchung))",
    taskType: 3,
  },
  {
    id: 215,
    schema: 'reisen',
    difficulty: 'mittel',
    text:
      'Löschen Sie alle Buchungen, die für eine Stadt in Deutschland vorgenommen wurden!',
    solutionQuery:
      "DELETE FROM buchung WHERE stadtname IN (SELECT stadtname FROM stadt WHERE land LIKE 'Deutschland%')",
    taskType: 2,
  },
  {
    id: 216,
    schema: 'reisen',
    difficulty: 'mittel',
    text:
      'Löschen Sie alle Hotels, für die es momentan keine Buchungen gibt!',
    solutionQuery:
      'DELETE FROM hotel WHERE hotelname IN (SELECT hotelname FROM hotel WHERE NOT EXISTS (SELECT kundennr FROM buchung WHERE buchung.hotelname = hotel.hotelname))',
    taskType: 2,
  },
  {
    id: 217,
    schema: 'reisen',
    difficulty: 'mittel',
    text:
      'Alle Hotels, die in den USA stehen, senken ihre Preise für Einzelzimmer um 10 Euro. Führen Sie die Änderung durch.',
    solutionQuery:
      "UPDATE hotel SET preisez = preisez - 10 WHERE stadtname IN (SELECT stadtname FROM stadt WHERE land LIKE 'USA%')",
    taskType: 3,
  },
  {
    id: 218,
    schema: 'reisen',
    difficulty: 'mittel',
    text:
      'Ändern Sie den flughafen1 bei der Reisezeit auf den einzigen Flughafen in der USA bei der Zeit, die am häufigsten gebucht wurde.',
    solutionQuery:
      "UPDATE reisezeit SET flughafen1 = (SELECT flughafen FROM stadt WHERE land LIKE 'USA%') WHERE zeit = (SELECT zeit FROM buchung GROUP BY zeit ORDER BY COUNT(*) DESC LIMIT 1)",
    taskType: 3,
  },
  {
    id: 219,
    schema: 'reisen',
    difficulty: 'mittel',
    text:
      'Alle Hotels, die die höchste Klasse haben, bekommen einen Anbau geschenkt und haben jetzt 50 Einzelzimmer mehr. Ändern Sie die entsprechenden Daten!',
    solutionQuery:
      'UPDATE hotel SET anzahlez = anzahlez +50 WHERE klasse = (SELECT MAX(klasse) FROM hotel)',
    taskType: 3,
  },
  {
    id: 220,
    schema: 'reisen',
    difficulty: 'schwer',
    text:
      "Ändern Sie den flughafen1 bei der Reisezeit auf 'Düsseldorf Flughafen', bei der Zeit, die am meisten gebucht worden ist.",
    solutionQuery:
      "UPDATE reisezeit SET flughafen1 = 'Düsseldorf Flughafen' WHERE zeit = (SELECT zeit FROM buchung GROUP BY zeit ORDER BY COUNT(*) DESC LIMIT 1)",
    taskType: 3,
  },
  {
    id: 1,
    schema: 'fahrrad',
    difficulty: 'leicht',
    text:
      'Ein neuer Angestellter fängt in der Abteilung 6 (Datenverarbeitung) an. Sein Vorname ist "Anton" und sein Name "Becker". Er ist männlich (m), Informatiker und seine Aufgabe ist das "Backup der Datenbank" zu erstellen. Fügen Sie den neuen Angestellten in die Datenbank ein!',
    solutionQuery:
      "INSERT INTO angestellte (vorname, nachname, abt_nr, aufgabenbeschreibung, beruf, geschlecht) VALUES ('Anton', 'Becker', 6, 'Backup der Datenbank', 'Informatiker', 'm')",
    taskType: 1,
  },
  {
    id: 2,
    schema: 'fahrrad',
    difficulty: 'leicht',
    text:
      'Durch eine Sonderaktion soll der Preis aller Fahrräder um 10% gesenkt werden. Führen Sie diese Aktion durch.',
    solutionQuery: 'UPDATE artikel SET verkaufspreis = verkaufspreis * 0.9',
    taskType: 3,
  },
  {
    id: 3,
    schema: 'fahrrad',
    difficulty: 'leicht',
    text:
      'Die Abteilung "Vertrieb" wird von Dortmund nach Gelsenkirchen verlegt. Führen Sie diese Aktion durch!',
    solutionQuery:
      "UPDATE abteilungen SET ort = 'Gelsenkirchen' WHERE name LIKE 'Vertrieb%'",
    taskType: 3,
  },
  {
    id: 4,
    schema: 'fahrrad',
    difficulty: 'leicht',
    text:
      'Der Lieferant "Wahle" ist Konkurs gegangen und stellt seine Lieferungen ein. Deswegen kann dieser Lieferant aus der Datenbank gelöscht werden. Führen Sie diese Aktion durch!',
    solutionQuery: "DELETE FROM lieferanten WHERE name LIKE 'Wahle%'",
    taskType: 2,
  },
  {
    id: 5,
    schema: 'fahrrad',
    difficulty: 'leicht',
    text:
      'Die Fahrräder werden ab jetzt auch in gold lackiert. Dazu muss ein neues Teil in die Teile-Tabelle eingeben werden. Die Mengeneinheit ist "kg", die Bezeichnung ist "Goldfarbe", der Typ ist "Material", die Herstellungskosten betragen 100 Euro und der Mindestbestand soll auf 25 gesetzt werden. Außerdem betragen die Herstelldauer und die Lieferzeit jeweils 15 Tage.',
    solutionQuery:
      "INSERT INTO teile (me, bezeichnung, typ, herstellkosten, mindestbestand, lieferzeit, herstelldauer) VALUES ('kg', 'Goldfarbe', 'Material', 100, 25, 15, 15)",
    taskType: 1,
  },
  {
    id: 8,
    schema: 'fahrrad',
    difficulty: 'leicht',
    text:
      'Unser Angestellter "Otto Schmidt" geht in den wohlverdienten Ruhestand. Löschen Sie dazu den Angestellten aus der Tabelle.',
    solutionQuery:
      "DELETE FROM angestellte WHERE nachname LIKE 'Schmidt%' AND vorname LIKE 'Otto%'",
    taskType: 2,
  },
  {
    id: 9,
    schema: 'fahrrad',
    difficulty: 'leicht',
    text:
      'Die Gehälter der Angestellten sollen angepasst werden. Alle Angestellten, die weniger als der Durchschnitt aller Gehälter verdienen, sollen 100 Euro mehr Gehalt bekommen.',
    solutionQuery:
      'UPDATE angestellte \nSET gehalt = gehalt + 100 \nWHERE gehalt < (SELECT AVG(gehalt) FROM angestellte)',
    taskType: 3,
  },
  {
    id: 10,
    schema: 'fahrrad',
    difficulty: 'leicht',
    text:
      'Der Angestellte "Holger Kall" wird von der Abteilung "Arbeitsvorbereitung" mit der Abteilungsnummer 5 zur Abteilung 4 (Einkauf) versetzt. Führen Sie diese Aktion durch.',
    solutionQuery:
      "UPDATE angestellte SET abt_nr = 4 WHERE nachname LIKE 'Kall%' AND vorname LIKE 'Holger%'",
    taskType: 3,
  },
  {
    id: 11,
    schema: 'fahrrad',
    difficulty: 'mittel',
    text:
      'Es soll ein neues Werk mit einem neuen Büro auf der Zülpicher Str.4 in Köln eröffnet werden. Fügen Sie dieses Werk in die Tabelle ein!',
    solutionQuery:
      "INSERT INTO werke (bezeichnung, ort, strasse) VALUES ('Büro', 'Köln', 'Zülpicher Str.4')",
    taskType: 1,
  },
  {
    id: 13,
    schema: 'fahrrad',
    difficulty: 'mittel',
    text:
      'Unsere Angestellte, Frau "Anna Weber", hat geheiratet und heisst jetzt "Anna Meier". Sie ist angestellt als Informatiker. Ändern Sie den Namen von Frau Meier. Beachten Sie, dass in unserer Firma zwei Frauen mit dem Namen Anna Weber arbeiten.',
    solutionQuery:
      'UPDATE angestellte SET nachname = "Meier" WHERE UPPER(vorname) LIKE "ANNA%" AND UPPER(nachname) LIKE "WEBER%" AND UPPER(beruf) LIKE "INFORMATIKER%"',
    taskType: 3,
  },
  {
    id: 14,
    schema: 'fahrrad',
    difficulty: 'mittel',
    text:
      'Der Angestellte "Willi Brater" mit der Angestelltennummer 12 ist krank. Deswegen übernimmt "Susanne Bar" alle seine Aufträge. Bitte Ändern Sie dies in der Datenbank.',
    solutionQuery:
      "UPDATE auftraege SET ang_nr = (SELECT ang_nr FROM angestellte WHERE vorname LIKE 'Susanne%' AND nachname LIKE 'Bar%') WHERE ang_nr = 12",
    taskType: 3,
  },
  {
    id: 15,
    schema: 'fahrrad',
    difficulty: 'mittel',
    text:
      'Es steht eine Gehaltserhöhung an, aber nicht alle Angestellten sollen mehr Gehalt bekommen. Nur die Angestellten in der Gehaltsklasse 6 bekommen 10% mehr Lohn. Führen Sie diese Aktion durch.',
    solutionQuery:
      'UPDATE angestellte SET gehalt = gehalt * 1.1 WHERE gehalt BETWEEN (SELECT min_gehalt FROM geh_klassen WHERE geh_klasse = 6) AND (SELECT max_gehalt FROM geh_klassen WHERE geh_klasse = 6)',
    taskType: 3,
  },
  {
    id: 16,
    schema: 'fahrrad',
    difficulty: 'mittel',
    text:
      'Es wird die neue Abteilung "Versand" aufgemacht. Die Leiterin dieser Abteilung wird Frau Erna Wanne sein. Die Abteilung wird in Köln aufgemacht. Tragen Sie die neue Abteilung ein.',
    solutionQuery:
      "INSERT INTO abteilungen (leiter, name, ort) VALUES ((SELECT ang_nr FROM angestellte WHERE nachname ='Wanne' AND vorname ='Erna'), 'Versand', 'Köln')",
    taskType: 1,
  },
  {
    id: 17,
    schema: 'fahrrad',
    difficulty: 'mittel',
    text:
      'Bei dem Auftrag mit der Nummer 2 wurde der falsche Angestellte eingetragen. Der Auftrag wurde von Susanne Bar bearbeitet. Bitte Ändern Sie dies.',
    solutionQuery:
      "UPDATE auftraege SET ang_nr = (SELECT ang_nr FROM angestellte WHERE vorname LIKE 'Susanne%' AND nachname LIKE 'Bar%') WHERE auftragsnr = 2",
    taskType: 3,
  },
  {
    id: 18,
    schema: 'fahrrad',
    difficulty: 'mittel',
    text:
      'Bei allen Artikel, die weniger als der Durchschnitt an Jahresumsatz haben, soll der Preis um 5% gesenkt werden, um den Verkauf anzukurbeln.',
    solutionQuery:
      'UPDATE artikel SET verkaufspreis = verkaufspreis * 0.95 WHERE jahresumsatz < (SELECT AVG(jahresumsatz) FROM artikel)',
    taskType: 3,
  },
  {
    id: 19,
    schema: 'fahrrad',
    difficulty: 'mittel',
    text: 'Alle Artikel ohne einen Auftrag sollen gelöscht werden.',
    solutionQuery:
      'DELETE FROM artikel AS a WHERE NOT EXISTS (SELECT * FROM auftragspositionen b WHERE a.tnr = b.tnr)',
    taskType: 2,
  },
  {
    id: 20,
    schema: 'fahrrad',
    difficulty: 'mittel',
    text:
      'Alle Angestellten, die später als Herr Willi Brater angefangen haben, sind entlassen worden und sollen nun gelöscht werden.',
    solutionQuery:
      "DELETE FROM angestellte WHERE eintrittsdatum > (SELECT eintrittsdatum FROM angestellte WHERE nachname LIKE 'Brater%')",
    taskType: 2,
  },
  {
    id: 21,
    schema: 'fahrrad',
    difficulty: 'mittel',
    text:
      'Die Gehälter der Angestellten sollen angepasst werden. Alle Angestellten, die weniger als der Durchschnitt aller GehÃ¤lter verdienen, sollen 100 Euro mehr Gehalt bekommen.',
    solutionQuery:
      'UPDATE angestellte \nSET gehalt = gehalt + 100 \nWHERE gehalt < (SELECT AVG(gehalt) FROM angestellte)',
    taskType: 3,
  },
  {
    id: 22,
    schema: 'fahrrad',
    difficulty: 'mittel',
    text:
      'Unsere Angestellte, Frau Anna Weber, hat geheiratet und heißt jetzt Anna Meier. Sie ist angestellt als Informatiker. Ändern Sie den Namen von Frau Meier. Beachten Sie, dass in unserer Firma zwei Frauen mit dem Namen Anna Weber arbeiten.',
    solutionQuery:
      "UPDATE angestellte SET nachname = 'Meier' WHERE UPPER(vorname) LIKE 'ANNA%' AND UPPER(nachname) LIKE 'WEBER%' AND UPPER(beruf) LIKE 'INFORMATIKER%'",
    taskType: 3,
  },
  {
    id: 23,
    schema: 'fahrrad',
    difficulty: 'schwer',
    text:
      'Das Werk zur Vorfertigung wird geschlossen. Die Vorfertigung erfolgt nun auch im Werk mit der Montage. Setzen Sie in der Tabelle "teile_werke" dazu nun alle Werk-ID\'s auf das Werk mit der Montage.',
    solutionQuery:
      "UPDATE teile_werke SET wnr = (SELECT wnr FROM werke WHERE bezeichnung = 'Montagewerk') WHERE wnr = (SELECT wnr FROM werke WHERE bezeichnung LIKE 'Vorfertigung%')",
    taskType: 3,
  },
  {
    id: 24,
    schema: 'fahrrad',
    difficulty: 'schwer',
    text:
      'Der Lieferant, der alle Materialien liefern kann, soll gelöscht werden.',
    solutionQuery:
      "DELETE FROM lieferanten WHERE lief_nr = (SELECT a.lief_nr FROM lieferanten a WHERE NOT EXISTS (SELECT * FROM teile t WHERE t.typ = 'Material' AND NOT EXISTS (SELECT * FROM lieferprogramme b WHERE a.lief_nr = b.lief_nr AND t.tnr = b.tnr)))",
    taskType: 2,
  },
  {
    id: 25,
    schema: 'fahrrad',
    difficulty: 'schwer',
    text:
      'Alle Artikel, für die momentan kein Auftrag vorliegt, sollen gelöscht werden.',
    solutionQuery:
      'DELETE FROM artikel WHERE tnr IN (SELECT a.tnr FROM artikel a WHERE NOT EXISTS (SELECT tnr FROM auftragspositionen b WHERE a.tnr = b.tnr))',
    taskType: 2,
  },
  {
    id: 26,
    schema: 'fahrrad',
    difficulty: 'schwer',
    text:
      'Für alle Teile, die in allen Lagern gelagert werden, soll der Bestand auf 5000 gesetzt werden.',
    solutionQuery:
      'UPDATE lagerbestand SET bestand = 5000 WHERE tnr IN (SELECT DISTINCT tnr FROM lagerbestand l WHERE NOT EXISTS (SELECT * FROM lagerbestand l1 WHERE NOT EXISTS (SELECT * FROM lagerbestand l2 WHERE l.lanr != l2.lanr AND l.tnr = l2.tnr AND l1.lanr != l2.lanr)))',
    taskType: 3,
  },
  // CONNECT BY is an Oracle SQL feature that doesn't exist in SQLite.
  // While it's in theory possible to construct an SQLite query that will recursively gather descendants
  // of a tree structure like this, it'd be pretty complicated.
  //
  // {
  //   id: 27,
  //   schema: 'fahrrad',
  //   difficulty: 'schwer',
  //   text:
  //     'Die Lieferzeit und Herstelldauer von allen Teilen, die ein Unterteil des "Scott ATACAMA TOUR" (tnr = 60) sind, beträgt jetzt 15 Tage. Ändern Sie dies in der Datenbank.',
  //   solutionQuery:
  //     'UPDATE teile SET lieferzeit = 15, herstelldauer = 15 WHERE tnr IN (SELECT uteil FROM struktur START WITH oteil = 60 CONNECT BY PRIOR uteil = oteil)',
  //   taskType: 3,
  // },
  {
    id: 28,
    schema: 'fahrrad',
    difficulty: 'schwer',
    text:
      'Bei allen Teilen, die einen höheren Einkaufspreis als den Durchschnitt haben, soll der Mindestbestand auf 30 erhöht werden.',
    solutionQuery:
      'UPDATE teile SET mindestbestand = 30 WHERE tnr IN (SELECT tnr FROM teile WHERE einkaufspreis >= (SELECT AVG(einkaufspreis) FROM teile))',
    taskType: 3,
  },
  {
    id: 29,
    schema: 'fahrrad',
    difficulty: 'schwer',
    text:
      'Die Angestellten, die einen gleichen Nachnamen wie einer der Kunden haben, sollen gelöscht werden.',
    solutionQuery:
      'DELETE FROM angestellte WHERE nachname IN (SELECT nachname FROM angestellte INTERSECT SELECT nachname FROM kunden)',
    taskType: 2,
  },
  {
    id: 30,
    schema: 'fahrrad',
    difficulty: 'schwer',
    text:
      'Durch eine Sonderaktion sollen für Artikel, für die momentan ein Auftrag vorliegt, der Verkaufspreis auf 1000 Euro gesetzt werden.',
    solutionQuery:
      'UPDATE artikel SET verkaufspreis = 1000 WHERE tnr IN (SELECT DISTINCT a.tnr FROM artikel a, (SELECT tnr FROM auftragspositionen) b WHERE a.tnr = b.tnr)',
    taskType: 3,
  },
  {
    id: 31,
    schema: 'fahrrad',
    difficulty: 'schwer',
    text:
      'Die Teile, die nicht in allen Werken produziert werden, sollen gelöscht werden.',
    solutionQuery:
      'DELETE FROM teile WHERE tnr IN (SELECT tnr FROM teile_werke tw1 WHERE NOT EXISTS (SELECT tnr FROM teile_werke tw2 WHERE tw1.wnr != tw2.wnr AND tw1.tnr = tw2.tnr))',
    taskType: 2,
  },
  {
    id: 32,
    schema: 'fahrrad',
    difficulty: 'schwer',
    text:
      'Bei allen Teilen, die der Lieferant 2, aber nicht der Lieferant 1 liefert, soll der Mindestbestand auf 50 gesetzt werden.',
    solutionQuery:
      'UPDATE teile SET mindestbestand = 50 WHERE tnr IN (SELECT tnr FROM lieferprogramme WHERE lief_nr = 2) AND tnr NOT IN (SELECT tnr FROM lieferprogramme WHERE lief_nr = 1)',
    taskType: 3,
  },
  {
    id: 100,
    schema: 'busse',
    difficulty: 'leicht',
    text:
      'Es gibt einen Zahlendreher bei den Busskennzeichen. Der Bus mit dem Kennzeichen GM-K 12 hat eigentlich das Kennzeichen GM-K 21. Korrigieren Sie dies!',
    solutionQuery: "UPDATE busse SET kfz_knz = 'GM-K 21' WHERE kfz_knz = 'GM-K 12'",
    taskType: 3,
  },
  {
    id: 101,
    schema: 'busse',
    difficulty: 'leicht',
    text:
      'Fügen Sie eine neue Führerscheinklasse mit der ID 4 ein. Das Kürzel lautet C und es ist eine Busklasse. Man darf diesen Führerschein "ab 21 Jahre" erhalten und der Bus darf maximal 50 Stizplätze enthalten!',
    solutionQuery:
      "INSERT INTO fuehrerscheinklassen VALUES (4, 'C', 'Busklasse', 'ab 21 Jahre', 50)",
    taskType: 1,
  },
  {
    id: 102,
    schema: 'busse',
    difficulty: 'leicht',
    text:
      'Der Mitarbeiter Simon Schmitt arbeitet nicht mehr im Busbetrieb. Löschen Sie ihn!',
    solutionQuery:
      "DELETE FROM mitarbeiter WHERE vorname LIKE 'Simon' AND nachname LIKE 'Schmitt%'",
    taskType: 2,
  },
  {
    id: 103,
    schema: 'busse',
    difficulty: 'leicht',
    text:
      'Der Name der Haltestelle Rubbelroth wurde versehentlich als Rebbelroth eingetragen! Berichtigen Sie dies!',
    solutionQuery:
      "UPDATE haltestelle SET name_der_haltestelle = 'Rubbelroth' WHERE name_der_haltestelle = 'Rebbelroth'",
    taskType: 3,
  },
  {
    id: 104,
    schema: 'busse',
    difficulty: 'leicht',
    text:
      'Fügen Sie eine neue Linie mit der ID = 10 und der Bezeichnung L401 ein!',
    solutionQuery: "INSERT INTO linie VALUES (10, 'L401')",
    taskType: 1,
  },
  {
    id: 105,
    schema: 'busse',
    difficulty: 'leicht',
    text:
      'Der Bus mit der fahrzeug_id 1 ist beschädigt und kann nicht fahren. Löschen Sie ihn aus dem Einsatzplan!',
    solutionQuery: 'DELETE FROM einsatzplan WHERE fahrzeug_id = 1',
    taskType: 2,
  },
  {
    id: 107,
    schema: 'busse',
    difficulty: 'leicht',
    text:
      'Der Mitarbeiter mit der mita_id 10 wurde krank. Seine Fahrten übernimmt der Mitarbeiter mit der mita_id 12. Ändern Sie dies im Einsatzplan!',
    solutionQuery: 'UPDATE einsatzplan SET mita_id = 12 WHERE mita_id = 10',
    taskType: 3,
  },
  {
    id: 108,
    schema: 'busse',
    difficulty: 'leicht',
    text:
      'Die Inspektionen bei der Firma VeServ haben nie stattgefunden. Bitte löschen Sie diese aus der Tabelle!',
    solutionQuery: "DELETE FROM inspektionen WHERE firma = 'VeServ'",
    taskType: 2,
  },
  {
    id: 109,
    schema: 'busse',
    difficulty: 'leicht',
    text: 'Ändern Sie alle Richtungen der Linie 4 auf Köln in den Fahrten!',
    solutionQuery: "UPDATE fahrten SET richtung = 'Köln' WHERE linien_id = 4",
    taskType: 3,
  },
  {
    id: 110,
    schema: 'busse',
    difficulty: 'mittel',
    text:
      'Löschen Sie alle Haltestellen, die nicht in der Tabelle Verbindung auftauchen!',
    solutionQuery:
      'DELETE FROM haltestelle WHERE haltestellen_id NOT IN (SELECT bis FROM verbindung) AND haltestellen_id NOT IN (SELECT von FROM verbindung)',
    taskType: 2,
  },
  {
    id: 113,
    schema: 'busse',
    difficulty: 'mittel',
    text:
      'Der ICE TransGum fährt die 50km lange Strecke vom Köln Hbf (K Hbf) bis Gummersbach innerhalb von 30 Minuten. Tragen Sie die neue Verbindung ein!',
    solutionQuery:
      "INSERT INTO verbindung (kanten_id, bis, von, fahrzeit, fahrstrecke) VALUES ((SELECT MAX(kanten_id)+1 FROM verbindung), (SELECT haltestellen_id FROM haltestelle WHERE name_der_haltestelle LIKE 'Gummersbach%'), (SELECT haltestellen_id FROM haltestelle WHERE name_der_haltestelle LIKE 'K Hbf%'), 30, 50)",
    taskType: 1,
  },
  {
    id: 114,
    schema: 'busse',
    difficulty: 'mittel',
    text:
      'Löschen Sie alle Fahrten, die nicht im Einsatzplan berücksichtigt wurden!',
    solutionQuery:
      'DELETE FROM fahrten WHERE fahrt_id NOT IN (SELECT fahrt_id FROM einsatzplan)',
    taskType: 2,
  },
  {
    id: 115,
    schema: 'busse',
    difficulty: 'mittel',
    text:
      'Ändern Sie die Lohnsteuerklasse der Mitarbeiter auf 5, die als Techniker angestellt sind!',
    solutionQuery:
      "UPDATE mitarbeiter SET lohnst_klasse = 5 WHERE mita_id IN (SELECT mita_id FROM nichtbusfahrer WHERE taetigkeit LIKE 'Techniker%')",
    taskType: 3,
  },
  {
    id: 116,
    schema: 'busse',
    difficulty: 'mittel',
    text:
      'Löschen Sie alle Linien aus der Tabelle "bestehen" mit der Linienbezeichnung L301!',
    solutionQuery:
      "DELETE FROM bestehen WHERE linien_id = (SELECT linien_id FROM linie WHERE bezeichnung LIKE 'L301%')",
    taskType: 2,
  },
  {
    id: 117,
    schema: 'busse',
    difficulty: 'mittel',
    text:
      'Löschen Sie alle Linien, die nicht in der Tabelle "bestehen" aufgeführt sind!',
    solutionQuery:
      'DELETE FROM linie WHERE linien_id NOT IN (SELECT linien_id FROM bestehen)',
    taskType: 2,
  },
  {
    id: 118,
    schema: 'busse',
    difficulty: 'mittel',
    text:
      'Ändern Sie die Richtung der Fahrten auf "K Hbf", deren fahrt_id nicht in der Tabelle "Einsatzplan" auftaucht!',
    solutionQuery:
      "UPDATE fahrten SET richtung = 'K Hbf' WHERE fahrt_id NOT IN (SELECT fahrt_id FROM einsatzplan)",
    taskType: 3,
  },
  {
    id: 221,
    schema: 'reisen',
    difficulty: 'schwer',
    text:
      'Es soll die Buchung gelöscht werden mit den zweithöchsten gebuchten Einzelzimmern.',
    solutionQuery:
      'DELETE FROM buchung WHERE buchungsnr = (SELECT b1.buchungsnr FROM buchung b1, (SELECT ROW_NUMBER() OVER(ORDER BY gebuchteez DESC) as rowcount, buchungsnr FROM buchung) b2  WHERE b1.buchungsnr = b2.buchungsnr AND rowcount = 2)',
    taskType: 2,
  },
  {
    id: 222,
    schema: 'reisen',
    difficulty: 'schwer',
    text:
      'Ändern Sie die Anzahl der gebuchte Einzelzimmer auf 20 bei der Buchung, die am drittmeisten gebuchte Einzelzimmer hat.',
    solutionQuery:
      'UPDATE buchung SET gebuchteez = 20 WHERE gebuchteez = (SELECT b1.gebuchteez FROM buchung b1, (SELECT ROW_NUMBER() OVER(ORDER BY gebuchteez DESC) as rowcount, gebuchteez FROM buchung) b2 WHERE b2.gebuchteez = b1. gebuchteez AND rowcount = 3)',
    taskType: 3,
  },
  {
    id: 223,
    schema: 'reisen',
    difficulty: 'schwer',
    text:
      'Setzen Sie den Preis vom Doppelzimmer bei dem Hotel um 30 Euro höher, dass bis jetzt die meisten gebuchten Doppelzimmer hat.',
    solutionQuery:
      'UPDATE hotel SET preisdz = preisdz + 30 WHERE hotelname = (SELECT hotelname FROM buchung GROUP BY hotelname ORDER BY SUM(gebuchtedz) DESC LIMIT 1)',
    taskType: 3,
  },
  {
    id: 225,
    schema: 'reisen',
    difficulty: 'schwer',
    text:
      'Setzen Sie bei allen Buchungen die Kundennummer auf 4, wobei der Stadtname genau der ist, der am häufigsten in den Buchungen vorkommt.',
    solutionQuery:
      'UPDATE buchung SET kundennr = 4 WHERE stadtname IN (SELECT stadtname FROM buchung GROUP BY stadtname HAVING COUNT(*) = (SELECT COUNT(*) FROM buchung GROUP BY stadtname ORDER BY COUNT(*) DESC LIMIT 1))',
      
    taskType: 3,
  },
  {
    id: 226,
    schema: 'reisen',
    difficulty: 'schwer',
    text:
      'Setzen Sie alle Vornamen der Kunden auf Hans und den Namen auf Fies für Kunden, die eine Buchung für eine Stadt in Deutschland vorgenommen haben.',
    solutionQuery:
      "UPDATE kunde SET vorname = 'Hans', name = 'Fies' WHERE kundennr IN (SELECT kundennr FROM buchung WHERE stadtname IN (SELECT stadtname FROM stadt WHERE land LIKE 'Deutschland%'))",
    taskType: 3,
  },
  {
    id: 228,
    schema: 'reisen',
    difficulty: 'schwer',
    text:
      'In dem Hotel, wo die Preise für die Doppelzimmer am drittteuersten sind, sollen die Preise nochmal um 20 Euro für die Doppelzimmer erhöht werden.',
    solutionQuery:
      'UPDATE hotel SET preisdz = preisdz + 20 WHERE preisdz = (SELECT h1.preisdz FROM hotel h1, (SELECT ROW_NUMBER() OVER(ORDER BY preisdz DESC) as rowcount, preisdz FROM hotel) h2 WHERE h2.preisdz = h1.preisdz AND rowcount = 3)',
    taskType: 3,
  },
  {
    id: 229,
    schema: 'reisen',
    difficulty: 'schwer',
    text:
      'Ein neues Hotel hat eröffnet. Es heisst Kingdom und steht in Köln. Es hat die höchste Klasse, die es momentan gibt. Ausserdem hat es 100 Doppelzimmer. Die Anzahl der Einzelzimmer beträgt soviel, wie die dritthöchste Anzahl bisher eingetragener Einzelzimmer. Ein Einzelzimmer 200 Euro und ein Doppelzimmer 350 Euro kostet. Tragen Sie das neue Hotel ein.',
    solutionQuery:
      "INSERT INTO hotel (hotelname, stadtname, klasse, anzahlez, anzahldz, preisez, preisdz) VALUES ('Kingdom', 'Köln', (SELECT MAX(klasse) FROM hotel), (SELECT h1.anzahlez FROM hotel h1, (SELECT ROW_NUMBER() OVER(ORDER BY anzahlez DESC) AS rowcount, anzahlez FROM hotel) h2 WHERE h1.anzahlez = h2.anzahlez AND rowcount = 3), 100, 200, 350)",
    taskType: 1,
  },
  {
    id: 150,
    schema: 'theater',
    difficulty: 'leicht',
    text:
      'Tragen Sie das Stadttheater in Köln ein. Dort werden Musicals aufgeführt.',
    solutionQuery:
      "INSERT INTO theater (name, sparte, ort) VALUES ('Stadttheater', 'Musical', 'Köln')",
    taskType: 1,
  },
  {
    id: 151,
    schema: 'theater',
    difficulty: 'leicht',
    text:
      'Löschen Sie alle Schauspieler, denen keine Rolle zugeteilt worden ist.',
    solutionQuery:
      'DELETE FROM schauspieler AS sch WHERE NOT EXISTS (SELECT * FROM stellt_dar st WHERE sch.pnr = st.pnr)',
    taskType: 2,
  },
  {
    id: 152,
    schema: 'theater',
    difficulty: 'leicht',
    text: 'Löschen Sie den Autor, der aus Augsburg kommt!',
    solutionQuery: "DELETE FROM dichter WHERE geburtsort LIKE 'Augsburg%'",
    taskType: 2,
  },
  {
    id: 153,
    schema: 'theater',
    difficulty: 'leicht',
    text: 'Alle Dramen von Goethe sollen gelöscht werden.',
    solutionQuery:
      "DELETE FROM drama WHERE autor = (SELECT autor FROM dichter WHERE autor LIKE 'Goethe')",
    taskType: 2,
  },
  {
    id: 154,
    schema: 'theater',
    difficulty: 'leicht',
    text:
      "Bei dem Drama 'Faust' wurde der falsche Autor eingetragen. Das Stück stammt von Berthold Brecht.",
    solutionQuery:
      "UPDATE drama SET autor = 'Berthold Brecht' WHERE titel LIKE 'Faust%'",
    taskType: 3,
  },
  {
    id: 156,
    schema: 'theater',
    difficulty: 'leicht',
    text:
      'Bei dem Theater, in dem Musikals aufgeführt werden, ist der Ort Mainz. Bitte ändern Sie das!',
    solutionQuery:
      "UPDATE theater SET ort = 'Mainz' WHERE sparte LIKE 'Musiktheater%'",
    taskType: 3,
  },
  {
    id: 159,
    schema: 'theater',
    difficulty: 'leicht',
    text:
      'Bei dem Stück, das angeblich in Hamburg uraufgeführt wurde, ist der falsche Ort eingetragen. Es wurde in Wiesbaden uraufgeführt. Ändern Sie dies.',
    solutionQuery:
      "UPDATE drama SET ort_urauffuehrung = 'Wiesbaden' WHERE ort_urauffuehrung LIKE 'Hamburg%'",
    taskType: 3,
  },
  {
    id: 160,
    schema: 'theater',
    difficulty: 'mittel',
    text:
      'Löschen Sie alle Schauspieler, denen keine Rolle zugeteilt worden ist.',
    solutionQuery:
      'DELETE FROM schauspieler AS sch WHERE NOT EXISTS (SELECT * FROM stellt_dar st WHERE sch.pnr = st.pnr)',
    taskType: 2,
  },
  {
    id: 161,
    schema: 'theater',
    difficulty: 'mittel',
    text:
      'Löschen Sie alle Dramen, in denen die Anzahl der Rollen am wenigsten ist.',
    solutionQuery:
      'DELETE FROM drama WHERE titel IN (SELECT titel FROM rolle GROUP BY titel HAVING COUNT(*) = (SELECT COUNT(*) FROM rolle GROUP BY titel ORDER BY COUNT(*) LIMIT 1))',
    taskType: 2,
  },
  {
    id: 162,
    schema: 'theater',
    difficulty: 'mittel',
    text:
      'Der Schauspieler Andre Jung übernimmt die Rolle des Lopachin. Tragen Sie diese Zuordnung ein.',
    solutionQuery:
      "INSERT INTO stellt_dar (pnr, figur) VALUES ((SELECT pnr FROM schauspieler WHERE name LIKE 'Andre Jung%'), 'Lopachin')",
    taskType: 1,
  },
  {
    id: 163,
    schema: 'theater',
    difficulty: 'mittel',
    text: 'Löschen Sie alle Theater, in denen es kein Engament gibt.',
    solutionQuery:
      'DELETE FROM theater WHERE NOT EXISTS (SELECT * FROM engament WHERE theater.name = engament.name)',
    taskType: 2,
  },
  {
    id: 164,
    schema: 'theater',
    difficulty: 'mittel',
    text:
      'Alle Dichter, die kein Theaterstück(Drama) haben, sollen gelöscht werden.',
    solutionQuery:
      'DELETE FROM dichter AS di WHERE NOT EXISTS (SELECT autor FROM drama dr WHERE di.autor = dr.autor)',
    taskType: 2,
  },
  {
    id: 165,
    schema: 'theater',
    difficulty: 'mittel',
    text:
      'Der älteste Dichter ist verstorben. Löschen Sie ihn aus der Datenbank.',
    solutionQuery:
      'DELETE FROM dichter WHERE autor = (SELECT autor FROM dichter ORDER BY geburtsjahr LIMIT 1)',
    taskType: 2,
  },
  {
    id: 166,
    schema: 'theater',
    difficulty: 'mittel',
    text:
      'Der zweitälteste Dichter wurde in Köln geboren. Das wurde falsch eingetragen. Berichtigen Sie dies.',
    solutionQuery:
      "UPDATE dichter SET geburtsort = 'Köln' WHERE autor = (SELECT autor FROM (SELECT ROW_NUMBER() OVER(ORDER BY geburtsjahr) as rn, autor FROM dichter) WHERE rn = 2)",
    taskType: 3,
  },
  {
    id: 167,
    schema: 'theater',
    difficulty: 'mittel',
    text:
      'Alle Dichter, die momentan kein Drama haben, sollen aus der Datenbank gelöscht werden.',
    solutionQuery: 'DELETE FROM dichter WHERE autor NOT IN (SELECT autor FROM drama)',
    taskType: 2,
  },
  {
    id: 168,
    schema: 'theater',
    difficulty: 'mittel',
    text: 'Alle Dramen von Tschechow sollen gelöscht werden.',
    solutionQuery:
      "DELETE FROM drama WHERE titel IN (SELECT titel FROM drama d, dichter di WHERE di.autor = d.autor AND di.autor LIKE 'Tschechow%')",
    taskType: 2,
  },
  {
    id: 171,
    schema: 'theater',
    difficulty: 'schwer',
    text: 'Löschen Sie alle Schauspieler, die alle Rollen gespielt haben.',
    solutionQuery:
      'DELETE FROM schauspieler WHERE pnr IN (SELECT pnr FROM schauspieler s WHERE NOT EXISTS (SELECT * FROM rolle r WHERE NOT EXISTS (SELECT * FROM stellt_dar st WHERE r.figur = st.figur AND st.pnr = s.pnr)))',
    taskType: 2,
  },
  {
    id: 173,
    schema: 'theater',
    difficulty: 'schwer',
    text:
      'Der Dichter, der die meisten Dramen geschrieben hatte, ist leider verstorben und kann aus der Datenbank gelöscht werden.',
    solutionQuery:
      'DELETE FROM dichter WHERE autor = (SELECT autor FROM drama GROUP BY autor ORDER BY COUNT(*) DESC LIMIT 1)',
    taskType: 2,
  },
  {
    id: 174,
    schema: 'theater',
    difficulty: 'schwer',
    text:
      'Beim Engagement, das im Star Theater stattfindet, ist der falsche Schauspieler eingetragen. Es war der Schauspieler mit den meisten Rollen. Ändern Sie dies!',
    solutionQuery:
      "UPDATE engament SET pnr = (SELECT pnr FROM stellt_dar GROUP BY pnr ORDER BY COUNT(*) DESC LIMIT 1) WHERE name = 'Star Theater'",
    taskType: 3,
  },
  {
    id: 175,
    schema: 'theater',
    difficulty: 'schwer',
    text:
      'Ändern Sie den Namen (Tabelle: stellt_dar, Spalte: name) des Schauspielers, der die meisten Rollen hat, auf Jochen Blub.',
    solutionQuery:
      "UPDATE schauspieler SET name = 'Jochen Blub' WHERE pnr = (SELECT pnr FROM stellt_dar GROUP BY pnr ORDER BY COUNT(*) DESC LIMIT 1)",
    taskType: 3,
  },
  {
    id: 176,
    schema: 'theater',
    difficulty: 'schwer',
    text:
      'Löschen Sie alle Schauspieler, die schon mal in einem Schauspielhaus eine Rolle hatten!',
    solutionQuery:
      "DELETE FROM schauspieler WHERE pnr IN (SELECT DISTINCT s.pnr FROM theater t, engament e, schauspieler s WHERE sparte = 'Schauspielhaus' AND t.name = e.name AND s.pnr = e.pnr)",
    taskType: 2,
  },
  {
    id: 177,
    schema: 'theater',
    difficulty: 'schwer',
    text:
      'Alle Dichter, die momentan keine Theaterstücke haben, sollen gelöscht werden.',
    solutionQuery:
      'DELETE FROM dichter WHERE NOT EXISTS (SELECT * FROM drama dr WHERE dr.autor = dichter.autor)',
    taskType: 2,
  },
  {
    id: 178,
    schema: 'theater',
    difficulty: 'schwer',
    text:
      'Alle Schauspieler, die in einem Drama von Schiller eine Rolle spielen, ziehen für die Rolle nach Köln. Führen Sie diese Änderung durch!',
    solutionQuery:
      "UPDATE schauspieler SET wohnort = 'Köln' WHERE pnr IN (SELECT pnr FROM stellt_dar WHERE figur IN (SELECT figur FROM rolle WHERE autor IN (SELECT autor FROM dichter WHERE autor LIKE 'Schiller%')))",
    taskType: 3,
  },
  {
    id: 179,
    schema: 'theater',
    difficulty: 'schwer',
    text:
      'Alle Schauspieler, die in einem Musiktheater gespielt haben, sollen gelöscht werden.',
    solutionQuery:
      "DELETE FROM schauspieler WHERE pnr IN (SELECT DISTINCT pnr FROM engament e, theater t WHERE t.name LIKE e.name AND t.sparte LIKE 'Musiktheater%')",
    taskType: 2,
  },
  {
    id: 50,
    schema: 'welt',
    difficulty: 'leicht',
    text:
      'Es gab einen Zahlendreher bei der Länge der Grenze zwischen Österreich und Deutschland. Die Länge beträgt 748 und nicht 784. Bitte berichtigen Sie dies!',
    solutionQuery:
      "UPDATE borders SET length = 748 WHERE country1 = 'A' AND country2 = 'D'",
    taskType: 3,
  },
  {
    id: 51,
    schema: 'welt',
    difficulty: 'leicht',
    text:
      'In der Tabelle Religion wurden keine Atheisten eingetragen. Tragen Sie für Deutschland D, Atheist mit 25 Prozent ein!',
    solutionQuery:
      "INSERT INTO religion (country, religion, percentage) VALUES ('D', 'Atheist', 25)",
    taskType: 1,
  },
  {
    id: 52,
    schema: 'welt',
    difficulty: 'leicht',
    text:
      'Deutschland (D) tritt aus der NATO aus. Bitte löschen Sie den Eintrag aus der Tabelle ismember!',
    solutionQuery:
      "DELETE FROM ismember WHERE country = 'D' and abbreviation = 'NATO'",
    taskType: 2,
  },
  {
    id: 53,
    schema: 'welt',
    difficulty: 'leicht',
    text:
      'Tragen Sie in den ethnischen Gruppen (Tabelle ethnicgroup) die folgenden Werte ein: D für Deutschland, Russian mit 0.2 Prozent',
    solutionQuery: "INSERT INTO ethnicgroup VALUES ('D', 'Russian', 0.2)",
    taskType: 1,
  },
  {
    id: 54,
    schema: 'welt',
    difficulty: 'leicht',
    text:
      'Das Bruttoinlandsprodukt (GDP) Deutschlands ist um 50.000 gestiegen. Ändern Sie den Wert auf 1492200 in der Tabelle economy!',
    solutionQuery: "UPDATE economy SET gdp = 1492200 WHERE country = 'D'",
    taskType: 3,
  },
  {
    id: 55,
    schema: 'welt',
    difficulty: 'leicht',
    text:
      'Bitte tragen Sie die Antarktis in die Tabelle continent mit einer Größe von 13200123 ein.',
    solutionQuery: "INSERT INTO continent VALUES ('Antarctic', 13200123)",
    taskType: 1,
  },
  {
    id: 56,
    schema: 'welt',
    difficulty: 'leicht',
    text:
      "Die in Spanien am meisten gesprochene Sprache 'kastilisch' wurde vergessen einzutragen. Bitte tragen Sie in die Tabelle 'language' für E, Castilian mit 74 Prozent ein.",
    solutionQuery: "INSERT INTO language VALUES ('E', 'Castilian', 74)",
    taskType: 1,
  },
  {
    id: 57,
    schema: 'welt',
    difficulty: 'leicht',
    text:
      "Es wurde eine falsche Höhe für den Brocken in der Tabelle 'mountain' eingetragen. Ändern Sie den Wert auf 1041!",
    solutionQuery: "UPDATE mountain SET height = 1041 WHERE mountain LIKE 'Brocken%'",
    taskType: 3,
  },
  {
    id: 58,
    schema: 'welt',
    difficulty: 'leicht',
    text:
      'Die Organisation OPEC wurde aufgelöst. Bitte löschen Sie den Eintrag aus der Tabelle organization.',
    solutionQuery: "DELETE FROM organization WHERE abbreviation LIKE 'OPEC%'",
    taskType: 2,
  },
  {
    id: 59,
    schema: 'welt',
    difficulty: 'leicht',
    text:
      'Für Belgien (B) wurde fälschlicherweise die Sprache German (deutsch) eingetragen. Bitte löschen Sie den Eintrag.',
    solutionQuery: "DELETE FROM language WHERE country ='B' and language ='German'",
    taskType: 2,
  },
  {
    id: 60,
    schema: 'welt',
    difficulty: 'mittel',
    text:
      "Ändern Sie die Größe (Spalte 'Area') des tiefsten Sees auf 33221!",
    solutionQuery:
      'UPDATE lake SET area = 33221 WHERE lake in (SELECT lake FROM lake WHERE depth >= (SELECT MAX(depth) FROM lake)',
    taskType: 3,
  },
  {
    id: 61,
    schema: 'welt',
    difficulty: 'mittel',
    text: 'Löschen Sie die größte Insel!',
    solutionQuery:
      'DELETE FROM island WHERE island in (SELECT island FROM island WHERE area >= (SELECT MAX(area) FROM island))',
    taskType: 2,
  },
  {
    id: 62,
    schema: 'welt',
    difficulty: 'mittel',
    text:
      "Fügen Sie in der Tabelle 'ismember' folgendes neues Mitglied ein: Das Land mit der höchsten Population tritt der 'NATO' als 'member' bei!",
    solutionQuery:
      "INSERT INTO ismember VALUES ((SELECT country FROM  country WHERE  population >= ALL (SELECT population from country)), 'NATO', 'member')",
    taskType: 1,
  },
  {
    id: 63,
    schema: 'welt',
    difficulty: 'mittel',
    text: 'Löschen Sie alle Länder, die keinen Seezugang haben!',
    solutionQuery:
      'DELETE FROM COUNTRY WHERE country NOT IN (SELECT COUNTRY FROM GEO_SEA)',
    taskType: 2,
  },
  {
    id: 64,
    schema: 'welt',
    difficulty: 'mittel',
    text: 'Ändern Sie die Tiefe des tiefsten Sees auf 1673!',
    solutionQuery:
      'UPDATE lake SET depth = 1673 WHERE lake in(SELECT lake FROM lake WHERE depth >= (SELECT MAX(depth) FROM lake))',
    taskType: 3,
  },
  {
    id: 65,
    schema: 'welt',
    difficulty: 'mittel',
    text:
      'Ändern Sie die Höhe des einzigen Berges in Sachsen Anhalt (Tabelle: geo_mountain) auf 1151.',
    solutionQuery:
      "UPDATE mountain SET height = 1151 WHERE mountain in (SELECT mountain FROM geo_mountain WHERE province LIKE 'Sachsen Anhalt')",
    taskType: 3,
  },
  {
    id: 66,
    schema: 'welt',
    difficulty: 'mittel',
    text:
      "Löschen Sie alle Länder aus der Tabelle 'politics', die nicht unabhängig sind und als Regierung 'federal republic' eingetragen haben.",
    solutionQuery:
      "DELETE FROM politics WHERE independence IS NOT NULL and government LIKE 'federal republic%'",
    taskType: 2,
  },
  {
    id: 67,
    schema: 'welt',
    difficulty: 'mittel',
    text:
      "Fügen Sie in den Religionen für Deutschland D 'Atheism' ein. Als Prozentwert tragen Sie die fehlenden Prozent bis zu den vollen 100% ein.",
    solutionQuery:
      "INSERT INTO religion VALUES ('D', 'Atheism', (100-(SELECT SUM(percentage) FROM religion WHERE country ='D')))",
    taskType: 1,
  },
  {
    id: 68,
    schema: 'welt',
    difficulty: 'mittel',
    text:
      "Fügen Sie für das Land, dessen weltweit einzige Hauptstadt mit Z beginnt, in der Tabelle language als Sprache 'German' mit 4 Prozent ein.",
    solutionQuery:
      "INSERT INTO language VALUES ((SELECT country FROM country WHERE capital LIKE 'Z%'), 'German', 4)",
    taskType: 1,
  },
  {
    id: 70,
    schema: 'welt',
    difficulty: 'schwer',
    text:
      'Löschen Sie alle Mitglieder der NATO aus der Tabelle ismember, die keinen Seezugang haben!',
    solutionQuery:
      "DELETE FROM ismember WHERE abbreviation = 'NATO' and country IN (SELECT country FROM COUNTRY WHERE country NOT IN (SELECT COUNTRY FROM GEO_SEA))",
    taskType: 2,
  },
  {
    id: 71,
    schema: 'welt',
    difficulty: 'schwer',
    text:
      'Ändern Sie in der Tabelle economy den Wert für industry auf 80 bei dem Land mit dem höhsten Bruttoinlandsprodukt (GDP).',
    solutionQuery:
      'UPDATE economy SET industry = 80 WHERE country = (SELECT country FROM economy WHERE gdp = (SELECT MAX(gdp) FROM economy))',
    taskType: 3,
  },
  {
    id: 72,
    schema: 'welt',
    difficulty: 'schwer',
    text:
      'Bitte tragen Sie den Kosovo (KOS) in die Tabelle ismember für die Organisation ein, die bereits am meisten Mitglieder hat!',
    solutionQuery:
      "INSERT INTO ismember VALUES ('KOS', (SELECT abbreviation FROM ismember GROUP BY abbreviation HAVING COUNT(*) >= (SELECT MAX(COUNT(*)) FROM ismember GROUP BY abbreviation)), 'member')",
    taskType: 1,
  },
  {
    id: 73,
    schema: 'welt',
    difficulty: 'schwer',
    text:
      "Fügen Sie in der Tabelle 'ethnicgroup' für das Land mit den meisten Einwohnern 'German' mit 2.5 Prozent ein!",
    solutionQuery:
      "INSERT INTO ethnicgroup VALUES ((SELECT country FROM  country WHERE  population >= ALL (  SELECT   population from country)), 'German', 2.5)",
    taskType: 1,
  },
  {
    id: 74,
    schema: 'welt',
    difficulty: 'schwer',
    text:
      "Fügen Sie für Slowenien SLO die meistgesprochene Sprache mit 2 Prozent in der Tabelle 'language' ein.",
    solutionQuery:
      "INSERT INTO language VALUES ('SLO', (SELECT language FROM language GROUP BY language HAVING COUNT(language) >= ALL(SELECT COUNT(language) FROM language GROUP BY language)), 2)",
    taskType: 1,
  },
  {
    id: 75,
    schema: 'welt',
    difficulty: 'schwer',
    text:
      "Fügen Sie in der Tabelle 'language' für das Land, in dem die meisten unterschiedlichen Sprachen gesprochen werden, 'German' mit 8 Prozent ein.",
    solutionQuery:
      "INSERT INTO language VALUES ((SELECT country FROM language GROUP BY country HAVING COUNT(*) >= (SELECT MAX(COUNT(*)) FROM language GROUP BY country)), 'German', 8)",
    taskType: 1,
  },
  {
    id: 76,
    schema: 'welt',
    difficulty: 'schwer',
    text:
      'Löschen Sie alle Städte, die sich in Europa befinden (Tabelle encompasses).',
    solutionQuery:
      "DELETE FROM city WHERE city IN (SELECT city FROM city c1 INNER JOIN encompasses c2 ON (c1.country = c2.country) WHERE continent LIKE 'Europe')",
    taskType: 2,
  },
  {
    id: 77,
    schema: 'welt',
    difficulty: 'schwer',
    text:
      "Löschen Sie alle Länder aus der Tabelle 'language', in denen mehr als zwei Sprachen gesprochen werden!",
    solutionQuery:
      'DELETE FROM language WHERE country IN (SELECT country FROM language GROUP BY country HAVING COUNT (*) > 2)',
    taskType: 2,
  },
  {
    id: 78,
    schema: 'welt',
    difficulty: 'schwer',
    text:
      "In der Tabelle 'ismember' gibt es einen Typ, der nur einmal vorkommt. Ändern Sie diesen Typ auf 'special member'.",
    solutionQuery:
      "UPDATE ismember SET type = 'special member' WHERE type =(SELECT type FROM ismember GROUP BY type HAVING COUNT(*) = 1)",
    taskType: 3,
  },
  {
    id: 79,
    schema: 'welt',
    difficulty: 'schwer',
    text:
      "Ändern Sie die Größe (Spalte 'Area') des Landes auf 600400, dessen Bevölkerungswachstum (population_growth in Tabelle population) genau dem Durchschnitt entspricht (runden Sie den Durchschnitt dazu auf zwei Nachkommastellen auf!).",
    solutionQuery:
      'UPDATE country SET area = 600400 WHERE country in (SELECT country FROM population WHERE population_growth = (SELECT ROUND(AVG(population_growth),2) FROM population))',
    taskType: 3,
  },
]
