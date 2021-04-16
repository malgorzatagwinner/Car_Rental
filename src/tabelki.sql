-- -----------------------------------------------------
-- Schema DB_Gwinner
-- -----------------------------------------------------

-- SET FOREIGN_KEY_CHECKS=0;

DROP TABLE IF EXISTS `Rezerwacja` ;
DROP TABLE IF EXISTS `Klient` ;
DROP TABLE IF EXISTS `Samochod` ;
DROP TABLE IF EXISTS `Rodzaj` ;
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
  PRIMARY KEY (`idRodzaj`));

-- -----------------------------------------------------
-- Table `Samochod`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Samochod` (
  `idSamochod` INTEGER NOT NULL,
  `rejestracja` VARCHAR(45) NOT NULL UNIQUE,
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
  `mail` VARCHAR(45) NOT NULL,
  `prawo_jazdy` VARCHAR(45) NULL UNIQUE,
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
   PRIMARY KEY (`idRezerwacja`),
    FOREIGN KEY (`Klient_ID`)
    REFERENCES `Klient` (`idKlient`),
    FOREIGN KEY (`Samochod_ID`)
    REFERENCES `Samochod` (`idSamochod`)
);
