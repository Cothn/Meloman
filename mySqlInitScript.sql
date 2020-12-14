-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema meloman_db2
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema meloman_db2
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `meloman_db2`;
USE `meloman_db2` ;

-- -----------------------------------------------------
-- Table `meloman_db2`.`genres`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `meloman_db2`.`genres` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `name_UNIQUE` (`title` ASC))
ENGINE = InnoDB
;


-- -----------------------------------------------------
-- Table `meloman_db2`.`track`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `meloman_db2`.`track` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(255) NOT NULL,
  `music_url` VARCHAR(255) NOT NULL,
  `user_id` INT NOT NULL,
  `genre_id` INT NOT NULL,
  `duration` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `music_url_UNIQUE` (`music_url` ASC),
  INDEX `fk_track_users1_idx` (`user_id` ASC),
  INDEX `fk_track_genres1_idx` (`genre_id` ASC),
  INDEX `name` (`title` ASC),
  CONSTRAINT `fk_track_genres1`
    FOREIGN KEY (`genre_id`)
    REFERENCES `meloman_db2`.`genres` (`id`),
  CONSTRAINT `fk_track_users1`
    FOREIGN KEY (`user_id`)
    REFERENCES `meloman_db2`.`users` (`id`))
ENGINE = InnoDB
;


-- -----------------------------------------------------
-- Table `meloman_db2`.`user_role`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `meloman_db2`.`user_role` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `name_UNIQUE` (`title` ASC))
ENGINE = InnoDB
;


-- -----------------------------------------------------
-- Table `meloman_db2`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `meloman_db2`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NULL DEFAULT NULL,
  `surname` VARCHAR(255) NULL DEFAULT NULL,
  `nickname` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `salt` VARCHAR(255) NOT NULL,
  `role_id` INT NOT NULL DEFAULT '2',
  `music_avatar_id` INT NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `nickname_UNIQUE` (`nickname` ASC),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC),
  INDEX `fk_users_user_role1` (`role_id` ASC),
  INDEX `fk_users_track1_idx` (`music_avatar_id` ASC),
  INDEX `nick_name` (`nickname` ASC),
  CONSTRAINT `fk_users_track1`
    FOREIGN KEY (`music_avatar_id`)
    REFERENCES `meloman_db2`.`track` (`id`),
  CONSTRAINT `fk_users_user_role1`
    FOREIGN KEY (`role_id`)
    REFERENCES `meloman_db2`.`user_role` (`id`))
ENGINE = InnoDB
;


-- -----------------------------------------------------
-- Table `meloman_db2`.`playlist`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `meloman_db2`.`playlist` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(255) NOT NULL,
  `author_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_playlist_users2_idx` (`author_id` ASC),
  INDEX `title` (`title` ASC),
  CONSTRAINT `fk_playlist_users2`
    FOREIGN KEY (`author_id`)
    REFERENCES `meloman_db2`.`users` (`id`))
ENGINE = InnoDB
;


-- -----------------------------------------------------
-- Table `meloman_db2`.`posts`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `meloman_db2`.`posts` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `text` MEDIUMTEXT NULL DEFAULT NULL,
  `author_id` INT NOT NULL,
  `playlist_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_posts_users1_idx` (`author_id` ASC),
  INDEX `fk_posts_playlist1_idx` (`playlist_id` ASC),
  CONSTRAINT `fk_posts_playlist1`
    FOREIGN KEY (`playlist_id`)
    REFERENCES `meloman_db2`.`playlist` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_posts_users1`
    FOREIGN KEY (`author_id`)
    REFERENCES `meloman_db2`.`users` (`id`))
ENGINE = InnoDB
;


-- -----------------------------------------------------
-- Table `meloman_db2`.`comments`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `meloman_db2`.`comments` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `text` MEDIUMTEXT NOT NULL,
  `author_id` INT NOT NULL,
  `post_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_comments_users1_idx` (`author_id` ASC),
  INDEX `fk_comments_posts1_idx` (`post_id` ASC),
  CONSTRAINT `fk_comments_posts1`
    FOREIGN KEY (`post_id`)
    REFERENCES `meloman_db2`.`posts` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_comments_users1`
    FOREIGN KEY (`author_id`)
    REFERENCES `meloman_db2`.`users` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
;


-- -----------------------------------------------------
-- Table `meloman_db2`.`likes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `meloman_db2`.`likes` (
  `user_id` INT NOT NULL,
  `post_id` INT NOT NULL,
  PRIMARY KEY (`user_id`, `post_id`),
  INDEX `fk_likes_posts1_idx` (`post_id` ASC),
  CONSTRAINT `fk_likes_posts1`
    FOREIGN KEY (`post_id`)
    REFERENCES `meloman_db2`.`posts` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_likes_users1`
    FOREIGN KEY (`user_id`)
    REFERENCES `meloman_db2`.`users` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
;


-- -----------------------------------------------------
-- Table `meloman_db2`.`playlist_track`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `meloman_db2`.`playlist_track` (
  `playlist_id` INT NOT NULL,
  `track_id` INT NOT NULL,
  PRIMARY KEY (`playlist_id`, `track_id`),
  INDEX `playlist_track_ibfk_2` (`track_id` ASC),
  CONSTRAINT `playlist_track_ibfk_1`
    FOREIGN KEY (`playlist_id`)
    REFERENCES `meloman_db2`.`playlist` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `playlist_track_ibfk_2`
    FOREIGN KEY (`track_id`)
    REFERENCES `meloman_db2`.`track` (`id`))
ENGINE = InnoDB
;


-- -----------------------------------------------------
-- Table `meloman_db2`.`users_playlists`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `meloman_db2`.`users_playlists` (
  `playlist_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`playlist_id`, `user_id`),
  INDEX `fk_playlist_has_users_users1_idx` (`user_id` ASC),
  INDEX `fk_playlist_has_users_playlist1_idx` (`playlist_id` ASC),
  CONSTRAINT `fk_playlist_has_users_playlist1`
    FOREIGN KEY (`playlist_id`)
    REFERENCES `meloman_db2`.`playlist` (`id`),
  CONSTRAINT `fk_playlist_has_users_users1`
    FOREIGN KEY (`user_id`)
    REFERENCES `meloman_db2`.`users` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
;


-- -----------------------------------------------------
-- Table `meloman_db2`.`labels`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `meloman_db2`.`labels` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `title_UNIQUE` (`title` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `meloman_db2`.`Albums`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `meloman_db2`.`Albums` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(45) NOT NULL,
  `release_date` DATE NOT NULL,
  `description` MEDIUMTEXT NULL DEFAULT NULL,
  `label_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_Albums_labels1_idx` (`label_id` ASC),
  CONSTRAINT `fk_Albums_labels1`
    FOREIGN KEY (`label_id`)
    REFERENCES `meloman_db2`.`labels` (`id`)
    ON DELETE RESTRICT
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `meloman_db2`.`countries`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `meloman_db2`.`countries` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `title_UNIQUE` (`title` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `meloman_db2`.`languages`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `meloman_db2`.`languages` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `title_UNIQUE` (`title` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `meloman_db2`.`Person_roles`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `meloman_db2`.`Person_roles` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `title_UNIQUE` (`title` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `meloman_db2`.`persons`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `meloman_db2`.`persons` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `surname` VARCHAR(45) NULL DEFAULT NULL,
  `nickname` VARCHAR(45) NULL DEFAULT NULL,
  `birth_date` DATE NOT NULL,
  `die_date` DATE NULL DEFAULT NULL,
  `biography` MEDIUMTEXT NOT NULL,
  `countrie_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_persons_countries1_idx` (`countrie_id` ASC),
  CONSTRAINT `fk_persons_countries1`
    FOREIGN KEY (`countrie_id`)
    REFERENCES `meloman_db2`.`countries` (`id`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `meloman_db2`.`groups`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `meloman_db2`.`groups` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(45) NOT NULL,
  `birth_date` DATE NOT NULL,
  `die_date` DATE NULL DEFAULT NULL,
  `description` MEDIUMTEXT NULL DEFAULT NULL,
  `countrie_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_groups_countries2_idx` (`countrie_id` ASC),
  CONSTRAINT `fk_persons_countries2`
    FOREIGN KEY (`countrie_id`)
    REFERENCES `meloman_db2`.`countries` (`id`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `meloman_db2`.`Singles`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `meloman_db2`.`Singles` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(45) NOT NULL,
  `release_date` DATE NOT NULL,
  `description` MEDIUMTEXT NULL DEFAULT NULL,
  `track_id` INT NOT NULL,
  `label_id` INT NOT NULL,
  `language_id` INT NOT NULL,
  `groups_id` INT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_Singles_track1_idx` (`track_id` ASC),
  INDEX `fk_Singles_labels1_idx` (`label_id` ASC),
  INDEX `fk_Singles_languages1_idx` (`language_id` ASC),
  INDEX `fk_Singles_groups1_idx` (`groups_id` ASC),
  CONSTRAINT `fk_Singles_track1`
    FOREIGN KEY (`track_id`)
    REFERENCES `meloman_db2`.`track` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_Singles_labels1`
    FOREIGN KEY (`label_id`)
    REFERENCES `meloman_db2`.`labels` (`id`)
    ON DELETE RESTRICT
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Singles_languages1`
    FOREIGN KEY (`language_id`)
    REFERENCES `meloman_db2`.`languages` (`id`)
    ON DELETE RESTRICT
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Singles_groups1`
    FOREIGN KEY (`groups_id`)
    REFERENCES `meloman_db2`.`groups` (`id`)
    ON DELETE RESTRICT
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `meloman_db2`.`persons_languages`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `meloman_db2`.`persons_languages` (
  `persons_id` INT NOT NULL,
  `languages_id` INT NOT NULL,
  PRIMARY KEY (`persons_id`, `languages_id`),
  INDEX `fk_persons_has_languages_languages1_idx` (`languages_id` ASC),
  INDEX `fk_persons_has_languages_persons1_idx` (`persons_id` ASC),
  CONSTRAINT `fk_persons_has_languages_persons1`
    FOREIGN KEY (`persons_id`)
    REFERENCES `meloman_db2`.`persons` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_persons_has_languages_languages1`
    FOREIGN KEY (`languages_id`)
    REFERENCES `meloman_db2`.`languages` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `meloman_db2`.`persons_roles`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `meloman_db2`.`persons_roles` (
  `persons_id` INT NOT NULL,
  `Person_roles_id` INT NOT NULL,
  PRIMARY KEY (`persons_id`, `Person_roles_id`),
  INDEX `fk_persons_has_Person_roles_Person_roles1_idx` (`Person_roles_id` ASC),
  INDEX `fk_persons_has_Person_roles_persons1_idx` (`persons_id` ASC),
  CONSTRAINT `fk_persons_has_Person_roles_persons1`
    FOREIGN KEY (`persons_id`)
    REFERENCES `meloman_db2`.`persons` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_persons_has_Person_roles_Person_roles1`
    FOREIGN KEY (`Person_roles_id`)
    REFERENCES `meloman_db2`.`Person_roles` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `meloman_db2`.`Singles_persons`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `meloman_db2`.`Singles_persons` (
  `Singles_id` INT NOT NULL,
  `persons_id` INT NOT NULL,
  PRIMARY KEY (`Singles_id`, `persons_id`),
  INDEX `fk_Singles_has_persons_persons1_idx` (`persons_id` ASC),
  INDEX `fk_Singles_has_persons_Singles1_idx` (`Singles_id` ASC),
  CONSTRAINT `fk_Singles_has_persons_Singles1`
    FOREIGN KEY (`Singles_id`)
    REFERENCES `meloman_db2`.`Singles` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_Singles_has_persons_persons1`
    FOREIGN KEY (`persons_id`)
    REFERENCES `meloman_db2`.`persons` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `meloman_db2`.`Albums_languages`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `meloman_db2`.`Albums_languages` (
  `Albums_id` INT NOT NULL,
  `languages_id` INT NOT NULL,
  PRIMARY KEY (`Albums_id`, `languages_id`),
  INDEX `fk_Albums_has_languages_languages1_idx` (`languages_id` ASC),
  INDEX `fk_Albums_has_languages_Albums1_idx` (`Albums_id` ASC),
  CONSTRAINT `fk_Albums_has_languages_Albums1`
    FOREIGN KEY (`Albums_id`)
    REFERENCES `meloman_db2`.`Albums` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_Albums_has_languages_languages1`
    FOREIGN KEY (`languages_id`)
    REFERENCES `meloman_db2`.`languages` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `meloman_db2`.`Albums_persons`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `meloman_db2`.`Albums_persons` (
  `Albums_id` INT NOT NULL,
  `persons_id` INT NOT NULL,
  PRIMARY KEY (`Albums_id`, `persons_id`),
  INDEX `fk_Albums_has_persons_persons1_idx` (`persons_id` ASC),
  INDEX `fk_Albums_has_persons_Albums1_idx` (`Albums_id` ASC),
  CONSTRAINT `fk_Albums_has_persons_Albums1`
    FOREIGN KEY (`Albums_id`)
    REFERENCES `meloman_db2`.`Albums` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_Albums_has_persons_persons1`
    FOREIGN KEY (`persons_id`)
    REFERENCES `meloman_db2`.`persons` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `meloman_db2`.`Albums_track`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `meloman_db2`.`Albums_track` (
  `Albums_id` INT NOT NULL,
  `track_id` INT NOT NULL,
  PRIMARY KEY (`Albums_id`, `track_id`),
  INDEX `fk_Albums_has_track_track1_idx` (`track_id` ASC),
  INDEX `fk_Albums_has_track_Albums1_idx` (`Albums_id` ASC),
  CONSTRAINT `fk_Albums_has_track_Albums1`
    FOREIGN KEY (`Albums_id`)
    REFERENCES `meloman_db2`.`Albums` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_Albums_has_track_track1`
    FOREIGN KEY (`track_id`)
    REFERENCES `meloman_db2`.`track` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `meloman_db2`.`Albums_genres`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `meloman_db2`.`Albums_genres` (
  `Albums_id` INT NOT NULL,
  `genres_id` INT NOT NULL,
  PRIMARY KEY (`Albums_id`, `genres_id`),
  INDEX `fk_Albums_has_genres_genres1_idx` (`genres_id` ASC),
  INDEX `fk_Albums_has_genres_Albums1_idx` (`Albums_id` ASC),
  CONSTRAINT `fk_Albums_has_genres_Albums1`
    FOREIGN KEY (`Albums_id`)
    REFERENCES `meloman_db2`.`Albums` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_Albums_has_genres_genres1`
    FOREIGN KEY (`genres_id`)
    REFERENCES `meloman_db2`.`genres` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `meloman_db2`.`Albums_groups`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `meloman_db2`.`Albums_groups` (
  `Albums_id` INT NOT NULL,
  `groups_id` INT NOT NULL,
  PRIMARY KEY (`Albums_id`, `groups_id`),
  INDEX `fk_Albums_has_groups_groups1_idx` (`groups_id` ASC),
  INDEX `fk_Albums_has_groups_Albums1_idx` (`Albums_id` ASC),
  CONSTRAINT `fk_Albums_has_groups_Albums1`
    FOREIGN KEY (`Albums_id`)
    REFERENCES `meloman_db2`.`Albums` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_Albums_has_groups_groups1`
    FOREIGN KEY (`groups_id`)
    REFERENCES `meloman_db2`.`groups` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `meloman_db2`.`groups_genres`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `meloman_db2`.`groups_genres` (
  `groups_id` INT NOT NULL,
  `genres_id` INT NOT NULL,
  PRIMARY KEY (`groups_id`, `genres_id`),
  INDEX `fk_groups_has_genres_genres1_idx` (`genres_id` ASC),
  INDEX `fk_groups_has_genres_groups1_idx` (`groups_id` ASC),
  CONSTRAINT `fk_groups_has_genres_groups1`
    FOREIGN KEY (`groups_id`)
    REFERENCES `meloman_db2`.`groups` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_groups_has_genres_genres1`
    FOREIGN KEY (`genres_id`)
    REFERENCES `meloman_db2`.`genres` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `meloman_db2`.`groups_languages`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `meloman_db2`.`groups_languages` (
  `groups_id` INT NOT NULL,
  `languages_id` INT NOT NULL,
  PRIMARY KEY (`groups_id`, `languages_id`),
  INDEX `fk_groups_has_languages_languages1_idx` (`languages_id` ASC),
  INDEX `fk_groups_has_languages_groups1_idx` (`groups_id` ASC),
  CONSTRAINT `fk_groups_has_languages_groups1`
    FOREIGN KEY (`groups_id`)
    REFERENCES `meloman_db2`.`groups` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_groups_has_languages_languages1`
    FOREIGN KEY (`languages_id`)
    REFERENCES `meloman_db2`.`languages` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `meloman_db2`.`groups_labels`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `meloman_db2`.`groups_labels` (
  `groups_id` INT NOT NULL,
  `labels_id` INT NOT NULL,
  PRIMARY KEY (`groups_id`, `labels_id`),
  INDEX `fk_groups_has_labels_labels1_idx` (`labels_id` ASC),
  INDEX `fk_groups_has_labels_groups1_idx` (`groups_id` ASC),
  CONSTRAINT `fk_groups_has_labels_groups1`
    FOREIGN KEY (`groups_id`)
    REFERENCES `meloman_db2`.`groups` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_groups_has_labels_labels1`
    FOREIGN KEY (`labels_id`)
    REFERENCES `meloman_db2`.`labels` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `meloman_db2`.`groups_persons`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `meloman_db2`.`groups_persons` (
  `groups_id` INT NOT NULL,
  `persons_id` INT NOT NULL,
  `date_in` DATE NULL,
  `date_out` DATE NULL DEFAULT NULL,
  PRIMARY KEY (`groups_id`, `persons_id`),
  INDEX `fk_groups_has_persons_persons1_idx` (`persons_id` ASC),
  INDEX `fk_groups_has_persons_groups1_idx` (`groups_id` ASC),
  CONSTRAINT `fk_groups_has_persons_groups1`
    FOREIGN KEY (`groups_id`)
    REFERENCES `meloman_db2`.`groups` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_groups_has_persons_persons1`
    FOREIGN KEY (`persons_id`)
    REFERENCES `meloman_db2`.`persons` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

INSERT INTO user_role (title) VALUES ("Admin");
INSERT INTO user_role (title) VALUES ("User");
INSERT INTO users ( nickname, email, password, salt, role_id) VALUES ("Admin","admin@meloman.mel", "$2b$10$o6yVM3QbTF13nERb.3.S/O4v4gwpJ6/jT3/nCxND2No381Z1m2/8C", "$2b$10$o6yVM3QbTF13nERb.3.S/O", "1");
INSERT INTO genres (title) VALUES ("Rock");
INSERT INTO genres (title) VALUES ("Pop");
INSERT INTO genres (title) VALUES ("Rap");
INSERT INTO genres (title) VALUES ("Hard rock");
INSERT INTO genres (title) VALUES ("Alternativ rock");
INSERT INTO genres (title) VALUES ("Fulk rock");
INSERT INTO genres (title) VALUES ("Rock'n roll");
INSERT INTO genres (title) VALUES ("Punk rock");
INSERT INTO genres (title) VALUES ("Classic");
INSERT INTO genres (title) VALUES ("Disko");
INSERT INTO genres (title) VALUES ("Dark electro");
INSERT INTO genres (title) VALUES ("Electro");
INSERT INTO genres (title) VALUES ("War");
INSERT INTO genres (title) VALUES ("Fulk music");

INSERT INTO countries (title) VALUES ("Earth");
INSERT INTO countries (title) VALUES ("Russia");
INSERT INTO countries (title) VALUES ("United Kingdom");
INSERT INTO countries (title) VALUES ("United States");
INSERT INTO countries (title) VALUES ("Germany");
INSERT INTO countries (title) VALUES ("France");
INSERT INTO countries (title) VALUES ("Italy");
INSERT INTO countries (title) VALUES ("Mexico");
INSERT INTO countries (title) VALUES ("Belarus");
INSERT INTO countries (title) VALUES ("Romania");

INSERT INTO person_roles (title) VALUES ("musician");
INSERT INTO person_roles (title) VALUES ("soloist");
INSERT INTO person_roles (title) VALUES ("guitar player");
INSERT INTO person_roles (title) VALUES ("bass-guitar player");
INSERT INTO person_roles (title) VALUES ("pianist");
INSERT INTO person_roles (title) VALUES ("back-vocalist");
INSERT INTO person_roles (title) VALUES ("violinist");
INSERT INTO person_roles (title) VALUES ("drummer");
INSERT INTO person_roles (title) VALUES ("producer");
