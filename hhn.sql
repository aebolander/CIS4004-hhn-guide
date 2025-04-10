-- MySQL Script generated by MySQL Workbench
-- Tue Apr  1 10:17:52 2025
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema hhn_db
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema hhn_db
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `hhn_db` DEFAULT CHARACTER SET latin1 ;
USE `hhn_db` ;

-- -----------------------------------------------------
-- Table `hhn_db`.`hhn_events`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `hhn_db`.`hhn_events` (
  `event_id` INT(10) NOT NULL AUTO_INCREMENT,
  `event_name` VARCHAR(100) NOT NULL,
  `event_year` INT(4) NOT NULL,
  PRIMARY KEY (`event_id`),
  UNIQUE INDEX `event_name` (`event_name` ASC) VISIBLE,
  UNIQUE INDEX `event_year` (`event_year` ASC) VISIBLE,
  INDEX `event_name_key` (`event_name` ASC) VISIBLE,
  INDEX `event_year_key` (`event_year` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1
ROW_FORMAT = DYNAMIC;


-- -----------------------------------------------------
-- Table `hhn_db`.`hhn_persons`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `hhn_db`.`hhn_persons` (
  `person_id` INT(10) NOT NULL AUTO_INCREMENT,
  `person_name` VARCHAR(200) NOT NULL,
  PRIMARY KEY (`person_id`),
  UNIQUE INDEX `person_name` (`person_name` ASC) VISIBLE,
  INDEX `person_name_key` (`person_name` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1
ROW_FORMAT = DYNAMIC;


-- -----------------------------------------------------
-- Table `hhn_db`.`hhn_houses_by_person`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `hhn_db`.`hhn_houses_by_person` (
  `person_id` INT(10) NOT NULL,
  `house_id` INT(10) NOT NULL,
  `visit_count` INT(10) NULL DEFAULT NULL,
  PRIMARY KEY (`person_id`, `house_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1
ROW_FORMAT = DYNAMIC;


-- -----------------------------------------------------
-- Table `hhn_db`.`hhn_houses`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `hhn_db`.`hhn_houses` (
  `house_id` INT(10) NOT NULL AUTO_INCREMENT,
  `house_name` VARCHAR(200) NOT NULL,
  `event_id` INT(100) NOT NULL,
  PRIMARY KEY (`house_id`),
  INDEX `house_name_key` (`house_name` ASC) VISIBLE,
  INDEX `event_id` (`event_id` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1
ROW_FORMAT = DYNAMIC;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;