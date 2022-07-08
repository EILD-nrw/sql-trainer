import { Task } from '../Types/Task'

export const ddlTasks: Task[] = [
  {
    id: 1,
    schema: 'fahrrad',
    difficulty: 'leicht',
    text:
      'Schreiben Sie den Befehl zum löschen eines Index mit der Bezeichnung "indexdelete" auf der Tabelle "Lieferanten"!',
    solutionQuery: 'DROP INDEX indexdelete ON Lieferanten;',
    taskType: 2,
  },
  {
    id: 2,
    schema: 'fahrrad',
    difficulty: 'leicht',
    text:
      'Schreiben Sie den Befehl zum erzeugen einer neuen Tabelle mit dem Namen "Fahrradwerkstatt". Es sollen die Attribute "werkstatt_nr", welcher nicht Null sein darf sowie "werkstattname" hinzugefügt werden.',
    solutionQuery:
      'CREATE TABLE Fahrradwerkstatt ( werkstatt_nr INTEGER NOT NULL, werkstattname VARCHAR2(20));',
    taskType: 1,
  },
  {
    id: 3,
    schema: 'fahrrad',
    difficulty: 'leicht',
    text:
      'Löschen Sie die Tabelle mit dem Namen "Fahrradwerkstatt" sowie die dazugehörigen Constraints.',
    solutionQuery: 'DROP TABLE Fahrradwerkstatt CASCADE CONSTRAINTS;',
    taskType: 2,
  },
  {
    id: 4,
    schema: 'fahrrad',
    difficulty: 'leicht',
    text:
      'In der Tabelle "Artikel" soll die Spalte artikel_typ umbenannt werden und soll nun Fahrrad_typ heißen. Geben Sie hierzu den entsprechenden Befehl ein!',
    solutionQuery: 'ALTER TABLE Artikel RENAME COLUMN artikel_typ TO Fahrrad_typ;',
    taskType: 3,
  },
  {
    id: 5,
    schema: 'fahrrad',
    difficulty: 'leicht',
    text:
      'Schreiben Sie die Anweisung zum Erzeugen einer neuen Tabelle "Verkauf". Die Tabelle soll einen eindeutigen Primärschlüssel "Verkauf_id" besitzen sowie die Attribute Kasse und Fahrrad.',
    solutionQuery:
      'CREATE TABLE Verkauf (Verkauf_id INTEGER NOT NULL, Kasse VARCHAR2(20), Fahrrad VARCHAR2(20));',
    taskType: 1,
  },
  {
    id: 6,
    schema: 'fahrrad',
    difficulty: 'leicht',
    text:
      "Die VIEW 'Abteilungen_View' wird nicht mehr benötigt. Löschen Sie diese.",
    solutionQuery: 'DROP VIEW Abteilungen_View;',
    taskType: 2,
  },
  {
    id: 7,
    schema: 'fahrrad',
    difficulty: 'leicht',
    text:
      "Die Tabelle 'Artikel' wird nicht mehr benötigt. Löschen Sie diese.",
    solutionQuery: 'DROP TABLE Artikel CASCADE CONSTRAINTS',
    taskType: 2,
  },
  {
    id: 8,
    schema: 'fahrrad',
    difficulty: 'leicht',
    text:
      'Der Index "PK_Teile_Fahrrad" wird nicht mehr benötigt. Löschen Sie diesen',
    solutionQuery: 'DROP INDEX PK_Teile_Fahrrad',
    taskType: 2,
  },

  {
    id: 11,
    schema: 'fahrrad',
    difficulty: 'mittel',
    text:
      'Zur schnelleren Datenabfrage soll in der Tabelle "Artikel" ein View mit der Bezeichnung "Abfrage" auf den Attributen "artikel_typ" und "verkaufspreis" angelegt werden, wo der "verkaufspreis" >= 1650 ist. Schreiben Sie den entsprechenden Befehl!',
    solutionQuery:
      'CREATE VIEW Abfrage (Artikeltyp, verkaufspreis) AS SELECT artikel_typ, verkaufspreis FROM Artikel WHERE verkaufspreis >= 1650;',
    taskType: 1,
  },
  {
    id: 12,
    schema: 'fahrrad',
    difficulty: 'mittel',
    text:
      'Es soll ein Index mit der Bezeichnung "new_index" auf dem Atribut "rechnungsdatum" in der Tabelle "Auftraege" angelegt werden. Schreiben Sie den Befehl!',
    solutionQuery: 'CREATE INDEX new_index ON Auftraege (rechnungsdatum);',
    taskType: 1,
  },
  {
    id: 13,
    schema: 'fahrrad',
    difficulty: 'mittel',
    text:
      'Es soll ein neuer eindeutiger Index mit der Bezeichnung "Kundennamen" auf der Tabelle "kunden" angelegt werden, der die beiden Attribute "nachname" und "vorname" beeinhaltet!',
    solutionQuery: 'CREATE UNIQUE INDEX Kundennamen ON kunden (nachname, vorname);',
    taskType: 1,
  },
  {
    id: 14,
    schema: 'fahrrad',
    difficulty: 'mittel',
    text:
      'Es soll eine VIEW mit dem Namen "Gehalt_ABT" auf den Spalten "Abteilungs_NR, Name, AVG_Gehalt" erstellt werden, die das durchschnittliche Gehalt aller Angestellten der gleichen Abteilung zeigt. (Benötigt wird: Abt_nr, abteilungen.name, gehalt)',
    solutionQuery:
      'CREATE VIEW Gehalt_ABT (Abteilungs_NR, Name, AVG_Gehalt) AS SELECT a1.abt_nr, a2.name , avg(a1.gehalt) FROM angestellte a1, abteilungen a2  WHERE a1.abt_nr = a2.abt_nr  GROUP BY a1.abt_nr, a2.name;',
    taskType: 1,
  },
  {
    id: 16,
    schema: 'fahrrad',
    difficulty: 'schwer',
    text:
      'In der Tabelle "Werke" soll eine neue Spalte "Adresse" hinzugefügt werden. Schreiben Sie den entsprechenden Befehl!',
    solutionQuery: 'ALTER TABLE Werke ADD Adresse VARCHAR2(20);',
    taskType: 3,
  },
  {
    id: 17,
    schema: 'fahrrad',
    difficulty: 'schwer',
    text:
      'In der Tabelle "Orte" soll die Spalte "strasse" in "Straßennamen" umbennant werden. Schreiben Sie den entsprechenden Befehl!',
    solutionQuery: 'ALTER TABLE Orte RENAME COLUMN strasse TO Straßennamen;',
    taskType: 3,
  },
  {
    id: 18,
    schema: 'fahrrad',
    difficulty: 'schwer',
    text:
      'In der Tabelle "Orte" soll die Spalte "plz" gelöscht werden. Schreiben Sie den Befehl zum löschen der Spalte!',
    solutionQuery: 'ALTER TABLE Orte DROP plz;',
    taskType: 3,
  },
  {
    id: 19,
    schema: 'fahrrad',
    difficulty: 'mittel',
    text:
      'Zur schnelleren Datenabfrage soll in der Tabelle "Artikel" ein View mit der Bezeichnung "Abfrage" auf den Attributen "artikel_typ" und "verkaufspreis" angelegt werden, wo der "verkaufspreis" >= 1650 ist. Schreiben Sie den entsprechenden Befehl!',
    solutionQuery:
      'CREATE VIEW Abfrage (Artikeltyp, verkaufspreis) AS SELECT artikel_typ, verkaufspreis FROM Artikel WHERE verkaufspreis >= 1650;',
    taskType: 1,
  },
  {
    id: 20,
    schema: 'fahrrad',
    difficulty: 'mittel',
    text:
      'Ändern Sie den Namen der Tabelle "Werke" zu "Produktionsstaette".',
    solutionQuery: 'ALTER TABLE werke RENAME TO Produktionsstaette;',
    taskType: 4,
  },
  {
    id: 21,
    schema: 'fahrrad',
    difficulty: 'mittel',
    text:
      'Ändern Sie den Namen der Tabelle "Fahrradwerkstatt" zu "Werkstatt".',
    solutionQuery: 'ALTER TABLE Fahrradwerkstatt RENAME TO Werkstatt;',
    taskType: 4,
  },
  {
    id: 152,
    schema: 'busse',
    difficulty: 'leicht',
    text:
      'Aufgrund einer Änderung wird die Tabelle "Fahrten" nicht mehr benötigt. Lösche die Tabelle vollständig!',
    solutionQuery: 'DROP TABLE Fahrten;',
    taskType: 2,
  },
  {
    id: 153,
    schema: 'busse',
    difficulty: 'leicht',
    text:
      'In der Tabelle "Beschraenkungen" soll die Spalte "text" umbennant werden in "Ausnahmen". Schreiben Sie den entsprechenden Befehl!',
    solutionQuery: 'ALTER TABLE Beschraenkungen RENAME COLUMN text TO Ausnahmen;',
    taskType: 3,
  },
  {
    id: 154,
    schema: 'busse',
    difficulty: 'leicht',
    text:
      'Schreiben Sie den Befehl zum Erzeugen einer neuen Tabelle mit dem Namen "Busfahrerin", mit den Attributen "vorname" und nachname.',
    solutionQuery:
      'CREATE TABLE Busfahrerin (vorname VARCHAR2(20), nachname VARCHAR2(20));',
    taskType: 1,
  },
  {
    id: 155,
    schema: 'busse',
    difficulty: 'leicht',
    text:
      'Erzeugen Sie eine neue Tabelle mit dem Namen "Bus_Sitzplaetze" und fügen Sie nur das Attribut "Sitz_id" als Primärschlüssel hinzu, welcher nicht Null sein soll.',
    solutionQuery:
      'CREATE TABLE Bus_Sitzplaetze (Sitz_id INTEGER NOT NULL PRIMARY KEY);',
    taskType: 1,
  },
  {
    id: 164,
    schema: 'busse',
    difficulty: 'leicht',
    text:
      'Löschen Sie den Index "Fahrt", da dieser nicht mehr benötigt wird.',
    solutionQuery: 'DROP INDEX Fahrt',
    taskType: 2,
  },
  {
    id: 156,
    schema: 'busse',
    difficulty: 'mittel',
    text:
      'Schreiben Sie den Befehl zum Erstellen einer View mit dem Namen "Mitarbeiter" auf den Attributen "vorname" und "nachname" auf der Tabelle "Mitarebiter", wo die Lohnsteuerklasse = 1 ist.',
    solutionQuery:
      'CREATE VIEW Mitarbeiter AS SELECT vorname, nachname FROM Mitarbeiter WHERE lohnst_klasse = 1;',
    taskType: 1,
  },
  {
    id: 157,
    schema: 'busse',
    difficulty: 'mittel',
    text:
      'In der Tabelle "Busfahrer" soll die Spalte "Gehaltsstuffe" hinzugefügt werden und ausschließlich NULL- INTEGER Werte enthalten.',
    solutionQuery: 'ALTER TABLE BUSFAHRER ADD (Gehaltsstuffe INTEGER);',
    taskType: 3,
  },
  {
    id: 163,
    schema: 'busse',
    difficulty: 'mittel',
    text:
      'Schreiben Sie den Befehl zum Erstellen einer View mit dem Namen "Inspektion" auf den Attributen "am" und "fahrzeug_id" auf der Tabelle "Inspektionen", wo die Firma = VeServ ist.',
    solutionQuery:
      "CREATE VIEW Inspektion AS SELECT am, fahrzeug_id FROM Inspektionen WHERE firma = 'VeServ';",
    taskType: 1,
  },
  {
    id: 165,
    schema: 'busse',
    difficulty: 'mittel',
    text:
      'Erstellen Sie einen Index mit dem Namen "Fahrt" auf dem Attribut "fahrt_id" in der Tabelle "Einsatzplan".',
    solutionQuery: 'CREATE INDEX Fahrt ON Einsatzplan (fahrt_id)',
    taskType: 1,
  },
  {
    id: 166,
    schema: 'busse',
    difficulty: 'leicht',
    text: 'Löschen Sie die View "v_inspektion"!',
    solutionQuery: 'DROP VIEW v_inspektion',
    taskType: 2,
  },
  {
    id: 158,
    schema: 'busse',
    difficulty: 'schwer',
    text:
      'Löschen Sie die Spalte "bemerkungen" in der Tabelle "Beschraenkungen"',
    solutionQuery: 'ALTER TABLE Beschraenkungen DROP bemerkungen;',
    taskType: 3,
  },
  {
    id: 159,
    schema: 'busse',
    difficulty: 'schwer',
    text:
      'Benennen Sie die Spalte "richtung" in der Tabelle "Fahrten" in "Zielstation" um.',
    solutionQuery: 'ALTER TABLE Fahrten RENAME COLUMN richtung TO Zielstation;',
    taskType: 3,
  },
  {
    id: 162,
    schema: 'busse',
    difficulty: 'schwer',
    text:
      'Fügen Sie in der Tabelle "Techniker" die Spalte "Ausbildung" hinzu!',
    solutionQuery: 'ALTER TABLE Techniker ADD Ausbildung VARCHAR2(20);',
    taskType: 3,
  },
  {
    id: 170,
    schema: 'busse',
    difficulty: 'schwer',
    text:
      'Erstellen Sie eine View mit dem Namen "busse_angemeldet", die alle Busse (fahrzeug_id) anzeigt, die im September 2009 angemeldet wurden.',
    solutionQuery:
      "CREATE VIEW busse_angemeldet AS SELECT fahrzeug_id FROM busse WHERE angemeldet_am >= TO_DATE('01.09.09', 'DD.MM.YY') AND angemeldet_am <= TO_DATE('30.09.09', 'DD.MM.YY')",
    taskType: 1,
  },
  {
    id: 176,
    schema: 'busse',
    difficulty: 'mittel',
    text:
      'Ändern Sie den Namen der Tabelle "Fuehrerscheinklassen" zu "Fuehrerschein".',
    solutionQuery: 'ALTER TABLE Fuehrerscheinklassen RENAME TO Fuehrerschein;',
    taskType: 4,
  },
  {
    id: 174,
    schema: 'busse',
    difficulty: 'schwer',
    text:
      'Die Tabelle Einsatzplan wurde versehentlich gelöscht. Erstellen Sie diese erneut mit "EINPLAN_ID", "FAHRT_ID", "FAHRZEUG_ID", "MITA_ID" und "TAG".\n    Der Primärschlüssel liegt auf "EINPLAN_ID" und außer "TAG" welcher im DATE-Format sein soll sind alle 9-stellige Zahlen ohne Kommastellen.\n    Es soll überprüft werden ob die "FAHRT_ID" größer als 0 ist und eine "FAHRZEUG_ID" muss auch immer eingegeben werden.',
    solutionQuery:
      'CREATE TABLE EINSATZPLAN (\n      "EINPLAN_ID" NUMBER(9,0) PRIMARY KEY,\n      "TAG" DATE,\n     "FAHRT_ID" NUMBER(9,0) CONSTRAINT "POS_ID41" CHECK ("FAHRT_ID">= 0),\n     "FAHRZEUG_ID" NUMBER(9,0) NOT NULL,\n     "MITA_ID" NUMBER(9,0)\n     ) ;',
    taskType: 1,
  },
]
