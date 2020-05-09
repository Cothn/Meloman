-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
-- -----------------------------------------------------
-- Schema meloman_db1
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `meloman_db1`;
USE `meloman_db1` ;

-- -----------------------------------------------------
-- Table `meloman_db1`.`user_role`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `meloman_db1`.`user_role` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `name_UNIQUE` (`title` ASC) )
ENGINE = InnoDB
;


-- -----------------------------------------------------
-- Table `meloman_db1`.`genres`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `meloman_db1`.`genres` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `name_UNIQUE` (`title` ASC) )
ENGINE = InnoDB
;


-- -----------------------------------------------------
-- Table `meloman_db1`.`track`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `meloman_db1`.`track` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(255) NOT NULL,
  `music_url` VARCHAR(255) NOT NULL,
  `user_id` INT NOT NULL,
  `genre_id` INT NOT NULL,
  `duration` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_track_users1_idx` (`user_id` ASC) ,
  INDEX `fk_track_genres1_idx` (`genre_id` ASC) ,
  UNIQUE INDEX `music_url_UNIQUE` (`music_url` ASC) ,
  INDEX `name` (`title` ASC) ,
  CONSTRAINT `fk_track_genres1`
    FOREIGN KEY (`genre_id`)
    REFERENCES `meloman_db1`.`genres` (`id`),
  CONSTRAINT `fk_track_users1`
    FOREIGN KEY (`user_id`)
    REFERENCES `meloman_db1`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
;


-- -----------------------------------------------------
-- Table `meloman_db1`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `meloman_db1`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NULL DEFAULT NULL,
  `surname` VARCHAR(255) NULL DEFAULT NULL,
  `nickname` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `salt` VARCHAR(255) NOT NULL,
  `role_id` INT NOT NULL DEFAULT 2,
  `music_avatar_id` INT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_users_user_role1` (`role_id` ASC) ,
  INDEX `fk_users_track1_idx` (`music_avatar_id` ASC) ,
  INDEX `nick_name` (`nickname` ASC) ,
  UNIQUE INDEX `nickname_UNIQUE` (`nickname` ASC) ,
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) ,
  CONSTRAINT `fk_users_user_role1`
    FOREIGN KEY (`role_id`)
    REFERENCES `meloman_db1`.`user_role` (`id`),
  CONSTRAINT `fk_users_track1`
    FOREIGN KEY (`music_avatar_id`)
    REFERENCES `meloman_db1`.`track` (`id`))
ENGINE = InnoDB
;


-- -----------------------------------------------------
-- Table `meloman_db1`.`playlist`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `meloman_db1`.`playlist` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(255) NOT NULL,
  `author_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_playlist_users2_idx` (`author_id` ASC) ,
  INDEX `title` (`title` ASC) ,
  CONSTRAINT `fk_playlist_users2`
    FOREIGN KEY (`author_id`)
    REFERENCES `meloman_db1`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
;


-- -----------------------------------------------------
-- Table `meloman_db1`.`posts`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `meloman_db1`.`posts` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `text` MEDIUMTEXT NULL DEFAULT NULL,
  `author_id` INT NOT NULL,
  `playlist_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_posts_users1_idx` (`author_id` ASC) ,
  INDEX `fk_posts_playlist1_idx` (`playlist_id` ASC) ,
  CONSTRAINT `fk_posts_playlist1`
    FOREIGN KEY (`playlist_id`)
    REFERENCES `meloman_db1`.`playlist` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_posts_users1`
    FOREIGN KEY (`author_id`)
    REFERENCES `meloman_db1`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
;


-- -----------------------------------------------------
-- Table `meloman_db1`.`comments`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `meloman_db1`.`comments` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `text` MEDIUMTEXT NOT NULL,
  `author_id` INT NOT NULL,
  `post_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_comments_users1_idx` (`author_id` ASC) ,
  INDEX `fk_comments_posts1_idx` (`post_id` ASC) ,
  CONSTRAINT `fk_comments_posts1`
    FOREIGN KEY (`post_id`)
    REFERENCES `meloman_db1`.`posts` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_comments_users1`
    FOREIGN KEY (`author_id`)
    REFERENCES `meloman_db1`.`users` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
;


-- -----------------------------------------------------
-- Table `meloman_db1`.`likes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `meloman_db1`.`likes` (
  `user_id` INT NOT NULL,
  `post_id` INT NOT NULL,
  PRIMARY KEY (`user_id`, `post_id`),
  INDEX `fk_likes_posts1_idx` (`post_id` ASC) ,
  CONSTRAINT `fk_likes_posts1`
    FOREIGN KEY (`post_id`)
    REFERENCES `meloman_db1`.`posts` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_likes_users1`
    FOREIGN KEY (`user_id`)
    REFERENCES `meloman_db1`.`users` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
;


-- -----------------------------------------------------
-- Table `meloman_db1`.`playlist_track`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `meloman_db1`.`playlist_track` (
  `playlist_id` INT NOT NULL,
  `track_id` INT NOT NULL,
  PRIMARY KEY (`playlist_id`, `track_id`),
  CONSTRAINT `playlist_track_ibfk_2`
    FOREIGN KEY (`track_id`)
    REFERENCES `meloman_db1`.`track` (`id`),
  CONSTRAINT `playlist_track_ibfk_1`
    FOREIGN KEY (`playlist_id`)
    REFERENCES `meloman_db1`.`playlist` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
;


-- -----------------------------------------------------
-- Table `meloman_db1`.`users_playlists`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `meloman_db1`.`users_playlists` (
  `playlist_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`playlist_id`, `user_id`),
  INDEX `fk_playlist_has_users_users1_idx` (`user_id` ASC) ,
  INDEX `fk_playlist_has_users_playlist1_idx` (`playlist_id` ASC) ,
  CONSTRAINT `fk_playlist_has_users_playlist1`
    FOREIGN KEY (`playlist_id`)
    REFERENCES `meloman_db1`.`playlist` (`id`),
  CONSTRAINT `fk_playlist_has_users_users1`
    FOREIGN KEY (`user_id`)
    REFERENCES `meloman_db1`.`users` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

INSERT INTO user_role (title) VALUES ("Admin");
INSERT INTO user_role (title) VALUES ("User");
INSERT INTO users ( nickname, email, password, salt, role_id) VALUES ("Admin","admin@meloman.mel", "$2b$10$o6yVM3QbTF13nERb.3.S/O4v4gwpJ6/jT3/nCxND2No381Z1m2/8C", "$2b$10$o6yVM3QbTF13nERb.3.S/O", "1");
INSERT INTO genres (title) VALUES ("Rock");
INSERT INTO genres (title) VALUES ("Pop");
