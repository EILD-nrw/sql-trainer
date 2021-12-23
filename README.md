![EILD-Logo](src/img/eild_header_logo.png)

# SQL/Trainer

Dieser SQL-Trainer ist eine Lernanwendung für verschiedene SQL-Statements in Datenbanken. Die Anwendung wurde ursprünglich von der [Technischen Hochschule Köln](https://www.th-koeln.de/) im Rahmen der Online-Lernplattform [EDB](https://edb2.gm.th-koeln.de/index) entwickelt und wurde nun als Teil des EILD.nrw Projektes weiterentwickelt und als Open-Source Anwendung veröffentlicht.

In EILD wird ein Ansatz mit weitgehender Adaptierbarkeit und Wiederverwendbarkeit der Lehrinhalte umgesetzt.

## Further information
- [EILD.nrw Informationen](https://medien.hs-duesseldorf.de/personen/rakow/Seiten/09062020_EILD.aspx?RootFolder=%2Fpersonen%2Frakow%2FPublishingImages%2FMeldungen&FolderCTID=0x0120004A9137CD4CD45345B9F581109987E838&View=%7BC6A3F1CE-FF3B-4025-A149-D6A910C2E30B%7D#:~:text=NRW%20zur%20Erstellung%20von%20offenen,schafft%20sich%20ihre%20Werkzeuge%20selbst.)
- [EILD.nrw GitHub](https://github.com/EILD-nrw)

## Verwendung

Es gibt verschiedene Möglichkeiten den Trainer zu benutzen. Am einfachsten ist die Verwendung der [auf GitHub bereitgestellten Version](https://eild-nrw.github.io/sql-trainer/#/). Diese wird bei Änderungen regelmäßig Aktualisiert und muss nicht selbst betrieben werden.

Alternativ lässt sich diese Version aus dem `gh-pages`-Branch als .zip-Datei herunterladen und anschließend auf Ilias, Moodle oder ähnliche Plattformen hochladen. Dort muss diese lediglich entpackt werden. Ilias erkennt die `index.html` automatisch als Startpunkt der Anwendung, auf anderen Plattformen muss dies eventuell noch manuell passieren.

Als letzte Alternative kann die Anwendung auch aus dem Sourcecode generiert werden. Das entsprechende Build-Skript aus der Package.json lässt sich mit `npm run build` ausführen. Der generierte Ordner ist dann identisch zu dem, der auch im `gh-pages`-Branch liegt.

## Lizenz
[![CC BY-SA 4.0][cc-by-sa-shield]][cc-by-sa]

This work is licensed under a
[Creative Commons Attribution-ShareAlike 4.0 International License][cc-by-sa].

[![CC BY-SA 4.0][cc-by-sa-image]][cc-by-sa]

[cc-by-sa]: http://creativecommons.org/licenses/by-sa/4.0/
[cc-by-sa-image]: https://licensebuttons.net/l/by-sa/4.0/88x31.png
[cc-by-sa-shield]: https://img.shields.io/badge/License-CC%20BY--SA%204.0-lightgrey.svg
