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
  `nadwozie` VARCHAR(45) NOT NULL,
  `miejsca` FLOAT NOT NULL,
  `rocznik` VARCHAR(45) NULL,
  PRIMARY KEY (`idRodzaj`));

-- -----------------------------------------------------
-- Table `Samochód`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Samochód` ;

CREATE TABLE IF NOT EXISTS `Samochód` (
  `idSamochód` INT NOT NULL,
  `rejestracja` VARCHAR(45) NOT NULL,
  `Rodzaj_ID` INT NOT NULL,
  PRIMARY KEY (`idSamochód`),
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
  `wiek` VARCHAR(45) NULL,
  `mail` VARCHAR(45) NOT NULL,
  `prawo_jazdy` VARCHAR(45) NULL,
  PRIMARY KEY (`idKlient`));
  
-- -----------------------------------------------------
-- Table `Rezerwacja`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Rezerwacja` ;

CREATE TABLE IF NOT EXISTS `Rezerwacja` (
  `idRezerwacja` INT NOT NULL,
  `termin_od` DATE NOT NULL,
  `godzina_od` TIME NOT NULL,
  `termin_do` DATE NOT NULL,
  `godzina_do` TIME NOT NULL,
  `Klient_ID` INT NOT NULL,
  `Samochód_ID` INT NOT NULL,
   PRIMARY KEY (`idRezerwacja`),
    FOREIGN KEY (`Klient_ID`)
    REFERENCES `Klient` (`idKlient`),
    FOREIGN KEY (`Samochód_ID`)
    REFERENCES `Samochód` (`idSamochód`)
);
