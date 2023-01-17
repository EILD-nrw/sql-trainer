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
      'In der Tabelle "Artikel" soll die Spalte "artikel_typ" umbenannt werden und soll nun "fahrrad_typ" heißen. Geben Sie hierzu den entsprechenden Befehl ein!',
    solutionQuery: 'ALTER TABLE Artikel RENAME COLUMN artikel_typ TO fahrrad_typ;',
    taskType: 3,
  },
  {
    id: 5,
    schema: 'fahrrad',
    difficulty: 'leicht',
    text:
      'Schreiben Sie die Anweisung zum Erzeugen einer neuen Tabelle "Verkauf". Die Tabelle soll einen eindeutigen Primärschlüssel "verkauf_id", sowie die Attribute "kasse" und "fahrrad" besitzen.',
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
      'Zur leichteren Datenabfrage soll in der Tabelle "Artikel" ein View mit der Bezeichnung "Abfrage" auf den Attributen "artikel_typ" und "verkaufspreis" angelegt werden, wo der "verkaufspreis" >= 1650 ist. Schreiben Sie den entsprechenden Befehl!',
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
      'Es soll ein neuer eindeutiger Index mit der Bezeichnung "Kundennamen" auf der Tabelle "Kunden" angelegt werden, der die beiden Attribute "nachname" und "vorname" beeinhaltet!',
    solutionQuery: 'CREATE UNIQUE INDEX Kundennamen ON kunden (nachname, vorname);',
    taskType: 1,
  },
  {
    id: 14,
    schema: 'fahrrad',
    difficulty: 'mittel',
    text:
      'Es soll eine VIEW mit dem Namen "Gehalt_ABT" auf den Spalten "abteilungs_nr", "name", "avg_gehalt" erstellt werden, die das durchschnittliche Gehalt aller Angestellten der gleichen Abteilung zeigt. (Benötigt wird: Abt_nr, abteilungen.name, gehalt)',
    solutionQuery:
      'CREATE VIEW Gehalt_ABT (Abteilungs_NR, Name, AVG_Gehalt) AS SELECT a1.abt_nr, a2.name , avg(a1.gehalt) FROM angestellte a1, abteilungen a2  WHERE a1.abt_nr = a2.abt_nr  GROUP BY a1.abt_nr, a2.name;',
    taskType: 1,
  },
  {
    id: 16,
    schema: 'fahrrad',
    difficulty: 'schwer',
    text:
      'In der Tabelle "Werke" soll eine neue Spalte "adresse" hinzugefügt werden. Schreiben Sie den entsprechenden Befehl!',
    solutionQuery: 'ALTER TABLE Werke ADD Adresse VARCHAR2(20);',
    taskType: 3,
  },
  {
    id: 17,
    schema: 'fahrrad',
    difficulty: 'schwer',
    text:
      'In der Tabelle "Orte" soll die Spalte "strasse" in "strassennamen" umbennant werden. Schreiben Sie den entsprechenden Befehl!',
    solutionQuery: 'ALTER TABLE Orte RENAME COLUMN strasse TO Strassennamen;',
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
      'In der Tabelle "Beschraenkungen" soll die Spalte "text" umbennant in "ausnahmen" werden. Schreiben Sie den entsprechenden Befehl!',
    solutionQuery: 'ALTER TABLE Beschraenkungen RENAME COLUMN text TO Ausnahmen;',
    taskType: 3,
  },
  {
    id: 154,
    schema: 'busse',
    difficulty: 'leicht',
    text:
      'Schreiben Sie den Befehl zum Erzeugen einer neuen Tabelle "Busfahrerin", mit den Attributen "Vorname" und "Nachname".',
    solutionQuery:
      'CREATE TABLE Busfahrerin (vorname VARCHAR2(20), nachname VARCHAR2(20));',
    taskType: 1,
  },
  {
    id: 155,
    schema: 'busse',
    difficulty: 'leicht',
    text:
      'Erzeugen Sie eine neue Tabelle mit dem Namen "Bus_Sitzplaetze" und fügen Sie nur das Attribut "sitz_id" als Primärschlüssel hinzu, welcher nicht Null sein soll.',
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
      'Schreiben Sie den Befehl zum Erstellen einer View mit dem Namen "v_mitarbeiter" auf den Attributen "vorname" und "nachname" auf der Tabelle "Mitarbeiter", wo die Lohnsteuerklasse = 1 ist.',
    solutionQuery:
      'CREATE VIEW v_mitarbeiter AS SELECT vorname, nachname FROM Mitarbeiter WHERE lohnst_klasse = 1;',
    taskType: 1,
  },
  {
    id: 157,
    schema: 'busse',
    difficulty: 'mittel',
    text:
      'In der Tabelle "Busfahrer" soll die Spalte "gehaltsstufe" hinzugefügt werden.',
    solutionQuery: 'ALTER TABLE BUSFAHRER ADD gehaltsstufe INTEGER;',
    taskType: 3,
  },
  {
    id: 163,
    schema: 'busse',
    difficulty: 'mittel',
    text:
      'Schreiben Sie den Befehl zum Erstellen einer View mit dem Namen "v_inspektion" auf den Attributen "am" und "fahrzeug_id" auf der Tabelle "Inspektionen", wo die Firma = VeServ ist.',
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
      'Benennen Sie die Spalte "richtung" in der Tabelle "Fahrten" in "zielstation" um.',
    solutionQuery: 'ALTER TABLE Fahrten RENAME COLUMN richtung TO zielstation;',
    taskType: 3,
  },
  {
    id: 162,
    schema: 'busse',
    difficulty: 'schwer',
    text:
      'Fügen Sie in der Tabelle "Mitarbeiter" die Spalte "ausbildung" hinzu!',
    solutionQuery: 'ALTER TABLE Mitarbeiter ADD ausbildung VARCHAR2(20);',
    taskType: 3,
  },
  {
    id: 170,
    schema: 'busse',
    difficulty: 'schwer',
    text:
      'Erstellen Sie eine View mit dem Namen "busse_angemeldet", die alle Busse (fahrzeug_id) anzeigt, die im September 2009 angemeldet wurden.',
    solutionQuery:
      "CREATE VIEW busse_angemeldet AS SELECT fahrzeug_id FROM busse WHERE angemeldet_am LIKE '%09.09'",
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
      'Die Tabelle Einsatzplan wurde versehentlich gelöscht. Erstellen Sie diese erneut mit dem Namen "einsatzplan2" und den Spalten "einplan_id", "fahrt_id", "fahrzeug_id", "mita_id" und "tag".\n    Der Primärschlüssel liegt auf "einplan_id" und außer "tag" welcher im DATE-Format sein soll, sind alle 9-stelligen Zahlen ohne Kommastellen.\n    Es soll überprüft werden ob die "fahrt_id" größer als 0 ist und eine "fahrzeug_id" muss auch immer eingegeben werden.',
    solutionQuery:
      'CREATE TABLE EINSATZPLAN2 (\n      "EINPLAN_ID" NUMBER(9,0) PRIMARY KEY,\n      "TAG" DATE,\n     "FAHRT_ID" NUMBER(9,0) CONSTRAINT "POS_ID41" CHECK ("FAHRT_ID">= 0),\n     "FAHRZEUG_ID" NUMBER(9,0) NOT NULL,\n     "MITA_ID" NUMBER(9,0)\n     ) ;',
    taskType: 1,
  },
]
