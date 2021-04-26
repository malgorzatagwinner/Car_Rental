-- -----------------------------------------------------
-- Schema DB_Gwinner
-- -----------------------------------------------------

-- SET FOREIGN_KEY_CHECKS=0;

--DROP TABLE IF EXISTS `Rezerwacja` ;
--DROP TABLE IF EXISTS `Klient` ;
--DROP TABLE IF EXISTS `Samochod` ;
--DROP TABLE IF EXISTS `Rodzaj` ;
-- -----------------------------------------------------
-- Table `Rodzaj`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Rodzaj` (
  `idRodzaj` INTEGER NOT NULL,
  `model` VARCHAR(45) NOT NULL,
  `marka` VARCHAR(45) NOT NULL,
  `miejsca` INTEGER NOT NULL,
  `rocznik` VARCHAR(45) NULL,
  `cena` INTEGER NOT NULL,
  `zdjecie` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idRodzaj`));

-- -----------------------------------------------------
-- Table `Samochod`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Samochod` (
  `idSamochod` INTEGER NOT NULL,
  `rejestracja` VARCHAR(45) NOT NULL UNIQUE,
  `kolor` VARCHAR(45) NOT NULL,
  `Rodzaj_ID` INTEGER NOT NULL,
  PRIMARY KEY (`idSamochod`),
  FOREIGN KEY (`Rodzaj_ID`)
    REFERENCES `Rodzaj` (`idRodzaj`));

-- -----------------------------------------------------
-- Table `Klient`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Klient` (
  `idKlient` INTEGER NOT NULL,
  `nazwisko` VARCHAR(45) NOT NULL,
  `imie` VARCHAR(45) NOT NULL,
  `wiek` VARCHAR(45) NULL,
  `mail` VARCHAR(45) NOT NULL UNIQUE,
  `prawo_jazdy` VARCHAR(45) NULL UNIQUE,
  `haslo` VARCHAR(45) NOT NULL,
  `isAdmin` INTEGER DEFAULT(0),
  PRIMARY KEY (`idKlient`));
  
-- -----------------------------------------------------
-- Table `Rezerwacja`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Rezerwacja` (
  `idRezerwacja` INTEGER NOT NULL,
  `termin_od` DATETIME NOT NULL,
  `termin_do` DATETIME NOT NULL,
  `Klient_ID` INTEGER NOT NULL,
  `Samochod_ID` INTEGER NOT NULL,
  `isconfirmed` INTEGER DEFAULT(0),
   PRIMARY KEY (`idRezerwacja`),
    FOREIGN KEY (`Klient_ID`)
    REFERENCES `Klient` (`idKlient`),
    FOREIGN KEY (`Samochod_ID`)
    REFERENCES `Samochod` (`idSamochod`)
);
INSERT OR IGNORE INTO Rodzaj (idRodzaj ,model, marka, miejsca, rocznik, cena, zdjecie) VALUES (1,'Corsa', 'Opel', 5, 2016, 50, '/img/biały.png'),
(2, 'Corsa','Opel', 5, 2016, 55, '/img/czarny.jpg'),
(3,'Tipo', 'Fiat', 5, 2015, 60, '/img/bordo.jpg'),
(4,'Tipo', 'Fiat',5, 2015, 75, '/img/rosegold.jpg'),
(5,'Linea','Fiat', 5, 2013, 75, '/img/zloty.jpg'),
(6, 'Croma','Fiat', 5, 2010, 40, '/img/czerwony.jpg');

INSERT OR IGNORE INTO Samochod(idSamochod, rejestracja, Rodzaj_ID, kolor) VALUES (1,'ASD123456', 1, 'biały'), (2,'ASB123456', 2, 'czarny'), (3,'ASD123406', 3, 'bordo'), (4,'ASD123486', 4, 'złoty'), (5,'ASD123476', 5, 'złoty'), (6,'ASD123466', 6, 'czerwony'), (7,'ASD323466', 6, 'czerwony');
--dodać admina
INSERT OR IGNORE INTO Klient(idKlient, nazwisko, imie, wiek, mail, prawo_jazdy, haslo, isAdmin) VALUES (1, 'admin', 'admin', 20, 'admin@admin.com', 12345, 'admin', 1);
INSERT OR IGNORE INTO Klient(idKlient, nazwisko, imie, wiek, mail, prawo_jazdy, haslo, isAdmin) VALUES (2, 'test', 'test', 20, 'test@test.com', 1234e5, 'test', 0);
