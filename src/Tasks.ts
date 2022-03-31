import { Task } from './Types/Task'

const tasks: Task[] = [
  {
    id: '79',
    schema: 'fahrrad',
    difficulty: 'schwer',
    text: 'Welches Teil (Ausgabe: OTeil, Bezeichnung, Typ) benötigt in der Stückliste (Struktur-Tabelle) die Silberfarbe mit der TNr = 3? Listen Sie diejenigen Teile auf, die dieses Teil (TNr = 3) direkt oder indirekt in der zweiten Stufe verwenden!',
    solutionQuery: 'SELECT s.oteil, t.bezeichnung, t.typ FROM struktur s, teile t WHERE t.tnr = s.oteil AND s.uteil = 3 UNION SELECT ober.oteil, t.bezeichnung, t.typ FROM struktur ober, struktur unter, teile t WHERE t.tnr = ober.oteil AND unter.uteil = ober.oteil AND unter.uteil = 3',
    selectType: '11'
  },
  {
    id: '80',
    schema: 'fahrrad',
    difficulty: 'schwer',
    text: 'Gibt es Teile (Ausgabe: Teilenummer, Bezeichnung, Typ, Mindestbestand, Summe der Lagerbestände), deren Bestände in der Lagerbestandstabelle, summiert über alle Lager, den Mindestbestand aus der Tabelle Teile unterschreitet?',
    solutionQuery: 'SELECT t.tnr, t.bezeichnung, t.typ, t.mindestbestand, SUM(b.bestand) Bestandssumme FROM teile t, lagerbestand b WHERE t.tnr = b.tnr GROUP BY t.tnr, t.bezeichnung, t.typ, t.mindestbestand HAVING SUM(b.bestand) > (SELECT mindestbestand FROM teile t2 WHERE t2.tnr = t.tnr)',
    selectType: '8'
  },
  {
    id: '81',
    schema: 'fahrrad',
    difficulty: 'schwer',
    text: 'Welche Vertriebsangestellten (Nachname, Vorname) mit einem Gehalt größer dem maximalen Gehalt der Gehaltsklasse 4 (Tabelle geh_klassen) stammen aus Gummersbach und haben schon einmal Angebote geschrieben?',
    solutionQuery: "SELECT nachname, vorname FROM angestellte ang, abteilungen abt WHERE ang.abt_nr = abt.abt_nr AND ang.ort='Gummesbach' AND ang_nr IN (SELECT ang_nr FROM auftraege WHERE UPPER(auftrags_typ) = 'ANGEBOT') AND gehalt > (SELECT max_gehalt FROM geh_klassen WHERE geh_klasse = 4)",
    selectType: '8'
  },
  {
    id: '82',
    schema: 'fahrrad',
    difficulty: 'schwer',
    text: 'Welche Angestellten (Nach-, Vorname, Beruf, Gehalt, Gehaltsklasse) verdienen mehr als der Durchschnitt aller Gehälter? Anzeige aufsteigend sortiert nach Berufen und absteigend nach den Gehaltsklassen und den Gehältern.',
    solutionQuery: 'SELECT ang.nachname , ang.vorname, ang.beruf, ang.gehalt, geh.geh_klasse FROM angestellte ang, geh_klassen geh WHERE ang.gehalt BETWEEN geh.min_gehalt AND geh.max_gehalt AND ang.gehalt > (SELECT AVG(d.gehalt) FROM angestellte d) ORDER BY ang.beruf ASC, geh.geh_klasse DESC, ang.gehalt DESC',
    selectType: '5'
  },
  {
    id: '83',
    schema: 'fahrrad',
    difficulty: 'mittel',
    text: 'Ermitteln Sie alle Orte (keine Duplikate), in denen Kunden oder Angestellte wohnen oder beides!',
    solutionQuery: 'SELECT DISTINCT Ort FROM Kunden UNION SELECT DISTINCT ort FROM Angestellte',
    selectType: '11'
  },
  {
    id: '1',
    schema: 'fahrrad',
    difficulty: 'leicht',
    text: 'Geben Sie den insgesamt aufsummierten Bestand über alle Teile aus dem Lagerbestand aus!',
    solutionQuery: 'SELECT SUM(bestand) FROM lagerbestand',
    selectType: '12'
  },
  {
    id: '2',
    schema: 'fahrrad',
    difficulty: 'leicht',
    text: 'In wievielen Lägern wird das Fahrrad mit der TNr = 1 gelagert?',
    solutionQuery: 'SELECT count(*) FROM lagerbestand WHERE TNR = 1',
    selectType: '12'
  },
  {
    id: '3',
    schema: 'fahrrad',
    difficulty: 'schwer',
    text: 'Geben Sie die Lagernummer (LANR) und den durchschnittlichen Bestand derjenigen Lager aus, deren durchschnittlich gelagerter Bestand mindesten 50 Einheiten beträgt!',
    solutionQuery: 'SELECT lanr, avg(bestand) FROM lagerbestand group BY lanr having avg(bestand) > 50 ',
    selectType: '3'
  },
  {
    id: '9',
    schema: 'fahrrad',
    difficulty: 'mittel',
    text: 'Listen Sie bitte Nachname, Vorname, Gehalt und Abteilungsname der Informatiker auf, die in Köln beschäftigt sind! Geben Sie Nachname, Vorname Gehalt und Abteilungsnamen aus!',
    solutionQuery: "SELECT A.Nachname, A.Vorname, A.Gehalt, AB.Name FROM Angestellte A, Abteilungen AB WHERE A.Abt_nr = AB.Abt_nr AND AB.Ort = 'Köln' AND A.Beruf = 'Informatiker'",
    selectType: '4'
  },
  {
    id: '4',
    schema: 'theater',
    difficulty: 'leicht',
    text: 'Welche Schauspieler (Name, Wohnort) haben mindestes einmal im Faust mitgespielt?',
    solutionQuery: "SELECT Name, Wohnort FROM Schauspieler, Rolle, stellt_dar WHERE Schauspieler.PNr = stellt_dar.PNr AND stellt_dar.Figur = Rolle.Figur AND Rolle.Titel = 'Faust' ",
    selectType: '4'
  },
  {
    id: '5',
    schema: 'theater',
    difficulty: 'leicht',
    text: 'Welche Schauspieler ( Name, Wohnort) haben in Dramen von Schiller mitgespielt?',
    solutionQuery: "SELECT Name, Wohnort FROM Schauspieler, Rolle, stellt_dar, Drama WHERE Schauspieler.PNr = stellt_dar.PNr AND Drama.Titel = Rolle.Titel AND stellt_dar.Figur = Rolle.Figur AND Drama.Autor = 'Schiller' ",
    selectType: '4'
  },
  {
    id: '17',
    schema: 'fahrrad',
    difficulty: 'leicht',
    text: 'Welche Nachnamen in der Angestellten-Tabelle fangen mit W an ? Geben Sie nur den Nachnamen aus!',
    solutionQuery: "SELECT nachname FROM angestellte WHERE nachname LIKE 'W%'",
    selectType: '13'
  },
  {
    id: '8',
    schema: 'fahrrad',
    difficulty: 'schwer',
    text: 'Welche Angestellten (Ang_Nr, Nachname, Vorname) haben einen Nachamen der mit W beginnt und kein e enthält?',
    solutionQuery: "SELECT Ang_Nr, Nachname, Vorname FROM Angestellte WHERE Nachname LIKE 'W%' AND Nachname NOT LIKE '%e%'",
    selectType: '13'
  },
  {
    id: '16',
    schema: 'fahrrad',
    difficulty: 'leicht',
    text: 'Wieviele Elemente hat die Teile-Tabelle?',
    solutionQuery: 'SELECT COUNT(*) FROM teile',
    selectType: '12'
  },
  {
    id: '15',
    schema: 'reisen',
    difficulty: 'leicht',
    text: 'Nennen Sie alle aus Spanien erfassten Städte! Geben Sie den Stadtnamen (Spalte: Stadtname) aus!',
    solutionQuery: "select stadtname from Stadt where land = 'Spanien'",
    selectType: '1'
  },
  {
    id: '14',
    schema: 'reisen',
    difficulty: 'leicht',
    text: 'Nennen Sie Name, Vorname und Adresse aller Kunden, die ein Hotel gebucht haben, welches über mehr Einzelzimmer als Doppelzimmer verfügt!',
    solutionQuery: 'select kunde.name, kunde.vorname, kunde.adresse from kunde, hotel, buchung where hotel.anzahlez > hotel.anzahldz and hotel.stadtname = buchung.stadtname and buchung.kundennr = kunde.kundennr',
    selectType: '4'
  },
  {
    id: '18',
    schema: 'reisen',
    difficulty: 'mittel',
    text: 'Nennen Sie alle Hotels und die Städte, in denen sie liegen, für die keine Buchung vorliegt!',
    solutionQuery: 'select hotelname, hotel.stadtname from hotel, stadt where hotel.stadtname = stadt.stadtname and hotel.hotelname not in (select hotelname from buchung)',
    selectType: '5'
  },
  {
    id: '20',
    schema: 'reisen',
    difficulty: 'leicht',
    text: 'Nennen Sie Name, Einzelzimmerpreis und Doppelzimmerpreis aller erfassten Hotels in Berlin!',
    solutionQuery: "select hotelname, preisez, preisdz from hotel where stadtname = 'Berlin'",
    selectType: '1'
  },
  {
    id: '21',
    schema: 'theater',
    difficulty: 'leicht',
    text: 'Welche Schauspieler (Name, Wohnort) haben mindestes einmal im Faust mitgespielt?',
    solutionQuery: "SELECT Name, Wohnort FROM Schauspieler, Rolle, stellt_dar WHERE Schauspieler.PNr = stellt_dar.PNr AND stellt_dar.Figur = Rolle.Figur AND Rolle.Titel = 'Faust' ",
    selectType: '4'
  },
  {
    id: '22',
    schema: 'theater',
    difficulty: 'mittel',
    text: 'Welche Schauspieler (Name, Wohnort) haben in Dramen von Schiller mitgespielt?',
    solutionQuery: "select name, wohnortfrom schauspieler, rolle, stellt_dar, dramawhere schauspieler.pnr = stellt_dar.pnrand drama.titel = rolle.titeland stellt_dar.figur = rolle.figurand drama.autor = 'Schiller'",
    selectType: '4'
  },
  {
    id: '23',
    schema: 'reisen',
    difficulty: 'mittel',
    text: 'Nennen Sie die Namen der Städte, in denen es ein 5-Sterne-Hotel gibt und in denen eine Buchung vorliegt.Unterdrücken Sie Duplikate!',
    solutionQuery: 'select distinct stadtname from buchung where stadtname in (select stadtname from hotel where klasse = 5)',
    selectType: '5'
  },
  {
    id: '24',
    schema: 'theater',
    difficulty: 'leicht',
    text: "Welche Schauspieler (Name, Wohnort) haben bei in Weimar uraufgeführten Dramen an ihrem Wohnort als Figur vom Typ 'Held' mitgespielt?Unterdrücken Sie Duplikate!",
    solutionQuery: "select distinct schauspieler.name,schauspieler.wohnort from schauspieler, rolle, stellt_dar, drama where schauspieler.pnr = stellt_dar.pnr and drama.titel = rolle.titel and stellt_dar.figur = rolle.figur and rolle.typ = 'Held' and drama.Ort_urauffuehrung = 'Weimar'",
    selectType: '4'
  },
  {
    id: '25',
    schema: 'theater',
    difficulty: 'mittel',
    text: 'Welcher Dichter (Name, Wohnort) hat in einem seiner eigenen Stücke mitgespielt?',
    solutionQuery: 'select name, wohnort from schauspieler, rolle, stellt_dar, drama, dichter where schauspieler.pnr = stellt_dar.pnr and drama.titel = rolle.titel and stellt_dar.figur = rolle.figur and schauspieler.name = dichter.autor',
    selectType: '4'
  },
  {
    id: '27',
    schema: 'theater',
    difficulty: 'mittel',
    text: 'Welche Schauspieler (Name, Wohnort) haben nie gespielt?',
    solutionQuery: 'select name, wohnort from schauspieler where pnr not in (select pnr from stellt_dar)',
    selectType: '5'
  },
  {
    id: '28',
    schema: 'reisen',
    difficulty: 'schwer',
    text: 'Bestimmen Sie alle Hotels in Italien, für die keine Buchung vorliegt und geben Sie Name und Klasse dieser Hotels aus, sortiert nach Name!',
    solutionQuery: "select hotelname, klasse from hotel, stadt where hotel.stadtname = stadt.stadtname and stadt.land = 'Italien' and (hotel.hotelname, hotel.stadtname) not in (select hotelname, stadtname from buchung) order by hotel.hotelname",
    selectType: '5'
  },
  {
    id: '29',
    schema: 'theater',
    difficulty: 'schwer',
    text: 'Welche Schauspieler (Name, Wohnort) haben Faust oder Wallenstein gespielt?',
    solutionQuery: "select name, wohnort from schauspieler, rolle, stellt_dar where schauspieler.pnr = stellt_dar.pnr and stellt_dar.figur = rolle.figur and (rolle.figur = 'Faust' or rolle.figur = 'Wallenstein')",
    selectType: '4'
  },
  {
    id: '30',
    schema: 'theater',
    difficulty: 'schwer',
    text: 'Welche Schauspieler (Name, Wohnort) haben nur die Rollen Faust oder Wallenstein, d.h. keine anderen Rollen gespielt? Unterdrücken Sie Duplicate!',
    solutionQuery: "select distinct name, wohnort from schauspieler, rolle, stellt_dar where schauspieler.pnr = stellt_dar.pnr and stellt_dar.figur = rolle.figur and (rolle.figur = 'Faust' or rolle.figur = 'Wallenstein') and schauspieler.pnr not in (select schauspieler.pnr from schauspieler, rolle, stellt_dar where schauspieler.pnr = stellt_dar.pnr and stellt_dar.figur = rolle.figur and stellt_dar.figur <> 'Faust' and stellt_dar.figur <> 'Wallenstein')",
    selectType: '8'
  },
  {
    id: '31',
    schema: 'theater',
    difficulty: 'schwer',
    text: 'Welche Schauspieler (Name, Wohnort) haben alle Rollen gespielt?',
    solutionQuery: 'select name, wohnort from schauspieler, stellt_dar where schauspieler.pnr = stellt_dar.pnr group by name, wohnort having count(schauspieler.pnr) = (select count(*) from Rolle)',
    selectType: '9'
  },
  {
    id: '33',
    schema: 'theater',
    difficulty: 'schwer',
    text: "Welche Schauspieler (Name, Wohnort) haben alle Narrenrollen ( Typ = 'Narr') am Schillertheater gespielt?",
    solutionQuery: "select name, wohnort from schauspieler where not exists (select schauspieler.pnr, figur from stellt_dar, schauspieler, engament where stellt_dar.pnr = schauspieler.pnr and schauspieler.pnr = engament.pnr and engament.name = 'Schillertheater NRW' and not exists (select figur from rolle where typ = 'Narr'))",
    selectType: '9'
  },
  {
    id: '34',
    schema: 'reisen',
    difficulty: 'schwer',
    text: 'Bestimmen Sie für jedes Hotel in Köln, für das eine Reservierung vorliegt, die Zahl der Hottelbetten insgesamt und die Zahl der reservierten Betten!',
    solutionQuery: "select h.hotelname, anzahlez + 2 * anzahldz, sum (gebuchteez + 2 * gebuchtedz) as gebuchteZimmer from hotel h, buchung where h.stadtname = buchung.stadtname and h.hotelname = buchung.hotelname and h.stadtname = 'Köln' group by h.hotelname, anzahlez, anzahldz",
    selectType: '2'
  },
  {
    id: '35',
    schema: 'reisen',
    difficulty: 'schwer',
    text: 'Bestimmen Sie aus allen vorliegenden Buchungen die folgenden Daten: der Name des Hotels, die Stadt, in der es liegt, die Buchungsnummer und die Zahl der gebuchten Zimmer. Gruppieren Sie nach dem Namen des Hotels. Es sollen dabei nur solche Hotels aufgeführt werden, für die mindestens 100 Zimmer gebucht sind. Sortieren Sie das Ergebnis dann nach dem Namen des Hotels',
    solutionQuery: 'select hotelname, stadtname, buchungsnr, (gebuchteez + gebuchtedz)from buchung where (hotelname, stadtname, gebuchteez, gebuchtedz) in (select hotelname, stadtname, gebuchteez, gebuchtedz from buchung group by hotelname, stadtname, gebuchteez, gebuchtedz having (gebuchteez + gebuchtedz) >=100)order by stadtname, hotelname, buchungsnr',
    selectType: '5'
  },
  {
    id: '36',
    schema: 'fahrrad',
    difficulty: 'leicht',
    text: 'Welche Teile haben eine Bezeichnung, die mit dem Buchstaben G anfängt? Geben Sie die Bezeichnung aus!',
    solutionQuery: "SELECT Bezeichnung FROM Teile WHERE Bezeichnung LIKE 'G%'",
    selectType: '13'
  },
  {
    id: '38',
    schema: 'fahrrad',
    difficulty: 'mittel',
    text: 'Von welchen Teilen sind mehr als 10 Einheiten im Bestand aller Lager? (Tabelle : Lagerbestand). Geben Sie diese Teile mit den Attributen TNR, BEZEICHNUNG und der Summe des Bestandes über alle Lager aus !',
    solutionQuery: 'SELECT Teile.TNR , BEZEICHNUNG, SUM(Lagerbestand.BESTAND) FROM Teile, lagerbestand WHERE Teile.TNR = Lagerbestand.TNR GROUP BY Teile.TNR, Teile.Bezeichnung HAVING SUM(Lagerbestand.bestand) >= 10',
    selectType: '3'
  },
  {
    id: '39',
    schema: 'fahrrad',
    difficulty: 'leicht',
    text: 'Auf welchen Lagern liegt ein Bestand des Rades mit der TNr = 1? Geben Sie die LANR aus!',
    solutionQuery: 'SELECT LANR FROM Lagerbestand WHERE TNR = 1',
    selectType: '1'
  },
  {
    id: '40',
    schema: 'fahrrad',
    difficulty: 'leicht',
    text: 'Welche Teile haben, summiert über alle Lager, einen Bestand von mehr als 200 Einheiten ? Geben Sie die TNR aus!',
    solutionQuery: 'SELECT TNR FROM lagerbestand GROUP BY TNR HAVING SUM(bestand) >= 200 ',
    selectType: '3'
  },
  {
    id: '43',
    schema: 'fahrrad',
    difficulty: 'leicht',
    text: 'Geben Sie den durchschnittlichen Bestand je Lager aus ! (LANR und durchschnittlichen Bestand ausgeben)',
    solutionQuery: 'SELECT LANR, avg(bestand) FROM Lagerbestand GROUP BY LANR',
    selectType: '2'
  },
  {
    id: '44',
    schema: 'fahrrad',
    difficulty: 'mittel',
    text: 'Geben Sie die Lagernummer und den durchschnittlichen Bestand derjenigen Lager aus, deren Durchschnittsbestand höher als 1500 Einheiten ist!',
    solutionQuery: 'SELECT LANR, avg(bestand) FROM Lagerbestand GROUP BY LANR HAVING avg(bestand) >= 1500',
    selectType: '3'
  },
  {
    id: '47',
    schema: 'fahrrad',
    difficulty: 'leicht',
    text: 'Welche Angestellten stammen aus Gummersbach und gehören zur Abteilung Vertrieb ? Geben Sie Ang_nr, Vorname und Nachname aus!',
    solutionQuery: "SELECT a.ang_nr, a.vorname, a.nachname FROM angestellte a, abteilungen b WHERE a.abt_nr = b.abt_nr AND b.name = 'Vertrieb' AND a.ort = 'Gummersbach' ",
    selectType: '4'
  },
  {
    id: '48',
    schema: 'fahrrad',
    difficulty: 'mittel',
    text: 'Erzeugen Sie eine nach Gehalt aufsteigend sortierte Liste aller Angestellten mit Nachname, Vorname, Gehalt und der Gehaltsklasse (Tabellen: geh_klasse, Angestellte)',
    solutionQuery: 'SELECT Nachname, Vorname, gehalt, geh_klasse FROM angestellte, geh_klassen WHERE gehalt BETWEEN min_gehalt AND max_gehalt ORDER BY gehalt',
    selectType: '15'
  },
  {
    id: '49',
    schema: 'fahrrad',
    difficulty: 'leicht',
    text: 'Welche Angestellten verdienen zwischen 50000 und 80000 DM im Jahr? Geben Sie Ang_nr, Nachnamen und Vornamen aus!',
    solutionQuery: 'SELECT ang_nr, nachname, vorname FROM angestellte WHERE gehalt * 12 BETWEEN 50000 AND 80000',
    selectType: '1'
  },
  {
    id: '50',
    schema: 'fahrrad',
    difficulty: 'leicht',
    text: "Welche Kunden (Nachname) in der Tabelle Kunden stehen alphabetisch hinter dem Kunden mit dem Namen 'Mueller' ? ",
    solutionQuery: "SELECT Nachname FROM kunden WHERE Nachname >= 'Mueller' ORDER BY Nachname ",
    selectType: '15'
  },
  {
    id: '51',
    schema: 'fahrrad',
    difficulty: 'mittel',
    text: 'Berechnen Sie das durchschnittliche Gehalt aller Angestellten der gleichen Abteilung! Ausgabe: Abt_nr, abteilungen.name, gehalt',
    solutionQuery: 'SELECT a1.abt_nr, a2.name , avg(a1.gehalt) FROM angestellte a1, abteilungen a2 WHERE a1.abt_nr = a2.abt_nr GROUP BY a1.abt_nr, a2.name ',
    selectType: '2'
  },
  {
    id: '52',
    schema: 'fahrrad',
    difficulty: 'mittel',
    text: 'Welche Angestellten (Ang_nr, Nachname) bearbeiten keine Auftraege? ',
    solutionQuery: 'SELECT ang_nr, nachname FROM angestellte WHERE ang_nr NOT IN ( SELECT ang_nr FROM auftraege ) ',
    selectType: '5'
  },
  {
    id: '53',
    schema: 'fahrrad',
    difficulty: 'schwer',
    text: 'Welche Angestellten (Ausgabe: Ang_nr, Gehalt) verdienen mehr als der Durchschnitt aller Gehälter? ',
    solutionQuery: 'SELECT ang_nr , gehalt FROM angestellte WHERE gehalt > (SELECT avg(gehalt) FROM angestellte)',
    selectType: '5'
  },
  {
    id: '54',
    schema: 'fahrrad',
    difficulty: 'schwer',
    text: 'Welche Angestellten verdienen mehr als der Durchschnitt aller Gehälter der Angestellten ihrer eigenen Abteilung?',
    solutionQuery: 'SELECT ang_nr , gehalt FROM angestellte a WHERE gehalt > (SELECT avg(gehalt) FROM angestellte b WHERE a.abt_nr = b.abt_nr) ',
    selectType: '8'
  },
  {
    id: '55',
    schema: 'fahrrad',
    difficulty: 'schwer',
    text: 'Ermitteln Sie alle Orte, in denen Kunden wohnen oder Angestellte wohnen oder beide! Unterdrücken Sie Duplikate!',
    solutionQuery: 'SELECT distinct ort from kunden UNION SELECT distinct ort from angestellte',
    selectType: '11'
  },
  {
    id: '56',
    schema: 'fahrrad',
    difficulty: 'schwer',
    text: "Ermitteln Sie die TNR und die Bezeichnungen derjenigen Rohstoffe (teile.typ = 'Material'), die nicht zur Produkterzeugung verwendet werden! Geben Sie diese Bezeichnungen in Großbuchstaben aus!",
    solutionQuery: "SELECT TNR, UPPER(Bezeichnung) FROM teile WHERE tnr NOT IN ( SELECT UTEIL FROM struktur) AND typ = 'Material' ",
    selectType: '5'
  },
  {
    id: '84',
    schema: 'fahrrad',
    difficulty: 'leicht',
    text: 'Welche Informatiker verdienen zwischen 50000 und 80000 Euro im Jahr? Die Spalte Gehalt beinhaltet das Monatsgehalt. Geben Sie die Spalten Ang_nr, Nachname, Vorname, Beruf und Gehalt aus!',
    solutionQuery: "SELECT Ang_nr, Nachname, Vorname, Beruf, Gehalt FROM angestellte WHERE gehalt * 12 BETWEEN 50000 AND 80000 AND BERUF = 'Informatiker'",
    selectType: '1'
  },
  {
    id: '85',
    schema: 'fahrrad',
    difficulty: 'leicht',
    text: 'Welche Teile (TNR, Bezeichnung) haben als zweiten Buchstaben ein a?',
    solutionQuery: "SELECT TNR, Bezeichnung FROM Teile WHERE Bezeichnung like '_a%'",
    selectType: '13'
  },
  {
    id: '92',
    schema: 'fussball',
    difficulty: 'leicht',
    text: 'Welche Spieler (Ausgabe: Nachname, Vorname) sind für Polen im Angriff?',
    solutionQuery: "SELECT spieler.NACHNAME ,Spieler.VORNAME FROM spieler WHERE spieler.NATIONNAME = 'Polen' AND spieler.FUNKTION = 'Angriff' ",
    selectType: '1'
  },
  {
    id: '93',
    schema: 'fussball',
    difficulty: 'leicht',
    text: 'Wie heißt der Trainer (Ausgabe: Trainername) der australischen Mannschaft?',
    solutionQuery: "SELECT nation.TRAINERNAME FROM Nation WHERE nation.NATIONNAME = 'Australien'",
    selectType: '1'
  },
  {
    id: '94',
    schema: 'fussball',
    difficulty: 'leicht',
    text: 'Welche Spieler (Ausgabe: Nachname, Vorname) sind für Costa Rica im Angriff?',
    solutionQuery: "SELECT spieler.NACHNAME , Spieler.VORNAME FROM spieler WHERE spieler.NATIONNAME = 'Costa Rica' AND spieler.Funktion= 'Angriff' ",
    selectType: '1'
  },
  {
    id: '95',
    schema: 'fussball',
    difficulty: 'leicht',
    text: 'Welche Spieler (alle Spalten) sind Torhueter?',
    solutionQuery: "SELECT * FROM Spieler WHERE Funktion= 'Torhueter'",
    selectType: '1'
  },
  {
    id: '96',
    schema: 'fussball',
    difficulty: 'leicht',
    text: 'Welche Spieler (alle Spalten) spielen im Mittelfeld?',
    solutionQuery: "SELECT * FROM Spieler WHERE Funktion = 'Mittelfeld'",
    selectType: '1'
  },
  {
    id: '97',
    schema: 'fussball',
    difficulty: 'mittel',
    text: 'Welche Spieler (Ausgabe: Nachname) haben im ersten Spiel (Eröffnungsspiel, Spiel_id = 1) ein Tor geschossen? Geben Sie jeden Nachnamen nur einmal aus!',
    solutionQuery: "SELECT DISTINCT Nachname FROM Spieler, Tore, Spiele WHERE Spieler.Spieler_ID = Tore.Spieler_ID AND Tore.Spiel_ID = Spiele.Spiel_ID AND Spiele.Spiel_ID = '1'",
    selectType: '4'
  },
  {
    id: '98',
    schema: 'fussball',
    difficulty: 'mittel',
    text: "Welcher Trainer (Ausgabe: Nation.TrainerName, Spieler.Vorname, Spieler.Nachname, Nation.Nationname) trainiert den Spieler mit der Spieler_ID '55' und wie heißt dieser Spieler?",
    solutionQuery: 'SELECT Nation.TrainerName, Spieler.Vorname, Spieler.Nachname, Nation.NATIONNAME FROM Spieler, Nation WHERE Spieler.NationName = Nation.NationName AND Spieler.Spieler_ID = 55 ',
    selectType: '4'
  },
  {
    id: '99',
    schema: 'fussball',
    difficulty: 'schwer',
    text: 'Wie viele Tore schoss der Spieler "Miroslav Klose"?',
    solutionQuery: "SELECT count(*) FROM tore WHERE tore.spieler_id=(SELECT spieler_id FROM spieler WHERE nachname='Klose')",
    selectType: '5'
  },
  {
    id: '101',
    schema: 'fussball',
    difficulty: 'leicht',
    text: 'Welche Nationen waren bei der Fußball-WM 2006 beteiligt? Geben Sie bitte nur die Namen der Nationen aus!',
    solutionQuery: 'SELECT nation.NATIONNAME FROM Nation',
    selectType: '1'
  },
  {
    id: '102',
    schema: 'fussball',
    difficulty: 'leicht',
    text: 'Welche Spieler (Nachname, Nationname) haben einen Nachnamen, der mit Z hat anfängt und zu welcher Nation gehören diese Spieler?',
    solutionQuery: "SELECT Nachname, NationName FROM Spieler WHERE Nachname LIKE 'Z%'",
    selectType: '13'
  },
  {
    id: '103',
    schema: 'fussball',
    difficulty: 'leicht',
    text: 'Wie hoch ist die Summe aller Gehälter der Spieler aus Polen?',
    solutionQuery: "SELECT Sum(Spieler.GEHALT_IN_EURO) FROM Spieler WHERE Spieler.NATIONNAME = 'Polen'",
    selectType: '12'
  },
  {
    id: '104',
    schema: 'fussball',
    difficulty: 'leicht',
    text: 'Aus welchen Spielen (alle Spalten) besteht die Vorrunde?',
    solutionQuery: "SELECT * FROM Spiele WHERE spiele.TYP = 'Vorrunde'",
    selectType: '1'
  },
  {
    id: '105',
    schema: 'fussball',
    difficulty: 'schwer',
    text: "An welchen Spielen (Spieltag, Termin) hat der Spieler 'Klose' ein Tor geschossen?",
    solutionQuery: "SELECT Spiele.SPIELTAG, Spiele.TERMIN FROM Spiele, Tore, Spieler WHERE Spiele.SPIEL_ID = Tore.SPIEL_ID AND Tore.SPIELER_ID = Spieler.SPIELER_ID AND Spieler.NACHNAME = 'Klose'",
    selectType: '4'
  },
  {
    id: '106',
    schema: 'fussball',
    difficulty: 'leicht',
    text: 'Welche Spiele (alle Spalten) fanden am 3. Spieltag statt?',
    solutionQuery: 'SELECT * FROM Spiele WHERE Spieltag = 3',
    selectType: '1'
  },
  {
    id: '107',
    schema: 'fussball',
    difficulty: 'leicht',
    text: 'Welche Spiele (alle Spalten) gingen 0:0 aus?',
    solutionQuery: "SELECT * FROM Spiele WHERE Ergebnis = '0:0'",
    selectType: '1'
  },
  {
    id: '108',
    schema: 'fussball',
    difficulty: 'mittel',
    text: 'An welchen Spielen (alle Spalten) nahm Polen teil?',
    solutionQuery: "SELECT * FROM Spiele WHERE Spiele.MANNSCHAFT_1 = 'Polen' OR Spiele.MANNSCHAFT_2 = 'Polen'",
    selectType: '1'
  },
  {
    id: '111',
    schema: 'fussball',
    difficulty: 'mittel',
    text: 'Wie heißt der Torhueter (Vorname, Nachname) von Costa Rica?',
    solutionQuery: "SELECT Vorname, Nachname FROM Spieler WHERE NATIONNAME = 'Costa Rica' AND Funktion ='Torhueter'",
    selectType: '1'
  },
  {
    id: '112',
    schema: 'fussball',
    difficulty: 'leicht',
    text: 'Welche Spiele (alle Spalten) fanden in Berlin statt?',
    solutionQuery: "SELECT * FROM Spiele WHERE Spiele.AUSFUEHRUNGSORT = 'Berlin'",
    selectType: '1'
  },
  {
    id: '113',
    schema: 'fussball',
    difficulty: 'leicht',
    text: 'Welche (alle Spalten) Mannschaften gehören zur Gruppe H?',
    solutionQuery: "SELECT * FROM nation WHERE Nation.GRUPPE = 'H'",
    selectType: '1'
  },
  {
    id: '86',
    schema: 'fahrrad',
    difficulty: 'leicht',
    text: 'Bestimmen Sie alle Angestellten (alle Spalten) aus der Abteilung mit Abt_Nr =2, die weniger als 2000 Euro verdienen!',
    solutionQuery: 'SELECT * FROM Angestellte WHERE Gehalt < 2000 and Abt_Nr = 2',
    selectType: '1'
  },
  {
    id: '88',
    schema: 'fahrrad',
    difficulty: 'mittel',
    text: 'Welche Bauteile (Spalten: TNR, BEZEICHNUNG) sind im Mountainbike, Rocky Mountain Element Race Typ 1, TNr = 1 enthalten? (Auflösung über eine Stufe)!',
    solutionQuery: 'SELECT t.TNR, t.BEZEICHNUNG FROM Teile t, Struktur s WHERE t.TNR = s.UTEIL AND s.OTEIL = 1',
    selectType: '4'
  },
  {
    id: '89',
    schema: 'fahrrad',
    difficulty: 'mittel',
    text: 'iIn welchen Teilen findet die Nabe Inferno (TNr = 42) Verwendung? (Auflösung über eine Stufe, Ausgabe der Spalten TNR und Bezeichnung.!',
    solutionQuery: 'SELECT t.TNR, T.Bezeichnung FROM Teile t, Struktur s WHERE t.TNR = s.OTEIL AND s.UTeil = 42',
    selectType: '4'
  },
  {
    id: '87',
    schema: 'fahrrad',
    difficulty: 'mittel',
    text: 'Für welche Artikel (Tabelle: Artikel) gibt es keine Unterteile in der Strukturtabelle? Zeigen Sie die Teilenummer, die Bezeichnung sowie Verkaufspreis und Jahresumsatz an.',
    solutionQuery: 'SELECT TNr, Bezeichnung, Verkaufspreis, Jahresumsatz FROM artikel WHERE TNr NOT IN (SELECT OTeil FROM Struktur) ',
    selectType: '5'
  },
  {
    id: '114',
    schema: 'fussball',
    difficulty: 'mittel',
    text: 'Welche Spiele (alle Spalten) in der Gruppe H fanden schon statt?',
    solutionQuery: "SELECT * FROM Spiele, Nation WHERE Nation.GRUPPE = 'H' AND nation.NATIONNAME = Spiele.MANNSCHAFT_1",
    selectType: '4'
  },
  {
    id: '90',
    schema: 'fahrrad',
    difficulty: 'mittel',
    text: 'Welche Artikel (Ausgabe : TNR) sind nicht auf Lager?',
    solutionQuery: "SELECT t1.TNR FROM Teile t1 WHERE t1.Typ = 'Artikel' AND NOT EXISTS (SELECT l.TNR FROM Lagerbestand l WHERE t1.TNR = l.TNr )",
    selectType: '8'
  },
  {
    id: '91',
    schema: 'fahrrad',
    difficulty: 'schwer',
    text: 'Welche Artikel (Ausgabe: TNr) sind auf allen Lagern vorhanden?',
    solutionQuery: "SELECT t1.TNR FROM Teile t1 WHERE t1.Typ = 'Artikel' AND NOT EXISTS (SELECT l.TNR FROM Lagerbestand l  WHERE t1.TNR = l.TNr AND NOT EXISTS  (SELECT l2.LANR FROM LAGER l2  WHERE l2.LANR = L.LANR))",
    selectType: '9'
  },
  {
    id: '115',
    schema: 'fussball',
    difficulty: 'mittel',
    text: 'Welche Spiele (alle Spalten) aus der Gruppe H gingen 2:2 aus?',
    solutionQuery: "SELECT * FROM Spiele, nation WHERE Nation.GRUPPE = 'H' AND nation.NATIONNAME = Spiele.MANNSCHAFT_1 AND Spiele.ERGEBNIS = '2:2'",
    selectType: '4'
  },
  {
    id: '116',
    schema: 'fussball',
    difficulty: 'schwer',
    text: 'Welche Spiele (alle Spalten) der Gruppe B gingen unentschieden aus?',
    solutionQuery: "SELECT * FROM Spiele, nation WHERE Nation.GRUPPE = 'B' AND nation.NATIONNAME = Spiele.MANNSCHAFT_1 AND (SUBSTR(Spiele.ERGEBNIS, 1,1) = SUBSTR(Spiele.ERGEBNIS, 3,1))",
    selectType: '4'
  },
  {
    id: '117',
    schema: 'fussball',
    difficulty: 'leicht',
    text: 'Wieviele Nationen machen bei der Fussballweltmeisterschaft mit?',
    solutionQuery: 'SELECT count(*) FROM Nation',
    selectType: '12'
  },
  {
    id: '118',
    schema: 'fussball',
    difficulty: 'schwer',
    text: 'In welchen Stadien (Spiele.AUSFUEHRUNGSORT) hat Deutschland nicht gespielt? Geben Sie die Stadien nur einmal aus!',
    solutionQuery: "SELECT DISTINCT spiele.AUSFUEHRUNGSORT FROM spiele WHERE spiele.AUSFUEHRUNGSORT NOT IN (SELECT spiele.AUSFUEHRUNGSORT FROM Spiele WHERE spiele.MANNSCHAFT_1 = 'Deutschland' OR spiele.MANNSCHAFT_2= 'Deutschland' GROUP BY spiele.AUSFUEHRUNGSORT)",
    selectType: '5'
  },
  {
    id: '119',
    schema: 'fussball',
    difficulty: 'mittel',
    text: 'Wieviele Stadien (distinct Spiele.AUSFUEHRUNGSORT) gibt es, an denen Weltmeisterschaftsturniere stattfinden?',
    solutionQuery: 'SELECT COUNT (distinct spiele.AUSFUEHRUNGSORT) FROM spiele',
    selectType: '12'
  },
  {
    id: '120',
    schema: 'fussball',
    difficulty: 'mittel',
    text: 'In welchen Stadien (Ausgabe: spiele.ausfuehrungsort) spielt die Nationalmannschaft von England in der Vorrunde?',
    solutionQuery: "SELECT spiele.AUSFUEHRUNGSORT FROM Spiele WHERE (spiele.MANNSCHAFT_1 = 'England' OR spiele.MANNSCHAFT_2 = 'England') AND spiele.TYP = 'Vorrunde' ",
    selectType: '1'
  },
  {
    id: '121',
    schema: 'fussball',
    difficulty: 'schwer',
    text: 'Welche Spiele hat Ecuador gewonnen? Geben Sie die Spiel_ID, die Mannschaften und das Ergebnis aus. Dabei können Sie davon ausgehen, dass keine zweistelligen Ergebnisse (mehr als 10 Tore für eine Mannschaft) vorliegen!',
    solutionQuery: "SELECT spiele.SPIEL_ID, spiele.MANNSCHAFT_1, spiele.MANNSCHAFT_2, spiele.ERGEBNIS FROM spiele WHERE spiele.MANNSCHAFT_1 = 'Ecuador' AND SUBSTR(spiele.ergebnis, 1, 1)> SUBSTR(spiele.ergebnis, 3, 1) UNION SELECT spiele.SPIEL_ID, spiele.MANNSCHAFT_1, spiele.MANNSCHAFT_2, spiele.ERGEBNIS FROM spiele WHERE spiele.MANNSCHAFT_2 = 'Ecuador' AND SUBSTR(spiele.ergebnis, 1, 1)< SUBSTR(spiele.ergebnis, 3, 1)",
    selectType: '11'
  },
  {
    id: '122',
    schema: 'fussball',
    difficulty: 'schwer',
    text: 'Welche Mannschaft (Ausgabe: Mannschaft, SUM(Tore)) hat in der Vorrunde die meisten Tore geschossen? Geben Sie alle Mannschaften aus, mit der Summe aller Tore und sortieren Sie die Ausgabe absteigend nach der Summe über alle Tore!',
    solutionQuery: "SELECT mannschaft, sum (tore) FROM (SELECT mannschaft_1 as mannschaft, SUM(SUBSTR(spiele.ERGEBNIS, 1, 1)) as tore FROM spiele WHERE Typ = 'Vorrunde' GROUP BY Mannschaft_1 UNION SELECT mannschaft_2 as mannschaft, SUM(SUBSTR(spiele.ERGEBNIS, 3, 1)) as tore FROM spiele WHERE Typ = 'Vorrunde' GROUP BY Mannschaft_2 ) GROUP BY Mannschaft order by SUM(Tore) desc ",
    selectType: '8'
  },
  {
    id: '125',
    schema: 'fussball',
    difficulty: 'mittel',
    text: 'Wie viele Spiele gibt es in der Vorrunde?',
    solutionQuery: "SELECT COUNT(*) FROM Spiele WHERE Typ = 'Vorrunde'",
    selectType: '12'
  },
  {
    id: '126',
    schema: 'fussball',
    difficulty: 'schwer',
    text: 'Welche Mannschaft hat in der Vorrunde die meisten Tore kassiert? Geben Sie alle Mannschaften aus, mit der Summe alle Tore und sortieren Sie die Ausgabe absteigend nach der Summe über alle Tore!',
    solutionQuery: "SELECT mannschaft, sum (tore) FROM (SELECT mannschaft_1 as mannschaft, SUM(SUBSTR(spiele.ERGEBNIS, 3, 1)) as tore FROM spiele WHERE Typ = 'Vorrunde' GROUP BY Mannschaft_1 UNION SELECT mannschaft_2 as mannschaft, SUM(SUBSTR(spiele.ERGEBNIS, 1, 1)) as tore FROM spiele WHERE Typ = 'Vorrunde' GROUP BY Mannschaft_2 ) GROUP BY Mannschaft order by SUM(Tore) desc",
    selectType: '11'
  },
  {
    id: '127',
    schema: 'fussball',
    difficulty: 'schwer',
    text: 'Welche Spiele (alle Spalten) gingen unentschieden aus? ',
    solutionQuery: 'SELECT * FROM Spiele, nation WHERE nation.NATIONNAME = Spiele.MANNSCHAFT_1 AND (SUBSTR(Spiele.ERGEBNIS, 1,1) = SUBSTR(Spiele.ERGEBNIS, 3,1))',
    selectType: '4'
  },
  {
    id: '57',
    schema: 'fahrrad',
    difficulty: 'schwer',
    text: 'Ermitteln Sie die Summe über alle Lieferungen je Rohstoff für alle Lieferanten! ',
    solutionQuery: 'SELECT t.tnr, sum(l1.menge), l2.name, l2.lief_nr FROM teile t, lieferungen l1, lieferanten l2 WHERE t.tnr = l1.TNR AND l1.lief_nr = l2.lief_nr GROUP by t.tnr, l2.lief_nr, l2.name ',
    selectType: '2'
  },
  {
    id: '59',
    schema: 'fahrrad',
    difficulty: 'schwer',
    text: 'In welchen Abteilungen (Abt_nr, Name) sind alle Berufe vertreten?',
    solutionQuery: 'SELECT A1.Abt_Nr, A1.Name FROM Abteilungen A1 WHERE NOT EXISTS ( SELECT * FROM Angestellte A2 WHERE NOT EXISTS ( SELECT * FROM Angestellte A3 WHERE a2.Beruf = a3.Beruf AND a1.Abt_NR = a2.Abt_nr))',
    selectType: '9'
  },
  {
    id: '60',
    schema: 'fahrrad',
    difficulty: 'mittel',
    text: 'Bestimmen Sie die Angestellten (Nachname, Vorname) aus der Abteilung mit Abt_Nr =2, die mehr als 5000 DM verdienen!',
    solutionQuery: 'SELECT Nachname, Vorname FROM Angestellte WHERE Abt_Nr = 2 AND Gehalt > 5000',
    selectType: '1'
  },
  {
    id: '61',
    schema: 'fahrrad',
    difficulty: 'mittel',
    text: 'Bestimmen Sie alle Mountainbike-Fahrräder, die weniger als 3000 DM kosten oder einen Jahresumsatz von weniger als 200 Stück hatten! Geben Sie alle Spalten aus der Tabelle Artikel aus!',
    solutionQuery: "SELECT * FROM Artikel WHERE Artikel_Typ = 'Mountainbike' AND (Jahresumsatz < 200 OR Verkaufspreis < 3000)",
    selectType: '1'
  },
  {
    id: '62',
    schema: 'fahrrad',
    difficulty: 'leicht',
    text: 'Bestimmen Sie alle verschiedenen Artikel-Typen!',
    solutionQuery: 'SELECT DISTINCT Artikel_Typ FROM Artikel',
    selectType: '1'
  },
  {
    id: '63',
    schema: 'fahrrad',
    difficulty: 'leicht',
    text: 'Welchen Namen hat die Abteilung mit der Abteilungsnummer Abt_Nr = 2?',
    solutionQuery: 'SELECT Name FROM Abteilungen WHERE Abt_Nr = 2',
    selectType: '1'
  },
  {
    id: '64',
    schema: 'fahrrad',
    difficulty: 'mittel',
    text: "Welche Artikel (Typ = 'Artikel') liegen im Hauptlager und haben einen Bestand > 0? Geben Sie TNr und Bezeichnung aus!",
    solutionQuery: "SELECT t.TNr, t.Bezeichnung FROM Teile t, Lagerbestand la , Lager l WHERE t.TNr = la.TNr AND la.LANr = l.LaNr AND l.Bezeichnung = 'Hauptlager' AND t.Typ = 'Artikel' AND t.Bestand > 0",
    selectType: '4'
  },
  {
    id: '65',
    schema: 'fahrrad',
    difficulty: 'mittel',
    text: 'Welche Materialien werden von Lieferanten aus Dortmund geliefert? Geben Sie TNr und Bezeichnung aus!',
    solutionQuery: "SELECT t.TNr, t.bezeichnung FROM Teile t, Lieferprogramme l1, Lieferanten l2 WHERE t.TNr = l1.TNr AND l1.Lief_Nr = l2.Lief_Nr AND l2.Ort = 'Dortmund'",
    selectType: '4'
  },
  {
    id: '66',
    schema: 'fahrrad',
    difficulty: 'mittel',
    text: 'Welche Angestellten haben einen Vornamen, der als zweiten Buchstaben ein u hat?',
    solutionQuery: "SELECT Vorname FROM Angestellte WHERE Vorname LIKE '_u%'",
    selectType: '13'
  },
  {
    id: '67',
    schema: 'fahrrad',
    difficulty: 'mittel',
    text: 'Welche Kunden aus Köln werden von Angestellten aus Gummersbach betreut? Geben Sie die Kun_Nr und den Nachnamen aus!',
    solutionQuery: "SELECT K.Kun_nr , K.Nachname FROM Kunden k, Auftraege A , Angestellte AG WHERE K.Kun_Nr = A.Kun_Nr AND A.Ang_Nr = AG.Ang_NR AND K.Ort = 'Köln' AND AG.Ort = 'Gummersbach'",
    selectType: '4'
  },
  {
    id: '70',
    schema: 'fahrrad',
    difficulty: 'mittel',
    text: 'Listen Sie bitte Nachname, Vorname und Gehalt und Abteilungsname der Informatiker auf, die in Köln beschäftigt sind!',
    solutionQuery: "SELECT a.Nachname, a.Vorname, a.gehalt FROM Angestellte a, Abteilungen ab WHERE a.Abt_nr = ab.Abt_nr AND ab.Ort = 'Köln' AND a.Beruf = 'Informatiker'",
    selectType: '4'
  },
  {
    id: '71',
    schema: 'fahrrad',
    difficulty: 'leicht',
    text: 'Finde die Abteilungsnummern von Abteilungen in Dortmund, in denen es Angestellten gibt, die weniger als 2000 verdienen!',
    solutionQuery: "SELECT A.Abt_NR FROM Angestellte A, Abteilungen AB WHERE AB.Abt_NR = a.Abt_NR AND AB.Ort = 'Dortmund' AND a.Gehalt < 2000",
    selectType: '4'
  },
  {
    id: '72',
    schema: 'fahrrad',
    difficulty: 'mittel',
    text: 'Finde die Ang_nr, Nachnamen und den Vornamen der Angestellten, die den gleichen Beruf und das gleiche Gehalt wie der Angestellte Ilse Brunn haben!',
    solutionQuery: "SELECT A.Ang_NR, A.Nachname, A.Vorname FROM Angestellte A, Angestellte B WHERE b.Beruf = a.Beruf AND a.Gehalt = b.Gehalt AND b.Nachname = 'Brunn' AND B.Vorname = 'Ilse'",
    selectType: '6'
  },
  {
    id: '73',
    schema: 'fahrrad',
    difficulty: 'leicht',
    text: 'Wieviele Frauen arbeiten bei der Fahrradfirma Byce&Co? ',
    solutionQuery: "SELECT COUNT(*) FROM angestellte GROUP BY geschlecht HAVING Geschlecht = 'w'",
    selectType: '3'
  },
  {
    id: '74',
    schema: 'fahrrad',
    difficulty: 'leicht',
    text: 'Geben Sie alle Daten der Tabelle Werke aus!',
    solutionQuery: 'SELECT WNR, BEZEICHNUNG, ORT, STRASSE FROM Werke',
    selectType: '1'
  },
  {
    id: '75',
    schema: 'fahrrad',
    difficulty: 'schwer',
    text: "Welche Teile haben eine Bezeichnung, die mit dem Buchstaben 'g' anfängt oder ein 'a' als zweiten Buchstaben hat? In beiden Fällen darf als letzter Buchstabe kein 't' auftreten. (Groß- und Kleinschreibung spielt bei der Suche keine Rolle.) Arbeiten Sie mit SELECT * ....",
    solutionQuery: "SELECT * FROM teile WHERE (UPPER(bezeichnung) LIKE 'G%' OR UPPER(bezeichnung) LIKE '_A%') AND UPPER(bezeichnung) NOT LIKE '%T'",
    selectType: '13'
  },
  {
    id: '76',
    schema: 'fahrrad',
    difficulty: 'mittel',
    text: 'Geben Sie eine Liste über alle Artikel aus, mit den Attributen TNr, Bezeichnung und Verkaufspreis, wobei die Preise um 10 % erhöht werden ! Sortieren Sie die Liste absteigend nach den Preisen und bei gleichem Preis noch mal alphabetisch aufsteigend nach der Bezeichnung !',
    solutionQuery: 'SELECT TNr, bezeichnung, verkaufspreis*1.10 FROM artikel ORDER BY verkaufspreis DESC, bezeichnung ASC',
    selectType: '15'
  },
  {
    id: '77',
    schema: 'fahrrad',
    difficulty: 'leicht',
    text: "Welche Teile haben eine Bezeichnung, die mit dem Buchstaben 'g' anfängt oder ein 'a' als zweiten Buchstaben hat. In beiden Fällen darf als letzter Buchstabe kein 't' auftreten? (Groß- und Kleinschreibung spielt bei der Suche keine Rolle.) Arbeiten Sie mit SELECT * ...",
    solutionQuery: "SELECT * FROM teile WHERE ( UPPER(bezeichnung) LIKE 'G%' OR UPPER(bezeichnung) LIKE '_A%') AND UPPER(bezeichnung) NOT LIKE '%T'",
    selectType: '13'
  },
  {
    id: '78',
    schema: 'fahrrad',
    difficulty: 'schwer',
    text: 'Von welchen Teilen mit einem Einkaufspreis von 100 EUR und mehr sind mehr als 1000 Einheiten im Bestand aller Lager zusammen? (Tabelle : Lagerbestand). Geben Sie diese Teile mit den Attributen TNR, BEZEICHNUNG und der Summe des Bestandes über alle Lager aus!',
    solutionQuery: 'SELECT t.tnr, t.bezeichnung, SUM(l.bestand) Bestandssumme FROM teile t, lagerbestand l WHERE t.tnr = l.tnr AND t.einkaufspreis >= 100 GROUP BY t.tnr, t.bezeichnung HAVING SUM(l.bestand) > 1000',
    selectType: '3'
  },
  {
    id: '190',
    schema: 'busse',
    difficulty: 'leicht',
    text: 'Geben Sie die Vor- und Nachnamen (Vorname, Nachname) aller Mitarbeiter aus!',
    solutionQuery: 'SELECT vorname, nachname FROM mitarbeiter',
    selectType: '1'
  },
  {
    id: '191',
    schema: 'busse',
    difficulty: 'leicht',
    text: 'Geben Sie die Fahrzeug_id des Busses aus, der bei der Firma BOCO zur Inspektion muss!',
    solutionQuery: "SELECT fahrzeug_id FROM inspektionen WHERE firma = 'BOCO'",
    selectType: '1'
  },
  {
    id: '192',
    schema: 'busse',
    difficulty: 'leicht',
    text: 'Mit welchen Führerscheinklassen (kuerzel, bezeichnung) können Busse mit einer Sitzplatzanzahl von mehr als 10 gefahren werden?',
    solutionQuery: 'SELECT kuerzel, bezeichnung FROM fuehrerscheinklassen WHERE max_sitze > 10',
    selectType: '1'
  },
  {
    id: '193',
    schema: 'busse',
    difficulty: 'leicht',
    text: 'Welche Mitarbeiter (alle Spalten) wohnen in Köln?',
    solutionQuery: "SELECT * FROM mitarbeiter WHERE ort = 'Köln'",
    selectType: '1'
  },
  {
    id: '194',
    schema: 'busse',
    difficulty: 'leicht',
    text: 'Geben Sie die Mitarbeiter (Vorname, Nachname) aus, deren Postleitzahl mit 51 anfängt!',
    solutionQuery: "SELECT vorname, nachname FROM mitarbeiter WHERE plz LIKE '51%'",
    selectType: '13'
  },
  {
    id: '195',
    schema: 'busse',
    difficulty: 'leicht',
    text: 'Welche Busse sind bereits abgemeldet?',
    solutionQuery: 'SELECT * FROM busse WHERE abgemeldet_am IS NOT NULL',
    selectType: '17'
  },
  {
    id: '196',
    schema: 'busse',
    difficulty: 'leicht',
    text: 'Wie hoch ist die Summe aller Gehälter der Nichtbusfahrer?',
    solutionQuery: 'SELECT SUM(gehalt) FROM nichtbusfahrer',
    selectType: '12'
  },
  {
    id: '197',
    schema: 'busse',
    difficulty: 'leicht',
    text: 'Geben Sie die Anzahl der Fahrten nach der Fahrzeug_id gruppiert aus!',
    solutionQuery: 'SELECT COUNT(*) FROM einsatzplan GROUP BY fahrzeug_id',
    selectType: '2'
  },
  {
    id: '198',
    schema: 'busse',
    difficulty: 'leicht',
    text: 'Welche Busse (alle Spalten) besitzen mehr als 45 Sitzplätze?',
    solutionQuery: 'SELECT * FROM busse WHERE anzahl_sitzplaetze > 45',
    selectType: '1'
  },
  {
    id: '200',
    schema: 'busse',
    difficulty: 'mittel',
    text: 'Welche Mitarbeiter (Vorname, Nachname) sind Schaffner?',
    solutionQuery: "SELECT vorname, nachname FROM mitarbeiter m, nichtbusfahrer n WHERE m.mita_id = n.mita_id AND n.taetigkeit = 'Schaffner'",
    selectType: '4'
  },
  {
    id: '201',
    schema: 'busse',
    difficulty: 'mittel',
    text: 'Welche Mitarbeiter (Vorname, Nachname, Stundenlohn) sind Busfahrer und haben einen Stundenlohn von mehr 10?',
    solutionQuery: 'SELECT vorname, nachname, stundenlohn FROM mitarbeiter m, busfahrer b WHERE m.mita_id = b.mita_id AND b.stundenlohn > 10',
    selectType: '4'
  },
  {
    id: '202',
    schema: 'busse',
    difficulty: 'mittel',
    text: 'Welche Busfahrer (MITA_ID, Vorname, Nachname) besitzen KEINEN Führerschein?',
    solutionQuery: 'SELECT m.mita_id, vorname, nachname FROM mitarbeiter m, busfahrer b WHERE b.mita_id = m.mita_id AND b.mita_id NOT IN (SELECT bf.mita_id FROM besitzt_fuehrerschein bf)',
    selectType: '5'
  },
  {
    id: '203',
    schema: 'busse',
    difficulty: 'mittel',
    text: 'Welche Busse (fahrzeug_id) besitzen mehr Sitzplätze als der Mittelwert aller Busse?',
    solutionQuery: 'SELECT fahrzeug_id FROM busse WHERE anzahl_sitzplaetze > (SELECT AVG(anzahl_sitzplaetze) FROM busse)',
    selectType: '5'
  },
  {
    id: '205',
    schema: 'busse',
    difficulty: 'mittel',
    text: 'Geben Sie alle Busfahrer (vorname, nachname) aus, deren Stundenlohn kleiner ist, als das durchschnittliche Gehalt der restlichen Mitarbeiter! Jeder Busfahrer arbeitet 160 Stunden im Monat (40 Stunden pro Woche a 4 Wochen)!',
    solutionQuery: 'SELECT vorname, nachname FROM mitarbeiter m, busfahrer b WHERE m.mita_id = b.mita_id AND (b.stundenlohn * 160) < (SELECT AVG(gehalt) FROM nichtbusfahrer)',
    selectType: '5'
  },
  {
    id: '206',
    schema: 'busse',
    difficulty: 'mittel',
    text: 'Geben Sie die Busse (alle Spalten) aus, die noch nie zu einer Inspektion waren!',
    solutionQuery: 'SELECT * FROM busse WHERE fahrzeug_id NOT IN (SELECT fahrzeug_id FROM inspektionen)',
    selectType: '5'
  },
  {
    id: '207',
    schema: 'busse',
    difficulty: 'mittel',
    text: 'Geben Sie das durchschnittliche Gehalt aller Mitarbeiter aus incl. Busfahrer und Nichtbusfahrer! Das Gehalt der Busfahrer kann mit Stundenlohn*160 berechnet werden.',
    solutionQuery: 'SELECT avg(gehalt) FROM (SELECT stundenlohn*160 as gehalt FROM busfahrer UNION SELECT gehalt FROM nichtbusfahrer)',
    selectType: '11'
  },
  {
    id: '209',
    schema: 'busse',
    difficulty: 'mittel',
    text: 'Welche Busse (fahrzeug_id) werden auf einer Strecke mit mehr als 3 km eingesetzt (doppelte Datensätze sollen unterdrückt werden!)?',
    solutionQuery: 'SELECT DISTINCT b.fahrzeug_id FROM busse b, einsatzplan e, fahrten f, linie l, bestehen be, verbindung v WHERE b.fahrzeug_id = e.fahrzeug_id AND e.fahrt_id = f.fahrt_id AND f.linien_id = l.linien_id AND be.linien_id = l.linien_id AND be.kanten_id = v.kanten_id AND v.fahrstrecke > 3',
    selectType: '4'
  },
  {
    id: '210',
    schema: 'busse',
    difficulty: 'schwer',
    text: 'Welche Busfahrer (MITA_ID, Vorname, Nachname) wurden bisher nicht im Einsatzplan berücksichtigt?',
    solutionQuery: 'SELECT b.mita_id, vorname, nachname FROM mitarbeiter m, busfahrer b WHERE b.mita_id = m.mita_id AND b.mita_id NOT IN (SELECT mita_id FROM einsatzplan where mita_id is not null)',
    selectType: '5'
  },
  {
    id: '211',
    schema: 'busse',
    difficulty: 'schwer',
    text: "Welche Busfahrer (Vorname, Nachname) fahren die Linien, die nur an Feiertagen (Bemerkung = 'F') fahren? Unterdrücken Sie doppelte Spalten!",
    solutionQuery: "SELECT DISTINCT vorname, nachname FROM mitarbeiter m, busfahrer b, einsatzplan e, fahrten f, linie l, linie_beschraenkungen lb WHERE b.mita_id = m.mita_id AND e.mita_id = b.mita_id AND e.fahrt_id = f.fahrt_id AND l.linien_id = f.linien_id AND lb.linien_id = l.linien_id AND lb.beschr_id = (SELECT beschr_id FROM beschraenkungen be WHERE bemerkungen ='F')",
    selectType: '4'
  },
  {
    id: '212',
    schema: 'busse',
    difficulty: 'schwer',
    text: 'Welche Busfahrer (Vorname, Nachname) besitzen KEINEN Führerschein, wurde aber trotzdem im Einsatzplan eingeteilt?',
    solutionQuery: 'SELECT vorname, nachname FROM mitarbeiter m, busfahrer b WHERE m.mita_id = b.mita_id AND b.mita_id NOT IN (SELECT bf.mita_id FROM besitzt_fuehrerschein bf) AND b.mita_id IN (SELECT e.mita_id FROM einsatzplan e)',
    selectType: '8'
  },
  {
    id: '213',
    schema: 'busse',
    difficulty: 'schwer',
    text: 'Welche Linien (linien_id, bezeichnung) befahren eine Haltestelle, die auf der X-Koordinate "51° 01 N" liegt? Unterdrücken Sie doppelte Datensätze!',
    solutionQuery: "SELECT DISTINCT l.linien_id, l.bezeichnung FROM linie l, bestehen b, verbindung v, haltestelle h WHERE l.linien_id = b.linien_id AND b.kanten_id = v.kanten_id AND (v.bis = h.haltestellen_id OR v.von = h.haltestellen_id) AND h.x_koordinate ='51° 01_ N'",
    selectType: '4'
  },
  {
    id: '216',
    schema: 'busse',
    difficulty: 'schwer',
    text: "Welche Mitarbeiter fahren welche Busse (vorname, nachname, fahrzeug_id), die die Haltestelle 'Seniorenheim' bedienen? Keine doppelten Datensätze ausgeben!",
    solutionQuery: "SELECT DISTINCT vorname, nachname, b.fahrzeug_id FROM mitarbeiter m, busfahrer bu, einsatzplan e, busse b, fahrten f, linie l, bestehen be, verbindung v, haltestelle h WHERE m.mita_id = bu.mita_id AND e.mita_id = bu.mita_id AND b.fahrzeug_id = e.fahrzeug_id AND f.fahrt_id = e.fahrt_id AND f.linien_id = l.linien_id AND be.linien_id = l.linien_id AND be.kanten_id = v.kanten_id AND (v.bis = h.haltestellen_id OR v.von = h.haltestellen_id) AND h.name_der_haltestelle ='Seniorenheim'",
    selectType: '4'
  },
  {
    id: '217',
    schema: 'busse',
    difficulty: 'schwer',
    text: 'Welcher Busfahrer (mita_id, vorname, nachname) besitzt alle Führerscheinklassen?',
    solutionQuery: 'SELECT m.mita_id, vorname, nachname FROM mitarbeiter m, busfahrer b WHERE m.mita_id = b.mita_id AND NOT EXISTS (SELECT * FROM fuehrerscheinklassen f WHERE NOT EXISTS (SELECT * FROM besitzt_fuehrerschein bf WHERE b.mita_id = bf.mita_id AND f.fklassen_id = bf.fklassen_id))',
    selectType: '9'
  },
  {
    id: '218',
    schema: 'busse',
    difficulty: 'schwer',
    text: 'Welche Busfahrer (mita_id) haben keinen Führerschein und fahren nur auf Linien, die eine Beschränkung "Nur an Schultagen" (Tabelle: beschraenkungen, Spalte: Text) besitzen? Unterdrücken Sie Duplicate!',
    solutionQuery: "SELECT DISTINCT b.mita_id FROM busfahrer b, einsatzplan e, fahrten f, linie l, linie_beschraenkungen lb, beschraenkungen be WHERE b.mita_id = e.mita_id AND e.fahrt_id = f.fahrt_id AND f.linien_id = l.linien_id AND lb.linien_id = l.linien_id AND be.beschr_id = lb.beschr_id AND be.text ='Nur an Schultagen' AND b.mita_id NOT IN (SELECT mita_id FROM besitzt_fuehrerschein)",
    selectType: '8'
  },
  {
    id: '219',
    schema: 'busse',
    difficulty: 'schwer',
    text: 'Welche Busse (fahrzeug_id) werden auf Linien eingesetzt, die alle Beschränkungen aufweisen?',
    solutionQuery: 'SELECT b.fahrzeug_id FROM busse b, einsatzplan e, fahrten f, linie l WHERE b.fahrzeug_id = e.fahrzeug_id AND e.fahrt_id = f.fahrt_id AND f.linien_id = l.linien_id AND NOT EXISTS (SELECT * FROM beschraenkungen be WHERE NOT EXISTS (SELECT * FROM linie_beschraenkungen lb WHERE lb.linien_id = l.linien_id AND be.beschr_id = lb.beschr_id))',
    selectType: '9'
  },
  {
    id: '45',
    schema: 'fahrrad',
    difficulty: 'mittel',
    text: 'Geben Sie eine Liste aus, über alle Teile mit TNr, Bezeichnung und den Lagern, auf denen die Teile gelagert sind!',
    solutionQuery: 'SELECT Teile.TNR, Bezeichnung, LANR FROM Teile, Lagerbestand WHERE Teile.Tnr = Lagerbestand.Tnr',
    selectType: '4'
  },
  {
    id: '46',
    schema: 'fahrrad',
    difficulty: 'schwer',
    text: "Geben Sie eine Liste aus, über alle Teile mit TNr, Bezeichnung und den Lagern, auf denen die Teile gelagert sind sowie diejenigen Teile, für die kein Lagerbestand vorliegt mit dem Eintrag '0' bei der Lagernummer !",
    solutionQuery: 'SELECT Teile. TNR, Bezeichnung, LANR FROM Teile, Lagerbestand WHERE Teile.Tnr = Lagerbestand.Tnr UNION SELECT TNR, Bezeichnung, 0 FROM Teile WHERE TNR NOT IN (SELECT TNr FROM Lagerbestand)',
    selectType: '11'
  },
  {
    id: '169',
    schema: 'fahrrad',
    difficulty: 'leicht',
    text: 'Zählen Sie alle Abteilungen!',
    solutionQuery: 'select count(*) from abteilungen',
    selectType: '12'
  },
  {
    id: '133',
    schema: 'fussball',
    difficulty: 'schwer',
    text: 'Welche Mannschaft hat alle Spiele in der Vorrunde gewonnen?',
    solutionQuery: "SELECT spiele.MANNSCHAFT_1 as Mannschaft FROM spiele WHERE Mannschaft_1 NOT IN (SELECT mannschaft_1 FROM spiele WHERE substr(Ergebnis, 1,1) <= SUBSTR(Ergebnis, 3,1)) AND Typ = 'Vorrunde' MINUS SELECT spiele.MANNSCHAFT_2 as Mannschaft FROM spiele WHERE Mannschaft_2 not IN (SELECT mannschaft_2 FROM spiele WHERE substr(Ergebnis, 1,1) <= SUBSTR(Ergebnis, 3,1)) AND Typ = 'Vorrunde'",
    selectType: '8'
  },
  {
    id: '134',
    schema: 'fussball',
    difficulty: 'schwer',
    text: 'Welche Mannschaft (Nation.Nationnname) wurde Weltmeister 2006?',
    solutionQuery: "SELECT Mannschaft_1 FROM Spiele WHERE TYP = 'Finale' and SUBSTR(Ergebnis, 1,1) > SUBSTR(Ergebnis, 3,1) union SELECT Mannschaft_2 FROM Spiele WHERE TYP = 'Finale' and SUBSTR(Ergebnis, 3,1) > SUBSTR(Ergebnis, 1,1)",
    selectType: '11'
  },
  {
    id: '138',
    schema: 'fussball',
    difficulty: 'leicht',
    text: 'Welche Spieler (Vorname, Nachname) spielen für Paraguay?',
    solutionQuery: "SELECT spieler.VORNAME, spieler.NACHNAME FROM spieler WHERE spieler.NATIONNAME = 'Paraguay'",
    selectType: '1'
  },
  {
    id: '170',
    schema: 'fahrrad',
    difficulty: 'leicht',
    text: 'Zählen Sie die Angestellten, die Elektriker sind!',
    solutionQuery: "select count(*) from angestellte where beruf='Elektriker'",
    selectType: '12'
  },
  {
    id: '171',
    schema: 'fahrrad',
    difficulty: 'leicht',
    text: 'Zählen Sie die Kunden die in einem Ort mit dem Anfangsbuchstaben G wohnen!',
    solutionQuery: "select count(*) from kunden where ort LIKE 'G%'",
    selectType: '12'
  },
  {
    id: '172',
    schema: 'fahrrad',
    difficulty: 'schwer',
    text: 'Geben Sie für jeden Artikel den Namen und den Gesamtumsatz (Verkaufspreis*Anzahl as gesamtumsatz) aus und sortieren Sie absteigend nach dem Gesamtumsatz!',
    solutionQuery: 'select bezeichnung, verkaufspreis*jahresumsatz as gesamtumsatz from artikel order by gesamtumsatz desc',
    selectType: '15'
  },
  {
    id: '173',
    schema: 'fahrrad',
    difficulty: 'mittel',
    text: 'Geben Sie die Namen (vorname, nachname) aller Elektriker aus!',
    solutionQuery: "select vorname, nachname from angestellte where beruf='Elektriker'",
    selectType: '1'
  },
  {
    id: '174',
    schema: 'fahrrad',
    difficulty: 'mittel',
    text: 'Geben Sie alle Spalten aus der Tabelle Teile aus, die keine Baugruppe sind und deren Bestand höchstens der Mindestbestand ist',
    solutionQuery: "select * from teile where typ<>'Baugruppe' and bestand<=mindestbestand",
    selectType: '1'
  },
  {
    id: '176',
    schema: 'theater',
    difficulty: 'leicht',
    text: 'Geben Sie alle Stücke (Titel und Autor) aus, die in Weimar uraufgeführt wurden!',
    solutionQuery: "select titel, autor from drama where ort_urauffuehrung='Weimar'",
    selectType: '1'
  },
  {
    id: '177',
    schema: 'theater',
    difficulty: 'mittel',
    text: 'Geben Sie die Anzahl der Dramen an, die in Weimar uraufgeführt und von Schiller geschrieben wurden!',
    solutionQuery: "select count(*) from drama where ort_urauffuehrung='Weimar' and autor='Schiller'",
    selectType: '12'
  },
  {
    id: '178',
    schema: 'theater',
    difficulty: 'mittel',
    text: 'Welcher Schauspieler (name, figur) stellt welche Figur dar? Sortieren Sie absteigend nach dem Namen der Figur!',
    solutionQuery: 'select s.name, d.figur from stellt_dar d, schauspieler s where d.pnr=s.pnr order by figur asc',
    selectType: '4'
  },
  {
    id: '179',
    schema: 'theater',
    difficulty: 'mittel',
    text: 'Geben Sie die Anzahl der Engagements (engaments) und die zugehörigen Namen der Theater aus!',
    solutionQuery: 'select count(*), name from engament group by name',
    selectType: '3'
  },
  {
    id: '181',
    schema: 'reisen',
    difficulty: 'mittel',
    text: "Wie hoch ist die durchschnittliche Reisezeit beim Abflug von Köln-Bonn Flughafen an (like 'Köln%')",
    solutionQuery: "select avg(rzeit) from reisezeit where flughafen1 LIKE 'Köln%' group by flughafen1",
    selectType: '2'
  },
  {
    id: '182',
    schema: 'reisen',
    difficulty: 'leicht',
    text: 'Geben Sie Hotelname, Stadtname, gebuchte Einzelzimmer und gebuchte Doppelzimmer für Hotels an, in denen mehr Einzel- als Doppelzimmer gebucht wurden!',
    solutionQuery: 'select hotelname, stadtname, gebuchteez, gebuchtedz from buchung where gebuchteez>gebuchtedz',
    selectType: '1'
  },
  {
    id: '185',
    schema: 'fussball',
    difficulty: 'schwer',
    text: 'Geben Sie den Ausführungsort und die Einnahmen (...as einnahmen) für jedes Spiel an!',
    solutionQuery: 'select s.ausfuehrungsort, sum(p.preis) from karten k, preiskategorie p, spiele s where k.preiskategorie=p.preiskategorie and s.spiel_id=k.spiel_id group by k.spiel_id, s.ausfuehrungsort',
    selectType: '2'
  },
  {
    id: '186',
    schema: 'fussball',
    difficulty: 'mittel',
    text: 'Geben Sie die Gesamteinnahmen aus allen Spielen an!',
    solutionQuery: 'select sum(p.preis) from karten k, preiskategorie p where k.preiskategorie=p.preiskategorie',
    selectType: '12'
  },
  {
    id: '187',
    schema: 'fussball',
    difficulty: 'schwer',
    text: 'Geben Sie alle Ausweisnummern aus von Personen, die Spiele der deutschen Mannschaft besucht haben',
    solutionQuery: "select p.ausweisnummer from personen p, karten k, spiele s where k.personen_id=p.personen_id and k.spiel_id=s.spiel_id and (mannschaft_1='Deutschland' or mannschaft_2='Deutschland')",
    selectType: '4'
  },
  {
    id: '188',
    schema: 'fussball',
    difficulty: 'mittel',
    text: 'Welche Spieler (Nachname, Vorname, Gehalt_in_euro, ohne Duplikate!) haben in der ersten Halbzeit Tore geschossen?',
    solutionQuery: 'select distinct s.nachname, s.vorname, s.gehalt_in_euro from spieler s, tore t where s.spieler_id=t.spieler_id and minute <= 45',
    selectType: '4'
  },
  {
    id: '189',
    schema: 'fussball',
    difficulty: 'schwer',
    text: 'Geben Sie alle Spiele an (Mannschaft_1, Mannschaft_2, Ergebnis) in denen in der Verlängerung (91. - 120. Minute) noch Tore gefallen sind',
    solutionQuery: 'select s.mannschaft_1, s.mannschaft_2, s.ergebnis from spiele s, tore t where s.spiel_id=t.spiel_id and t.minute>90 and t.minute<=120',
    selectType: '4'
  },
  {
    id: '128',
    schema: 'fussball',
    difficulty: 'leicht',
    text: 'Welche Nationen (alle Spalten) machen bei der Fußballweltmeisterschaft 2006 mit? Ordnen Sie die Ausgabe alphabetisch nach der Spalte "Nationname"!',
    solutionQuery: 'SELECT * FROM nation ORDER BY Nationname',
    selectType: '15'
  },
  {
    id: '129',
    schema: 'fussball',
    difficulty: 'mittel',
    text: 'Welcher Trainer (Trainername) trainiert den Spieler "Edison Vicente Mendez"?',
    solutionQuery: "SELECT nation.TRAINERNAME FROM nation, spieler WHERE spieler.NATIONNAME = nation.NATIONNAME AND Nachname = 'Mendez' AND Vorname = 'Edison Vicente'",
    selectType: '4'
  },
  {
    id: '153',
    schema: 'fussball',
    difficulty: 'mittel',
    text: 'Welche Nationen haben in der Vorrunde gespielt?',
    solutionQuery: "SELECT Nationname FROM Nation WHERE Nationname IN (SELECT Mannschaft_1 FROM Spiele WHERE Typ = 'Vorrunde' UNION SELECT Mannschaft_2 FROM Spiele WHERE Typ = 'Vorrunde')",
    selectType: '11'
  },
  {
    id: '154',
    schema: 'fussball',
    difficulty: 'schwer',
    text: 'Welche Nationen haben nur (!) in der Vorrunde gespielt?',
    solutionQuery: "SELECT Nationname FROM NationWHERE Nationname IN (SELECT DISTINCT Mannschaft_1 FROM Spiele WHERE Typ = 'Vorrunde' UNION SELECT DISTINCT Mannschaft_2 FROM Spiele WHERE Typ = 'Vorrunde')AND Nationname NOT IN (SELECT DISTINCT Mannschaft_1 FROM Spiele WHERE Typ != 'Vorrunde' UNION SELECT DISTINCT Mannschaft_2 FROM Spiele WHERE Typ != 'Vorrunde')",
    selectType: '11'
  },
  {
    id: '155',
    schema: 'fussball',
    difficulty: 'schwer',
    text: 'Listen Sie die Gruppen auf mit der Anzahl an Toren, die während der Vorrunde geschossen wurden!',
    solutionQuery: 'SELECT n.Gruppe, COUNT(*) FROM Nation n, Spiele s, Tore t WHERE n.Nationname = s.mannschaft_1 AND s.Spiel_Id = t.Spiel_Id AND s.Typ group by n.gruppe',
    selectType: '2'
  },
  {
    id: '156',
    schema: 'fussball',
    difficulty: 'leicht',
    text: 'Wie viele Zuschauer hat für jede Runde des Turniers (Typ des Spiels) gegeben?',
    solutionQuery: 'SELECT Typ, SUM(Anzahl_Zuschauer) FROM Spiele GROUP BY Typ',
    selectType: '2'
  },
  {
    id: '159',
    schema: 'fussball',
    difficulty: 'schwer',
    text: 'In welchen Ausführungsorten hat Deutschland gewonnen?',
    solutionQuery: "SELECT spiele.AUSFUEHRUNGSORT FROM spiele WHERE ( spiele.MANNSCHAFT_1 = 'Deutschland' AND SUBSTR(Spiele.ERGEBNIS, 1,1) > SUBSTR(Spiele.ERGEBNIS, 3,1) OR ( spiele.MANNSCHAFT_2 = 'Deutschland') AND SUBSTR(Spiele.ERGEBNIS, 3,1) > SUBSTR(Spiele.ERGEBNIS, 1,1))",
    selectType: '1'
  },
  {
    id: '160',
    schema: 'fussball',
    difficulty: 'leicht',
    text: 'Welche Trainer (Ausgabe: Trainername) der Mannschaft_1 haben Spiele in der Stadt Dortmund betreut?',
    solutionQuery: "SELECT n.trainername FROM spiele w, nation n WHERE w.MANNSCHAFT_1 = n.NATIONNAME AND w.AUSFUEHRUNGSORT = 'Dortmund'",
    selectType: '4'
  },
  {
    id: '161',
    schema: 'fussball',
    difficulty: 'mittel',
    text: 'Welche Trainer (Ausgabe: Trainername, Nationname) der Mannschaft_1 haben nur !!! Spiele in der Stadt Dortmund betreut?',
    solutionQuery: "SELECT n.trainername FROM spiele w, nation n WHERE w.MANNSCHAFT_1 = n.NATIONNAME\nAND w.AUSFUEHRUNGSORT = 'Dortmund' AND n.TRAINERNAME NOT IN (SELECT n.trainername FROM spiele w, nation n WHERE w.MANNSCHAFT_1 = n.NATIONNAME AND w.AUSFUEHRUNGSORT != 'Dortmund')",
    selectType: '8'
  },
  {
    id: '162',
    schema: 'fussball',
    difficulty: 'schwer',
    text: 'Welche Länder haben in welchen Spielen mehr als 2 Tore geschossen? (Ausgabe: Nationname, Spiel_id, Ausführunsort, Tore,)Achtung: Landname und Tore können sowohl die von Mannschaft 1 als auch von Mannschaft 2 sein!',
    solutionQuery: 'SELECT nation.NATIONNAME, spiele.SPIEL_ID, spiele.AUSFUEHRUNGSORT, nation.TRAINERNAME, count(*) FROM nation, spiele, tore WHERE nation.NATIONNAME = spiele.MANNSCHAFT_1 AND spiele.SPIEL_ID = tore.SPIEL_IDGROUP BY nation.NATIONNAME, nation.TRAINERNAME ,spiele.SPIEL_ID, spiele.AUSFUEHRUNGSORT having COUNT(*) > 2 union SELECT nation.NATIONNAME, spiele.SPIEL_ID, spiele.AUSFUEHRUNGSORT, nation.TRAINERNAME, count(*)FROM nation, spiele, tore WHERE nation.NATIONNAME = spiele.MANNSCHAFT_2 AND spiele.SPIEL_ID = tore.SPIEL_ID GROUP BY nation.NATIONNAME, nation.TRAINERNAME ,spiele.SPIEL_ID, spiele.AUSFUEHRUNGSORT having COUNT(*) > 2',
    selectType: '11'
  },
  {
    id: '163',
    schema: 'fussball',
    difficulty: 'mittel',
    text: 'In welchen Ausführungsorten wird kein Spiel des Achtelfinals ausgetragen?',
    solutionQuery: "SELECT Spiele.AUSFUEHRUNGSORT FROM Spiele WHERE Spiele.AUSFUEHRUNGSORT NOT IN (SELECT Spiele.AUSFUEHRUNGSORT FROm Spiele WHERE TYp = 'Achtelfinale')",
    selectType: '5'
  },
  {
    id: '164',
    schema: 'fussball',
    difficulty: 'leicht',
    text: 'Welche Mannschaften (Spiele.Mannschaften_1, Spiele.Mannschaften_2) spielten im Finale gegeneinander?',
    solutionQuery: "SELECT spiele.MANNSCHAFT_1, spiele.MANNSCHAFT_2 FROM Spiele WHERe Typ = 'Finale'",
    selectType: '1'
  },
  {
    id: '165',
    schema: 'fussball',
    difficulty: 'mittel',
    text: 'Welche Länder spielten in allen Ausführungsorten, die mit H beginnen?',
    solutionQuery: "SELECT nation.NATIONNAME FROM nation WHERe NOT EXISTS ( (SELECT * FROM Spiele s1 WHERE S1.AUSFUEHRUNGSORT like 'H%' AND NOT EXISTS\n (SELECT * FROM spiele s2 WHERE S2.AUSFUEHRUNGSORT like 'H%' AND (s1.mannschaft_1 = nation.NATIONNAME OR s2.mannschaft_2 = nation.NATIONNAME))))",
    selectType: '9'
  },
  {
    id: '139',
    schema: 'fussball',
    difficulty: 'mittel',
    text: 'Listen Sie alle Spieler des deutschen Teams mit ihrem Trainer auf! (Spalten: NAchname, Vorname, Trainename)',
    solutionQuery: "SELECT sp.nachname, sp.vorname, na.trainername FROM spieler sp, nation na WHERE sp.nationname='Deutschland' AND na.nationname= sp.nationname",
    selectType: '4'
  },
  {
    id: '140',
    schema: 'fussball',
    difficulty: 'mittel',
    text: 'Wie viele Tore schoss der Spieler "Miroslav Klose"?',
    solutionQuery: "SELECT count(*) FROM tore WHERE tore.spieler_id=(SELECT spieler_id FROM spieler WHERE nachname='Klose')",
    selectType: '5'
  },
  {
    id: '141',
    schema: 'fussball',
    difficulty: 'mittel',
    text: 'Geben Sie alle Spieler der brasilianischen Mannschaft aus, die kein Tor geschossen haben (zu selektierende Spalten: Spieler_id, Nachname)! ',
    solutionQuery: "SELECT DISTINCT spieler.spieler_id, spieler.nachname FROM spieler, tore WHERE spieler.nationname='Brasilien' AND spieler.spieler_id NOT IN (SELECT tore.spieler_id FROM tore, spieler WHERE tore.spieler_id=spieler.spieler_id) ",
    selectType: '5'
  },
  {
    id: '142',
    schema: 'fussball',
    difficulty: 'leicht',
    text: 'In welchem Spiel (alle Spalten) gewann die deutsche Mannschaft 4:2?',
    solutionQuery: "SELECT * FROM Spiele WHERE (Ergebnis='4:2' AND Mannschaft_1='Deutschland' ) OR (Ergebnis='2:4' AND Mannschaft_2='Deutschland' )",
    selectType: '1'
  },
  {
    id: '143',
    schema: 'fussball',
    difficulty: 'leicht',
    text: 'Geben Sie alle Spiele vom Typ Vorrunde aus (alle Spalten)! ',
    solutionQuery: "SELECT * FROM spiele WHERE typ='Vorrunde'",
    selectType: '1'
  },
  {
    id: '144',
    schema: 'fussball',
    difficulty: 'mittel',
    text: 'Geben Sie alle Spiele aus, welche durch Elfmeterschießen entschieden wurden. (Elfmeter-Tore werden mit der 999 Minute gekennzeichnet!) (zu selektierende Spalten: spiel_id)',
    solutionQuery: 'SELECT spiele.spiel_id FROM spiele, tore WHERE spiele.spiel_id=tore.spiel_id AND tore.minute=999',
    selectType: '1'
  },
  {
    id: '145',
    schema: 'fussball',
    difficulty: 'leicht',
    text: 'Geben Sie alle Spiele aus, die in Berlin ausgetragen wurden (alle Spalten)!',
    solutionQuery: "SELECT * FROM Spiele WHERE ausfuehrungsort='Berlin'",
    selectType: '1'
  },
  {
    id: '146',
    schema: 'fussball',
    difficulty: 'leicht',
    text: 'Wie viele Euros verdienen alle deutschen Spieler im Jahr insgesamt? (zu selektierende Spalten: Gehalt_in_Euro)',
    solutionQuery: "SELECT SUM(Gehalt_in_Euro) FROM spieler WHERE nationname='Deutschland'",
    selectType: '12'
  },
  {
    id: '148',
    schema: 'fussball',
    difficulty: 'schwer',
    text: 'Geben Sie alle Spieler aus, die im Spiel Deutschland gegen Argentinien Tore geschossen haben. (zu selektierende Spalten: Spieler_ID, Nachname, Nationname) ',
    solutionQuery: "SELECT DISTINCT spieler.spieler_id, spieler.nachname, spieler.nationname FROM spieler, spiele, tore WHERE tore.spiel_id= (SELECT spiel_id FROM spiele WHERE (mannschaft_1='Deutschland' AND mannschaft_2='Argentinien') OR (mannschaft_1='Argentinien' AND mannschaft_2='Deutschland')) AND spieler.spieler_id=tore.spieler_id",
    selectType: '5'
  },
  {
    id: '149',
    schema: 'fussball',
    difficulty: 'mittel',
    text: 'Welche Spieler haben in Koeln Tore geschossen? (zu selektierende Spalte: Nachname) ',
    solutionQuery: "SELECT spieler.nachname FROM spieler WHERE spieler_id IN (SELECT tore.spieler_id FROM tore, spiele WHERE tore.spiel_id=spiele.spiel_id AND spiele.ausfuehrungsort='Koeln')",
    selectType: '5'
  },
  {
    id: '150',
    schema: 'fussball',
    difficulty: 'mittel',
    text: 'Geben Sie alle Spieler aus, die Elfmeter (Torminute = 999) geschossen und dadurch Tore erzielt haben(zu selektierende Spalten: Nationname, Nachname)! Geben Sie keinen doppelten Tupel aus und sortieren über Nationname, Nachname!',
    solutionQuery: 'SELECT spieler.nachname , Spieler.Nationname FROM spieler, tore WHERE spieler.spieler_id=tore.spieler_id AND tore.minute=999 GROUP BY Spieler.Nationname, spieler.nachname , Spieler.Nationname',
    selectType: '2'
  },
  {
    id: '151',
    schema: 'fussball',
    difficulty: 'mittel',
    text: 'Welche Mannschaften der Gruppe B schafften es ins Achtelfinale? (zu selektierende Spalten: Nationname) ',
    solutionQuery: "SELECT nationname FROM nation WHERE gruppe='B' AND (nationname IN (SELECT mannschaft_1 FROM spiele WHERE typ='Achtelfinale') OR nationname IN (SELECT mannschaft_2 FROM spiele WHERE typ='Achtelfinale'))",
    selectType: '5'
  },
  {
    id: '152',
    schema: 'fussball',
    difficulty: 'mittel',
    text: 'Geben Sie das durchschnittliche Gehalt aller Spieler aus, die weniger als Oliver Kahn verdienen (zu selektierende Spalten: Gehalt_in_Euro)! ',
    solutionQuery: "SELECT AVG(gehalt_in_euro) FROM spieler WHERE gehalt_in_euro< (SELECT gehalt_in_euro FROM spieler WHERE nachname='Kahn')",
    selectType: '5'
  },
  {
    id: '130',
    schema: 'fussball',
    difficulty: 'leicht',
    text: 'An welchen Spielen (alle Spalten) nahm England teil?',
    solutionQuery: "SELECT * FROM Spiele WHERE mannschaft_1 = 'England' OR Mannschaft_2 = 'England'",
    selectType: '1'
  },
  {
    id: '131',
    schema: 'fussball',
    difficulty: 'schwer',
    text: 'Welche Mannschaft (Ausgabe: Mannschaft) hat kein Tor geschossen?',
    solutionQuery: 'SELECT spiele.MANNSCHAFT_1 as Manschaft FROM spiele WHERE Mannschaft_1 not IN (SELECT mannschaft_1 FROM spiele WHERE substr(Ergebnis, 1,1) > 0) INTERSECT SELECT spiele.MANNSCHAFT_2 as Manschaft FROM spiele WHERE Mannschaft_2 not IN (SELECT mannschaft_2 FROM spiele WHERE substr(Ergebnis, 3,1) > 0) ',
    selectType: '5'
  },
  {
    id: '135',
    schema: 'fussball',
    difficulty: 'schwer',
    text: 'Wie viele Punkte hat Ghana in der Vorrunde bekommen?',
    solutionQuery: "SELECT((SELECT COUNT(*) * 3 FROM spiele WHERE mannschaft_1 = 'Ghana'AND TYP = 'Vorrunde' AND SUBSTR(ergebnis, 1,1 ) > SUBSTR(ergebnis, 3,1 ) ) +(SELECT COUNT(*) * 3 FROM spiele WHERE mannschaft_2 = 'Ghana' AND TYP = 'Vorrunde' AND SUBSTR(ergebnis, 1,1 ) > SUBSTR(ergebnis, 3,1 )) + (SELECT COUNT(*) FROM spiele WHERE (mannschaft_2 = 'Ghana' or mannschaft_1 = 'Ghana')AND TYP = 'Vorrunde' AND SUBSTR(ergebnis, 1,1 ) = SUBSTR(ergebnis, 3,1 ))) FROM DUAL",
    selectType: '8'
  },
  {
    id: '136',
    schema: 'fussball',
    difficulty: 'mittel',
    text: 'Welche Mannschaft hat am 13.06.2006 gespielt? Erzeugen Sie eine Tabelleausgabe mit einer Spalte, in der alle Mannschaften aufgeführt sind.',
    solutionQuery: "SELECT mannschaft_1 as mannschaft FROM Spiele WHERE spiele.TERMIN = '13-Jun-2006' UNION SELECT mannschaft_2 as mannschaft FROM Spiele WHERE spiele.TERMIN = '13-Jun-2006'",
    selectType: '11'
  },
  {
    id: '137',
    schema: 'fussball',
    difficulty: 'leicht',
    text: 'Welche Spiele (alle Spalten) fanden in einer Stadt statt (Ausführungsort), die mit K anfängt?',
    solutionQuery: "SELECT * FROM Spiele WHERE Ausfuehrungsort like 'K%'",
    selectType: '13'
  },
  {
    id: '220',
    schema: 'welt',
    difficulty: 'leicht',
    text: 'Wie heißt die Hauptstadt von Ghana?',
    solutionQuery: "SELECT capital FROM country WHERE name = 'Ghana'",
    selectType: '1'
  },
  {
    id: '221',
    schema: 'welt',
    difficulty: 'leicht',
    text: 'Welche Flüsse (Spalte: name) durchqueren einen See? ',
    solutionQuery: 'SELECT name FROM river WHERE lake is not null',
    selectType: '17'
  },
  {
    id: '223',
    schema: 'welt',
    difficulty: 'leicht',
    text: 'Welche Länder haben eine Fläche (area) zwischen 200000 und 300000 Quadratkilometer? Bitte absteigend über die Fläche ordnen und alle Spalten der Tabelle COUNTRY ausgeben!',
    solutionQuery: 'SELECT * FROM COUNTRY WHERE AREA BETWEEN 200000 AND 300000 ORDER BY AREA DESC',
    selectType: '1'
  },
  {
    id: '222',
    schema: 'welt',
    difficulty: 'leicht',
    text: 'Welche Flüsse münden in ein Meer das mit ‚N‘ anfängt? Geben Sie alle Spalten der Tabelle river aus!',
    solutionQuery: "SELECT * FROM river WHERE sea like 'N%'",
    selectType: '13'
  },
  {
    id: '224',
    schema: 'welt',
    difficulty: 'leicht',
    text: 'Welche Städte (city, island) liegen auf einer Insel?',
    solutionQuery: 'SELECT City, ISLAND FROM locatedon WHERE ISLAND is not null AND city is not Null',
    selectType: '17'
  },
  {
    id: '225',
    schema: 'welt',
    difficulty: 'leicht',
    text: 'Welche Städte (city, sea) in Tabelle located liegen an einem Meer?',
    solutionQuery: 'SELECT City, SEA FROM located WHERE SEA is not null AND city is not Null',
    selectType: '17'
  },
  {
    id: '226',
    schema: 'welt',
    difficulty: 'leicht',
    text: 'Welche Länder (DISTINCT country) haben einen GDP >= 300000?',
    solutionQuery: 'SELECT DISTINCT COUNTRY FROM economy WHERE GDP >= 300000 AND GDP IS NOT NULL',
    selectType: '1'
  },
  {
    id: '227',
    schema: 'welt',
    difficulty: 'mittel',
    text: 'Welche Länder grenzen an Deutschland? Sortieren Sie diese Länder aufsteigend nach der Grenzlänge! (country1, country2, length)',
    solutionQuery: "SELECT country1, country2, LENGTH FROM borders, country WHERE country1 = 'D' AND (country.country = country1) OR (country2 = 'D' AND country. country = country2) ORDER BY LENGTH",
    selectType: '4'
  },
  {
    id: '229',
    schema: 'welt',
    difficulty: 'mittel',
    text: 'Welche Länder (alle Spalten) haben keinen See-Zugang zu einem der Weltmeere?',
    solutionQuery: 'SELECT * FROM COUNTRY WHERE country NOT IN (SELECT COUNTRY FROM GEO_SEA)',
    selectType: '5'
  },
  {
    id: '230',
    schema: 'welt',
    difficulty: 'mittel',
    text: 'Geben Sie die Namen aller Organisationen an (DISTINCT organization, name), in denen Länder mit einem Bruttoinlandsprodukt (BIP) von weniger als 30000 $ pro Person Mitglied sind (das BIP eines Landes ist als “GDP” in der Tabelle “Economy” zu finden)',
    solutionQuery: 'SELECT DISTINCT i.ORGANIZATION, o.Name FROM isMember i, Organization o WHERE EXISTS (SELECT * FROM Economy e WHERE GDP <= 30000 AND I.ORGANIZATION = E.COUNTRY) AND I.ORGANIZATION = o.ABBREVIATION',
    selectType: '8'
  },
  {
    id: '231',
    schema: 'welt',
    difficulty: 'mittel',
    text: 'Geben Sie alle Flüsse mit ihren Anrainerstaaten (Staaten, die die Flüsse durchqueren) aus.(river, country, name (name von COUNTRY, NICHT RIVER))',
    solutionQuery: 'SELECT g.RIVER, g.COUNTRY , c.name FROM geo_river g, country c WHERE g.country = c.country GROUP BY g.RIVER, g.COUNTRY , c.name ORDER BY g.river, g.country',
    selectType: '2'
  },
  {
    id: '232',
    schema: 'welt',
    difficulty: 'mittel',
    text: 'Geben Sie alle Inseln aus mit den zugehörigen Bergen (Tabelle MOUNTAINONISLAND), wobei auch die Inseln, auf denen kein Berg liegt, ausgegeben werden sollen! (island, mountain)',
    solutionQuery: 'select i.island, m.mountain from island i left outer join Mountainonisland m on i.island = m.island',
    selectType: '7'
  },
  {
    id: '233',
    schema: 'welt',
    difficulty: 'mittel',
    text: 'Geben Sie nur alle Inseln (island) aus, auf denen kein Berg liegt!',
    solutionQuery: 'SELECT Name island from island minus SELECT island from MOUNTAINONISLAND',
    selectType: '11'
  },
  {
    id: '234',
    schema: 'welt',
    difficulty: 'schwer',
    text: 'Welcher Staat (country, name, continent, percentage) gehört mehr als einem Kontinent an?',
    solutionQuery: 'SELECT c.Country, c.Name, e.Continent, e.Percentage FROM Country c, encompasses e WHERE c. Country = e.country AND c.COUNTRY IN ( SELECT COUNTRY FROM encompasses GROUP BY COUNTRY HAVING COUNT (*) > 1)',
    selectType: '5'
  },
  {
    id: '235',
    schema: 'welt',
    difficulty: 'schwer',
    text: 'In welchen Ländern (country, name, language) der Welt werden mehr als zwei Sprachen gesprochen?',
    solutionQuery: 'SELECT c.country, c.Name, l.language FROM COUNTRY c, Language l WHERE c.COUNTRY = l.country AND c.COUNTRY IN ( SELECT country FROM language GROUP BY country HAVING COUNT (*) > 1) ORDER BY country',
    selectType: '5'
  },
  {
    id: '236',
    schema: 'welt',
    difficulty: 'schwer',
    text: 'In der Datenbank werden in den Relationen Country und Province Informationen über Einwohner redundant gehalten. Ermitteln Sie mit entsprechenden Anfragen die inkonsistenten Paare. Als inkonsistent werden dabei Abweichungen größer als 10% des Absolutwertes betrachtet. (country, sum(province.population), country.population)',
    solutionQuery: 'SELECT p.country, SUM (p.population), c.population FROM province p, country c WHERE c.country = p.country GROUP BY p.country, c.population HAVING ABS ( (SUM (p.population) - c.population)) / c.population > 0.1',
    selectType: '2'
  },
  {
    id: '237',
    schema: 'welt',
    difficulty: 'schwer',
    text: 'Berechnen Sie die absoluten Zahlen der Anhänger jeder Religion der Weltbevölkerung sowie den prozentualen Anteil der Anhänger jeder Religion an der Weltbevölkerung (religion, (KALKULATION ABSOLUTE ANZAHL) as amount, (KALKULATION RELATIVE PROZENTZAHL) as percentage)',
    solutionQuery: 'SELECT r.religion, SUM (TRUNC (r.percentage * c.population)), ROUND(SUM (TRUNC (r.percentage * c.population)) / (SELECT SUM (c2.population) FROM country c2), 1) AS percentage FROM country c, religion r WHERE r.country = c.country GROUP BY r.religion ORDER BY percentage DESC',
    selectType: '4'
  },
  {
    id: '240',
    schema: 'welt',
    difficulty: 'leicht',
    text: 'Geben Sie alle Kontinente (alle Spalten) aufsteigend nach ihrer Fläche sortiert aus (kleinster Kontinent zuerst)!',
    solutionQuery: 'SELECT * FROM continent ORDER BY area asc',
    selectType: '15'
  },
  {
    id: '241',
    schema: 'welt',
    difficulty: 'leicht',
    text: 'Welche Länder liegen in Europa? Geben Sie die Länderkürzel aus! (Tabelle encompasses)',
    solutionQuery: "SELECT country FROM encompasses WHERE UPPER(continent) = 'EUROPE'",
    selectType: '1'
  },
  {
    id: '242',
    schema: 'welt',
    difficulty: 'leicht',
    text: 'Geben Sie alle Wüsten (desert, area) absteigend sortiert (beginnend mit der größten) aus!',
    solutionQuery: 'SELECT desert, area FROM desert ORDER BY area desc',
    selectType: '15'
  },
  {
    id: '243',
    schema: 'welt',
    difficulty: 'mittel',
    text: 'Geben Sie alle Hauptstädte (capital) Europas aus!',
    solutionQuery: "SELECT capital FROM country c INNER JOIN encompasses e ON (c.country) WHERE UPPER(e.continent) ='EUROPE'",
    selectType: '4'
  },
  {
    id: '244',
    schema: 'welt',
    difficulty: 'mittel',
    text: 'Geben Sie die Insel (island) mit der größten Fläche aus!',
    solutionQuery: 'SELECT island FROM island WHERE area >= (SELECT MAX(area) FROM island)',
    selectType: '5'
  },
  {
    id: '245',
    schema: 'welt',
    difficulty: 'mittel',
    text: 'Welcher See (lake) ist der tiefste?',
    solutionQuery: 'SELECT lake FROM lake WHERE depth >= (SELECT MAX(depth) FROM lake)',
    selectType: '5'
  },
  {
    id: '247',
    schema: 'welt',
    difficulty: 'schwer',
    text: 'In welchen Ländern (country) gibt es die meisten unterschiedlichen Religion?',
    solutionQuery: 'SELECT count(country), country FROM religion GROUP BY country HAVING count(country) >= (SELECT MAX(COUNT(country)) FROM religion GROUP BY country)',
    selectType: '3'
  },
  {
    id: '248',
    schema: 'welt',
    difficulty: 'schwer',
    text: 'Geben Sie alle Länder mit ihren Provinzen (country, province) aus, die mehr als 50 Provinzen haben!',
    solutionQuery: 'SELECT country, province FROM province WHERE country IN (SELECT country FROM province GROUP BY country HAVING COUNT(country) > 50)',
    selectType: '5'
  },
  {
    id: '249',
    schema: 'welt',
    difficulty: 'schwer',
    text: 'Geben Sie alle Länder (country, population_growth, independence) aus, deren Bevölkerung schrumpft und die unabhängig sind (Spalte independence in politics)!',
    solutionQuery: 'SELECT p1.country, p1.population_growth, p2.independence FROM population p1 INNER JOIN politics p2 ON (p1.country =p2.country) WHERE p1.population_growth <= 0 and p2.independence IS NOT null',
    selectType: '4'
  },
  {
    id: '1129',
    schema: 'welt',
    difficulty: 'leicht',
    text: 'Welche Sprachen (Language) werden in der Schweiz gesprochen?',
    solutionQuery: "SELECT Language.Language FROM Language WHERE Language.country = 'CH'",
    selectType: '1'
  },
  {
    id: '1130',
    schema: 'welt',
    difficulty: 'mittel',
    text: 'Bestimmen Sie alle Länder (Spalten Country, Name), in denen eine Sprache gesprochen wird, die auch in der Schweiz gesprochen wird! Unterdrücken Sie Duplicate!',
    solutionQuery: "SELECT l2.COUNTRY, C.NAME FROM Language l1, Language l2, COUNTRY c WHERE L1.LANGUAGE = L2.LANGUAGE AND C.COUNTRY = L2.COUNTRY AND L1.COUNTRY = 'CH'group by l2.country, c.name",
    selectType: '6'
  },
  {
    id: '1131',
    schema: 'welt',
    difficulty: 'schwer',
    text: 'Bestimmen Sie alle Länder mit ihren Sprachen (Spalten Country, Name, Language), in denen eine Sprache gesprochen wird, die nicht in der Schweiz gesprochen wird!',
    solutionQuery: "SELECT l2.COUNTRY, C.NAME, L2.LANGUAGE FROM Language l2, COUNTRY c WHERE L2.LANGUAGE NOT IN (SELECT Language FROM language WHERE country = 'CH') AND C.COUNTRY = L2.COUNTRY",
    selectType: '5'
  },
  {
    id: '1132',
    schema: 'welt',
    difficulty: 'schwer',
    text: 'Bestimmen Sie alle Länder (Spalten Country, Name, Language), in denen nur eine Sprache gesprochen wird, die auch in der Schweiz gesprochen wird, (also keine andere Sprache, als die Sprachen aus der Schweiz)!',
    solutionQuery: "SELECT l2.COUNTRY, C.NAME, L2.LANGUAGE FROM Language l1, Language l2, COUNTRY c WHERE L1.LANGUAGE = L2.LANGUAGE AND C.COUNTRY = L2.COUNTRY AND L1.COUNTRY = 'CH'MINUSSELECT l2.COUNTRY, C.NAME, L2.LANGUAGE FROM Language l2, COUNTRY c WHERE L2.LANGUAGE NOT IN (SELECT Language FROM language WHERE country = 'CH') AND C.COUNTRY = L2.COUNTRY",
    selectType: '11'
  },
  {
    id: '1134',
    schema: 'welt',
    difficulty: 'schwer',
    text: 'Bestimmen Sie alle Länder (country), in denen alle Sprachen gesprochen werden, die auch in der Schweiz gesprochen werden!',
    solutionQuery: "SELECT l1.country FROM language l1 WHERE NOT EXISTS (SELECT * FROM LANGUAGE l2 WHERE NOT EXISTS (SELECT * FROM LANGUAGE l3 WHERE l3.COUNTRY = 'CH' AND l1.lANGUAGE = l2.lANGUAGE AND l2.country = l3.country))",
    selectType: '9'
  },
  {
    id: '1135',
    schema: 'welt',
    difficulty: 'schwer',
    text: 'Bestimmen Sie alle Abkürzungen (Abbreviation) und Namen der Organisationen, die auf jedem Kontinent mindestens ein Mitgliedsland haben! Unterdrücken Sie Duplicate!',
    solutionQuery: 'SELECT distinct abbreviation, name FROM organization o WHERE NOT EXISTS (SELECT * FROM continent c WHERE NOT EXISTS (SELECT * FROM ismember i, encompasses e WHERE i.country = e.country AND i.abbreviation = o.abbreviation AND e.continent = c.continent))',
    selectType: '9'
  },
  {
    id: '1139',
    schema: 'welt',
    difficulty: 'mittel',
    text: 'Welche Länder haben einen geringeren Anteil ihrer Fläche in Asien als die Türkei (country in tabelle encombasses)? Unterdrücken Sie doppelte Werte!',
    solutionQuery: "SELECT DISTINCT country, percentage FROM encompasses WHERE continent = 'Asia' AND percentage < (SELECT percentage FROM encompasses WHERE country = 'TR' AND continent = 'Asia');",
    selectType: '5'
  },
  {
    id: '1141',
    schema: 'welt',
    difficulty: 'schwer',
    text: 'Welche Länder sind in allen Organisationen Mitglied, in denen auch Deutschland ist (Tabelle isMember und Spalte Country)?Unterdrücken Sie Duplicate!',
    solutionQuery: "SELECT DISTINCT country FROM ismember M WHERE NOT EXISTS (SELECT DISTINCT abbreviation FROM ismember WHERE country = 'D' AND NOT EXISTS (SELECT DISTINCT abbreviation FROM isMEMBER WHERE country = M.country))",
    selectType: '9'
  },
  {
    id: '1142',
    schema: 'welt',
    difficulty: 'schwer',
    text: 'Geben Sie alle Länder Europas (Spalten: country, Name, abbreviation, continent) mit ihren Organisationen aus, auch diejenigen Länder, die in keiner Organisation sind!',
    solutionQuery: "SELECT encompasses.COUNTRY, country.name, ismember.abbreviation, encompasses.continent FROM encompasses LEFT OUTER JOIN ismember ON encompasses.country = ismember.country LEFT OUTER JOIN COUNTRY ON country.country = encompasses.country WHERE encompasses.continent = 'Europe'",
    selectType: '7'
  },
  {
    id: '1111',
    schema: 'fussball',
    difficulty: 'mittel',
    text: 'Welche Trainer (Ausgabe: Trainername, Nationname) der Mannschaft_1 haben nur (!) Spiele in der Stadt Dortmund betreut?',
    solutionQuery: "SELECT n.trainername FROM spiele w, nation n WHERE w.MANNSCHAFT_1 = n.NATIONNAMEAND w.AUSFUEHRUNGSORT = 'Dortmund' AND n.TRAINERNAME NOT IN (SELECT n.trainername FROM spiele w, nation n WHERE w.MANNSCHAFT_1 = n.NATIONNAME AND w.AUSFUEHRUNGSORT != 'Dortmund')",
    selectType: '8'
  },
  {
    id: '1112',
    schema: 'fussball',
    difficulty: 'schwer',
    text: 'Welche Nationen haben in welchen Spielen mehr als 2 Tore geschossen? (Ausgabe: Nationname, Spiel_id, Ausfuehrunsort, Tore,)Achtung: Nationname und Tore können sowohl die von Mannschaft 1 als auch von Mannschaft 2 sein!',
    solutionQuery: 'SELECT nation.NATIONNAME, spiele.SPIEL_ID, spiele.AUSFUEHRUNGSORT, nation.TRAINERNAME, count(*)FROM nation, spiele, toreWHERE nation.NATIONNAME = spiele.MANNSCHAFT_1 AND spiele.SPIEL_ID = tore.SPIEL_IDGROUP BY nation.NATIONNAME, nation.TRAINERNAME ,spiele.SPIEL_ID, spiele.AUSFUEHRUNGSORThaving COUNT(*) > 2union SELECT nation.NATIONNAME, spiele.SPIEL_ID, spiele.AUSFUEHRUNGSORT, nation.TRAINERNAME, count(*)FROM nation, spiele, toreWHERE nation.NATIONNAME = spiele.MANNSCHAFT_2 AND spiele.SPIEL_ID = tore.SPIEL_IDGROUP BY nation.NATIONNAME, nation.TRAINERNAME ,spiele.SPIEL_ID, spiele.AUSFUEHRUNGSORThaving COUNT(*) > 2',
    selectType: '3'
  },
  {
    id: '1113',
    schema: 'fussball',
    difficulty: 'mittel',
    text: 'Listen Sie alle Spieler des deutschen Teams mit ihrem Trainer auf! (Spalten: Nachname, Vorname, Trainername)',
    solutionQuery: "SELECT sp.nachname, sp.vorname, na.trainername FROM spieler sp, nation na WHERE sp.nationname='Deutschland' AND na.nationname= sp.nationname",
    selectType: '4'
  },
  {
    id: '1117',
    schema: 'fussball',
    difficulty: 'schwer',
    text: 'Welche Spieler (Ausgabe: Nationname, Nachname, Anzahl_Tore) haben Tore geschossen? Geben Sie die Spieler sortiert über Nationname und Nachnamen aus.',
    solutionQuery: 'SELECT Spieler.Nachname, Spieler.Nationname, COUNT(*) FROM spieler, Tore WHERE spieler.SPIELER_ID = Tore.SPIELER_ID GROUP BY Nationname, Nachname',
    selectType: '2'
  },
  {
    id: '1118',
    schema: 'fussball',
    difficulty: 'leicht',
    text: 'Welche Spieler (Nachname, Nationname) haben einen Nachnamen, der mit Z anfängt und zu welcher Nation gehören diese Spieler?',
    solutionQuery: "SELECT Nachname, NationName FROM Spieler WHERE Nachname LIKE 'Z%'",
    selectType: '13'
  },
  {
    id: '1119',
    schema: 'fussball',
    difficulty: 'leicht',
    text: 'Wie viele Nationen machen bei der Fußballweltmeisterschaft mit?',
    solutionQuery: 'SELECT count(*) FROM Nation',
    selectType: '12'
  },
  {
    id: '1120',
    schema: 'fussball',
    difficulty: 'schwer',
    text: 'In welchen Stadien (Spiele.Ausfuehrungsort) hat Deutschland nicht gespielt? Unterdrücken Sie Duplicate!',
    solutionQuery: "SELECT DISTINCT spiele.AUSFUEHRUNGSORT FROM spiele WHERE spiele.AUSFUEHRUNGSORT NOT IN (SELECT spiele.AUSFUEHRUNGSORT FROM Spiele WHERE spiele.MANNSCHAFT_1 = 'Deutschland' OR spiele.MANNSCHAFT_2= 'Deutschland' GROUP BY spiele.AUSFUEHRUNGSORT)",
    selectType: '5'
  },
  {
    id: '1121',
    schema: 'fussball',
    difficulty: 'mittel',
    text: 'Wie viele Stadien (Spiele.Ausfuehrungsort) gibt es, an denen Weltmeisterschaftsturniere stattfinden?',
    solutionQuery: 'SELECT COUNT (distinct spiele.AUSFUEHRUNGSORT) FROM spiele',
    selectType: '12'
  },
  {
    id: '1122',
    schema: 'fussball',
    difficulty: 'mittel',
    text: 'In welchen Stadien (Ausgabe: Spiele.Ausfuehrungsort) spielt die Nationalmannschaft von England in der Vorrunde?',
    solutionQuery: "SELECT spiele.AUSFUEHRUNGSORT FROM Spiele WHERE (spiele.MANNSCHAFT_1 = 'England' OR spiele.MANNSCHAFT_2 = 'England') AND spiele.TYP = 'Vorrunde'",
    selectType: '1'
  },
  {
    id: '1123',
    schema: ' fussball',
    difficulty: 'schwer',
    text: 'Ermitteln Sie die Summe über alle Lieferungen je Rohstoff für alle Lieferanten!',
    solutionQuery: 'SELECT t.tnr, sum(l1.menge), l2.name, l2.lief_nr FROM teile t, lieferungen l1, lieferanten l2 WHERE t.tnr = l1.TNR AND l1.lief_nr = l2.lief_nr GROUP by t.tnr, l2.lief_nr, l2.name',
    selectType: '2'
  },
  {
    id: '1124',
    schema: 'welt',
    difficulty: 'mittel',
    text: 'Geben Sie die größte Stadt Finnland aus (Spalten: city, population)!',
    solutionQuery: "SELECT city , population from city where country = 'SF'and population >= (SELECT MAX(POPULATION) from CITY where country = 'SF')",
    selectType: '5'
  },
  {
    id: '1125',
    schema: 'welt',
    difficulty: 'schwer',
    text: 'Geben Sie die drei größten Städte Finnlands aus! (Spalten: city, population in Tabelle City)',
    solutionQuery: "SELECT city , population from (SELECT CITY, POPULATION from city where country = 'SF'order by population desc)where ROWNUM <= 3",
    selectType: '5'
  },
  {
    id: '1126',
    schema: 'reisen',
    difficulty: 'schwer',
    text: 'Bestimmen Sie alle Hotels in Italien, für die keine Buchung vorliegt und geben Sie Name und Klasse dieser Hotels aus, sortiert nach Name',
    solutionQuery: "select hotelname, klasse from hotel, stadt where hotel.stadtname = stadt.stadtname and stadt.land = 'Italien' and (hotel.hotelname, hotel.stadtname) not in (select hotelname, stadtname from buchung) order by hotel.hotelname",
    selectType: '5'
  },
  {
    id: '1127',
    schema: 'welt',
    difficulty: 'leicht',
    text: 'Geben Sie alle Städte (Spalte city) aus, die in Finnland liegen!',
    solutionQuery: "SELECT city from city where country = 'SF'",
    selectType: '1'
  },
  {
    id: '1128',
    schema: 'welt',
    difficulty: 'mittel',
    text: 'Welche Seen liegen in Bayern (Spalte lake in der Tabelle lake)',
    solutionQuery: "SELECT lake.lake FROM lake, GEO_LAKEwhere country = 'D' and province = 'Bayern'and lake.lake = GEO_LAKE.lake",
    selectType: '<NULL>'
  },
  {
    id: '1133',
    schema: 'welt',
    difficulty: 'schwer',
    text: 'Bestimmen Sie alle Länder (Spalten Country, Name), in denen nur Sprachen gesprochen werden, die in der Schweiz nicht gesprochen werden! Unterdrücken Sie Duplicate!',
    solutionQuery: "SELECT DISTINCT l2.COUNTRY, C.NAME FROM Language l2, COUNTRY c WHERE L2.LANGUAGE NOT IN (SELECT Language FROM language WHERE country = 'CH') AND C.COUNTRY = L2.COUNTRYMINUSSELECT l2.COUNTRY, C.NAME FROM Language l1, Language l2, COUNTRY c WHERE L1.LANGUAGE = L2.LANGUAGE AND C.COUNTRY = L2.COUNTRY AND L1.COUNTRY = 'CH'",
    selectType: '11'
  },
  {
    id: '1136',
    schema: 'welt',
    difficulty: 'leicht',
    text: 'Welche Städte (City, longitude, latitude) liegen zwischen dem 40. und dem 50. Breitengrad (latitude)?',
    solutionQuery: 'SELECT CITY, longitude, latitude FROM CITY WHERE LATITUDE BETWEEN 40 and 50',
    selectType: '1'
  },
  {
    id: '1137',
    schema: 'welt',
    difficulty: 'leicht',
    text: 'Welche Hauptstädte sind zugleich Sitz von Organisationen?',
    solutionQuery: 'SELECT capital from COUNTRYintersect SELECT CITY FROM organization',
    selectType: '11'
  },
  {
    id: '1138',
    schema: 'welt',
    difficulty: 'mittel',
    text: 'Welche Länder (Spalten: Country, namen) liegen in Europa und in Asien?',
    solutionQuery: "SELECT COUNTRY, name FROM COUNTRY NATURAL JOIN encompasses WHERE continent = 'Asia'INTERSECTSELECT COUNTRY, name FROM COUNTRY NATURAL JOIN encompasses WHERE continent = 'Europe'",
    selectType: '11'
  },
  {
    id: '1140',
    schema: 'welt',
    difficulty: 'leicht',
    text: 'Welche Länder (Spalte COUNTRY in Tabelle ismember und Tabelle COUNTRY) sind in keiner Organisation?',
    solutionQuery: 'SELECT country FROM COUNTRY MINUS SELECT COUNTRY from ISMEMBERGROUP BY COUNTRY',
    selectType: '11'
  },
  {
    id: '1143',
    schema: 'fahrrad',
    difficulty: 'leicht',
    text: 'Welche Teile haben eine Bezeichnung, die mit dem Buchstaben G anfängt? Geben Sie die Bezeichnung aus!',
    solutionQuery: "SELECT Bezeichnung FROM Teile WHERE BEZEICHNUNG LIKE 'G%'",
    selectType: '13'
  },
  {
    id: '1145',
    schema: 'fussball',
    difficulty: 'leicht',
    text: 'Wie heißt der Trainer (Ausgabe: Trainername) der australischen Mannschaft?',
    solutionQuery: "SELECT nation.TRAINERNAME FROM Nation WHERE nation.NATIONNAME = 'Australien'",
    selectType: '1'
  }
]

export default tasks
