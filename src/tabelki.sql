-- -----------------------------------------------------
-- Schema DB_Gwinner
-- -----------------------------------------------------

-- SET FOREIGN_KEY_CHECKS=0;

DROP TABLE IF EXISTS `Rodzaj` ;
-- -----------------------------------------------------
-- Table `Rodzaj`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Rodzaj` (
  `idRodzaj` INT NOT NULL,
  `model` VARCHAR(45) NOT NULL,
  `marka` VARCHAR(45) NOT NULL,
  `miejsca` INT NOT NULL,
  `rocznik` VARCHAR(45) NULL,
  `cena` INT NOT NULL,
  PRIMARY KEY (`idRodzaj`));

-- -----------------------------------------------------
-- Table `Samochod`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Samochod` ;

CREATE TABLE IF NOT EXISTS `Samochod` (
  `idSamochod` INT NOT NULL,
  `rejestracja` VARCHAR(45) NOT NULL,
  `Rodzaj_ID` INT NOT NULL,
  PRIMARY KEY (`idSamochod`),
  FOREIGN KEY (`Rodzaj_ID`)
    REFERENCES `Rodzaj` (`idRodzaj`));

-- -----------------------------------------------------
-- Table `Klient`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Klient` ;

CREATE TABLE IF NOT EXISTS `Klient` (
  `idKlient` INT NOT NULL,
  `nazwisko` VARCHAR(45) NOT NULL,
  `imie` VARCHAR(45) NOT NULL,
  `wiek` INT(45) NULL,
  `mail` VARCHAR(45) NOT NULL,
  `prawo_jazdy` VARCHAR(45) NULL,
  PRIMARY KEY (`idKlient`));
  
-- -----------------------------------------------------
-- Table `Rezerwacja`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Rezerwacja` ;

CREATE TABLE IF NOT EXISTS `Rezerwacja` (
  `idRezerwacja` INT NOT NULL,
  `termin_od` DATETIME NOT NULL,
  `termin_do` DATETIME NOT NULL,
  `Klient_ID` INT NOT NULL,
  `Samochod_ID` INT NOT NULL,
   PRIMARY KEY (`idRezerwacja`),
    FOREIGN KEY (`Klient_ID`)
    REFERENCES `Klient` (`idKlient`),
    FOREIGN KEY (`Samochod_ID`)
    REFERENCES `Samochod` (`idSamochod`)
);
