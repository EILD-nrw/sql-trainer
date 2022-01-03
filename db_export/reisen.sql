--------------------------------------------------------
--  DDL for Table BUCHUNG
--------------------------------------------------------

  CREATE TABLE "BUCHUNG" 
   (	"BUCHUNGSNR" NUMBER, 
	"KUNDENNR" NUMBER, 
	"HOTELNAME" VARCHAR2(20), 
	"STADTNAME" VARCHAR2(20), 
	"ZEIT" NUMBER, 
	"ANREISEDATUM" DATE, 
	"ABREISEDATUM" DATE, 
	"GEBUCHTEEZ" NUMBER, 
	"GEBUCHTEDZ" NUMBER
   ) ;
--------------------------------------------------------
--  DDL for Table HOTEL
--------------------------------------------------------

  CREATE TABLE "HOTEL" 
   (	"HOTELNAME" VARCHAR2(20), 
	"STADTNAME" VARCHAR2(20), 
	"KLASSE" NUMBER, 
	"ADRESSE" VARCHAR2(20), 
	"ANZAHLEZ" NUMBER, 
	"ANZAHLDZ" NUMBER, 
	"PREISEZ" NUMBER, 
	"PREISDZ" NUMBER
   ) ;
--------------------------------------------------------
--  DDL for Table KUNDE
--------------------------------------------------------

  CREATE TABLE "KUNDE" 
   (	"KUNDENNR" NUMBER, 
	"VORNAME" VARCHAR2(20), 
	"ADRESSE" VARCHAR2(40), 
	"NAME" VARCHAR2(20)
   ) ;
--------------------------------------------------------
--  DDL for Table REISEZEIT
--------------------------------------------------------

  CREATE TABLE "REISEZEIT" 
   (	"ZEIT" NUMBER, 
	"RZEIT" NUMBER, 
	"FLUGHAFEN1" VARCHAR2(40), 
	"FLUGHAFEN2" VARCHAR2(40)
   ) ;
--------------------------------------------------------
--  DDL for Table STADT
--------------------------------------------------------

  CREATE TABLE "STADT" 
   (	"STADTNAME" VARCHAR2(20), 
	"LAND" VARCHAR2(20), 
	"FLUGHAFEN" VARCHAR2(40)
   ) ;

Insert into BUCHUNG (BUCHUNGSNR,KUNDENNR,HOTELNAME,STADTNAME,ZEIT,ANREISEDATUM,ABREISEDATUM,GEBUCHTEEZ,GEBUCHTEDZ) values ('1','1','Holiday inn Maingate','Kissimmee','1','12.08.01','19.08.01','50','50');
Insert into BUCHUNG (BUCHUNGSNR,KUNDENNR,HOTELNAME,STADTNAME,ZEIT,ANREISEDATUM,ABREISEDATUM,GEBUCHTEEZ,GEBUCHTEDZ) values ('2','1','Monte del Moro','Playa del Ingles','2','01.07.00','08.07.00','1','2');
Insert into BUCHUNG (BUCHUNGSNR,KUNDENNR,HOTELNAME,STADTNAME,ZEIT,ANREISEDATUM,ABREISEDATUM,GEBUCHTEEZ,GEBUCHTEDZ) values ('3','2','Rocchetta','Briatico VV','8','07.07.00','14.07.00','5','3');
Insert into BUCHUNG (BUCHUNGSNR,KUNDENNR,HOTELNAME,STADTNAME,ZEIT,ANREISEDATUM,ABREISEDATUM,GEBUCHTEEZ,GEBUCHTEDZ) values ('4','7','Queens Hotel Köln','Köln','9','31.12.00','02.01.00','60','42');
Insert into BUCHUNG (BUCHUNGSNR,KUNDENNR,HOTELNAME,STADTNAME,ZEIT,ANREISEDATUM,ABREISEDATUM,GEBUCHTEEZ,GEBUCHTEDZ) values ('5','8','Metropol','Köln','10','20.05.99','25.05.99','0','2');
Insert into BUCHUNG (BUCHUNGSNR,KUNDENNR,HOTELNAME,STADTNAME,ZEIT,ANREISEDATUM,ABREISEDATUM,GEBUCHTEEZ,GEBUCHTEDZ) values ('6','8','Metropol','Köln','10','06.12.00','07.12.00','3','0');
Insert into BUCHUNG (BUCHUNGSNR,KUNDENNR,HOTELNAME,STADTNAME,ZEIT,ANREISEDATUM,ABREISEDATUM,GEBUCHTEEZ,GEBUCHTEDZ) values ('7','9','Queens Hotel Köln','Köln','11','31.07.01','06.08.01','7','40');
Insert into BUCHUNG (BUCHUNGSNR,KUNDENNR,HOTELNAME,STADTNAME,ZEIT,ANREISEDATUM,ABREISEDATUM,GEBUCHTEEZ,GEBUCHTEDZ) values ('9','5','Columbus','Rom','6','05.08.01','19.08.01','0','1');

Insert into HOTEL (HOTELNAME,STADTNAME,KLASSE,ADRESSE,ANZAHLEZ,ANZAHLDZ,PREISEZ,PREISDZ) values ('Holiday inn Maingate','Kissimmee','5',null,'370','430','329','579');
Insert into HOTEL (HOTELNAME,STADTNAME,KLASSE,ADRESSE,ANZAHLEZ,ANZAHLDZ,PREISEZ,PREISDZ) values ('Monte del Moro','Playa del Ingles','2',null,'250','300','149','299');
Insert into HOTEL (HOTELNAME,STADTNAME,KLASSE,ADRESSE,ANZAHLEZ,ANZAHLDZ,PREISEZ,PREISDZ) values ('Schloß Kropstädt','Berlin','1',null,'30','35','80','120');
Insert into HOTEL (HOTELNAME,STADTNAME,KLASSE,ADRESSE,ANZAHLEZ,ANZAHLDZ,PREISEZ,PREISDZ) values ('Landhotel Burg','Berlin','3',null,'15','23','115','155');
Insert into HOTEL (HOTELNAME,STADTNAME,KLASSE,ADRESSE,ANZAHLEZ,ANZAHLDZ,PREISEZ,PREISDZ) values ('Genova','Rom','3',null,'40','48','288','442');
Insert into HOTEL (HOTELNAME,STADTNAME,KLASSE,ADRESSE,ANZAHLEZ,ANZAHLDZ,PREISEZ,PREISDZ) values ('Columbus','Rom','5',null,'55','50','330','589');
Insert into HOTEL (HOTELNAME,STADTNAME,KLASSE,ADRESSE,ANZAHLEZ,ANZAHLDZ,PREISEZ,PREISDZ) values ('Tiziano','Rom','3',null,'20','25','299','569');
Insert into HOTEL (HOTELNAME,STADTNAME,KLASSE,ADRESSE,ANZAHLEZ,ANZAHLDZ,PREISEZ,PREISDZ) values ('Rocchetta','Briatico VV','3',null,'38','50','200','399');
Insert into HOTEL (HOTELNAME,STADTNAME,KLASSE,ADRESSE,ANZAHLEZ,ANZAHLDZ,PREISEZ,PREISDZ) values ('Chomel','Paris','3',null,'11','12','349','599');
Insert into HOTEL (HOTELNAME,STADTNAME,KLASSE,ADRESSE,ANZAHLEZ,ANZAHLDZ,PREISEZ,PREISDZ) values ('Prince','Paris','2',null,'12','18','179','319');
Insert into HOTEL (HOTELNAME,STADTNAME,KLASSE,ADRESSE,ANZAHLEZ,ANZAHLDZ,PREISEZ,PREISDZ) values ('le Pavillon','Paris','2',null,'8','11','155','299');
Insert into HOTEL (HOTELNAME,STADTNAME,KLASSE,ADRESSE,ANZAHLEZ,ANZAHLDZ,PREISEZ,PREISDZ) values ('Mado','Köln','4',null,'14','20','168','178');
Insert into HOTEL (HOTELNAME,STADTNAME,KLASSE,ADRESSE,ANZAHLEZ,ANZAHLDZ,PREISEZ,PREISDZ) values ('Metropol','Köln','1',null,'7','10','99','109');
Insert into HOTEL (HOTELNAME,STADTNAME,KLASSE,ADRESSE,ANZAHLEZ,ANZAHLDZ,PREISEZ,PREISDZ) values ('Queens Hotel Köln','Köln','4',null,'140','180','225','285');
Insert into HOTEL (HOTELNAME,STADTNAME,KLASSE,ADRESSE,ANZAHLEZ,ANZAHLDZ,PREISEZ,PREISDZ) values ('Maxim','Ufa','1',null,'15','20','40','59');
Insert into HOTEL (HOTELNAME,STADTNAME,KLASSE,ADRESSE,ANZAHLEZ,ANZAHLDZ,PREISEZ,PREISDZ) values ('Tortilla Sunrise','Barcelona','4',null,'75','60','399','555');
Insert into HOTEL (HOTELNAME,STADTNAME,KLASSE,ADRESSE,ANZAHLEZ,ANZAHLDZ,PREISEZ,PREISDZ) values ('Los Nachos','Acapulco','2',null,'36','40','165','245');

Insert into KUNDE (KUNDENNR,VORNAME,ADRESSE,NAME) values ('1','Stephan','Am Sandberg 7, 51643 Gummersbach','Bernd');
Insert into KUNDE (KUNDENNR,VORNAME,ADRESSE,NAME) values ('2','Carsten','Bahnhofstr. 57, 51069 Köln','Zimmermann');
Insert into KUNDE (KUNDENNR,VORNAME,ADRESSE,NAME) values ('3','Angelika','Lilienweg 107, 51427 Bergisch Gladbach','Baur');
Insert into KUNDE (KUNDENNR,VORNAME,ADRESSE,NAME) values ('4','Beate','Friedrich-Ebert-Str. 6, 51377 Leverkusen','Frey');
Insert into KUNDE (KUNDENNR,VORNAME,ADRESSE,NAME) values ('5','Daniel','Auf der Taschen 18, 51545 Waldbröl','Maier');
Insert into KUNDE (KUNDENNR,VORNAME,ADRESSE,NAME) values ('6','Peter','Taubenweg 19, 51792 Bergneustadt','Göttel');
Insert into KUNDE (KUNDENNR,VORNAME,ADRESSE,NAME) values ('7','Edith','Hauptstr. 2, 22297 Hamburg','Falten');
Insert into KUNDE (KUNDENNR,VORNAME,ADRESSE,NAME) values ('8','Arthur','Otto-Hahn-Str.54, 85649 München ','Steiner');
Insert into KUNDE (KUNDENNR,VORNAME,ADRESSE,NAME) values ('9','Andreas','Hauptstr. 97, 60439 Frankfurt','Hartleb');

Insert into REISEZEIT (ZEIT,RZEIT,FLUGHAFEN1,FLUGHAFEN2) values ('1','15','Düsseldorf Flughafen','Orlando Airport');
Insert into REISEZEIT (ZEIT,RZEIT,FLUGHAFEN1,FLUGHAFEN2) values ('2','4','Hannover Flughafen','Gran Canaria Airport');
Insert into REISEZEIT (ZEIT,RZEIT,FLUGHAFEN1,FLUGHAFEN2) values ('3','17','Berlin-Schönefeld Flughafen','Acapulco Airport');
Insert into REISEZEIT (ZEIT,RZEIT,FLUGHAFEN1,FLUGHAFEN2) values ('4','3','Düsseldorf Flughafen','Flughafen Paris Charles de Gaulle');
Insert into REISEZEIT (ZEIT,RZEIT,FLUGHAFEN1,FLUGHAFEN2) values ('5','7','Köln-Bonn Flughafen','Ufa Aeroport');
Insert into REISEZEIT (ZEIT,RZEIT,FLUGHAFEN1,FLUGHAFEN2) values ('6','4','Köln-Bonn Flughafen','Aeroporti di Roma');
Insert into REISEZEIT (ZEIT,RZEIT,FLUGHAFEN1,FLUGHAFEN2) values ('7','5','Düsseldorf Flughafen','Aeroporti di Roma');
Insert into REISEZEIT (ZEIT,RZEIT,FLUGHAFEN1,FLUGHAFEN2) values ('8','6','Hannover Flughafen','Lamezia Terme Airport');
Insert into REISEZEIT (ZEIT,RZEIT,FLUGHAFEN1,FLUGHAFEN2) values ('9','3','Hamburg Flughafen','Köln-Bonn Flughafen');
Insert into REISEZEIT (ZEIT,RZEIT,FLUGHAFEN1,FLUGHAFEN2) values ('10','4','München Flughafen','Köln-Bonn Flughafen');
Insert into REISEZEIT (ZEIT,RZEIT,FLUGHAFEN1,FLUGHAFEN2) values ('11','2','Frankfurt Flughafen','Köln-Bonn Flughafen');

Insert into STADT (STADTNAME,LAND,FLUGHAFEN) values ('Kissimmee','USA','Orlando Airport');
Insert into STADT (STADTNAME,LAND,FLUGHAFEN) values ('Düsseldorf','Deutschland','Düsseldorf Flughafen');
Insert into STADT (STADTNAME,LAND,FLUGHAFEN) values ('Playa del Ingles','Spanien','Gran Canaria Airport');
Insert into STADT (STADTNAME,LAND,FLUGHAFEN) values ('Hannover','Deutschland','Hannover Flughafen');
Insert into STADT (STADTNAME,LAND,FLUGHAFEN) values ('Berlin','Deutschland','Berlin-Schönefeld Flughafen');
Insert into STADT (STADTNAME,LAND,FLUGHAFEN) values ('Rom','Italien','Aeroporti di Roma');
Insert into STADT (STADTNAME,LAND,FLUGHAFEN) values ('Briatico VV','Italien','Lamezia Terme Airport');
Insert into STADT (STADTNAME,LAND,FLUGHAFEN) values ('Paris','Frankreich','Flughafen Paris Charles de Gaulle');
Insert into STADT (STADTNAME,LAND,FLUGHAFEN) values ('Köln','Deutschland','Köln-Bonn Flughafen');
Insert into STADT (STADTNAME,LAND,FLUGHAFEN) values ('Ufa','Rußland','Aeroport Ufa');
Insert into STADT (STADTNAME,LAND,FLUGHAFEN) values ('Barcelona','Spanien','Barcelona Airport');
Insert into STADT (STADTNAME,LAND,FLUGHAFEN) values ('Acapulco','Mexico','Acapulco Airport');
Insert into STADT (STADTNAME,LAND,FLUGHAFEN) values ('Hamburg','Deutschland','Hamburg Flughafen');
Insert into STADT (STADTNAME,LAND,FLUGHAFEN) values ('München','Deutschland','München Flughafen');
Insert into STADT (STADTNAME,LAND,FLUGHAFEN) values ('Frankfurt','Deutschland','Frankfurt Flughafen');