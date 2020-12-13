-- SQLINES DEMO *** ------------------------------------
-- Schema meloman_db1
-- SQLINES DEMO *** ------------------------------------

--CREATE DATABASE meloman_db1;
--GO
--USE [meloman_db1]
--go
--CREATE SCHEMA  meloman_db1;
--GO


-- SQLINES DEMO *** ------------------------------------
-- SQLINES DEMO *** 1`.`user_role`
-- SQLINES DEMO *** ------------------------------------
CREATE TABLE meloman_db1.user_role (
  [id] INT NOT NULL IDENTITY,
  [title] VARCHAR(255) NOT NULL,
  PRIMARY KEY ([id]),
  CONSTRAINT [name_UNIQUE] UNIQUE ([title] ASC) )
;


-- SQLINES DEMO *** ------------------------------------
-- SQLINES DEMO *** 1`.`genres`
-- SQLINES DEMO *** ------------------------------------
CREATE TABLE meloman_db1.genres (
  [id] INT NOT NULL IDENTITY,
  [title] VARCHAR(255) NOT NULL,
  PRIMARY KEY ([id]),
  CONSTRAINT [name_UNIQUE] UNIQUE ([title] ASC) )
;


-- SQLINES DEMO *** ------------------------------------
-- SQLINES DEMO *** 1`.`track`
-- SQLINES DEMO *** ------------------------------------
CREATE TABLE meloman_db1.track (
  [id] INT NOT NULL IDENTITY,
  [title] VARCHAR(255) NOT NULL,
  [music_url] VARCHAR(255) NOT NULL,
  [user_id] INT NOT NULL,
  [genre_id] INT NOT NULL,
  [duration] VARCHAR(255) NOT NULL,
  PRIMARY KEY ([id])
  ,
  CONSTRAINT [music_url_UNIQUE] UNIQUE ([music_url] ASC)
  ,
  CONSTRAINT [fk_track_genres1]
    FOREIGN KEY ([genre_id])
    REFERENCES meloman_db1.genres ([id]),
  CONSTRAINT [fk_track_users1]
    FOREIGN KEY ([user_id])
    REFERENCES meloman_db1.users ([id])
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
;

CREATE INDEX [fk_track_users1_idx] ON meloman_db1.track ([user_id] ASC);
CREATE INDEX [fk_track_genres1_idx] ON meloman_db1.track ([genre_id] ASC);
CREATE INDEX [name] ON meloman_db1.track ([title] ASC);


-- SQLINES DEMO *** ------------------------------------
-- SQLINES DEMO *** 1`.`users`
-- SQLINES DEMO *** ------------------------------------
CREATE TABLE meloman_db1.users (
  [id] INT NOT NULL IDENTITY,
  [name] VARCHAR(255) NULL DEFAULT NULL,
  [surname] VARCHAR(255) NULL DEFAULT NULL,
  [nickname] VARCHAR(255) NOT NULL,
  [email] VARCHAR(255) NOT NULL,
  [password] VARCHAR(255) NOT NULL,
  [salt] VARCHAR(255) NOT NULL,
  [role_id] INT NOT NULL DEFAULT 2,
  [music_avatar_id] INT NULL,
  PRIMARY KEY ([id])
  ,
  CONSTRAINT [nickname_UNIQUE] UNIQUE ([nickname] ASC) ,
  CONSTRAINT [email_UNIQUE] UNIQUE ([email] ASC) ,
  CONSTRAINT [fk_users_user_role1]
    FOREIGN KEY ([role_id])
    REFERENCES meloman_db1.user_role ([id]),
  CONSTRAINT [fk_users_track1]
    FOREIGN KEY ([music_avatar_id])
    REFERENCES meloman_db1.track ([id]))
;

CREATE INDEX [fk_users_user_role1] ON meloman_db1.users ([role_id] ASC);
CREATE INDEX [fk_users_track1_idx] ON meloman_db1.users ([music_avatar_id] ASC);
CREATE INDEX [nick_name] ON meloman_db1.users ([nickname] ASC);


-- SQLINES DEMO *** ------------------------------------
-- SQLINES DEMO *** 1`.`playlist`
-- SQLINES DEMO *** ------------------------------------
CREATE TABLE meloman_db1.playlist (
  [id] INT NOT NULL IDENTITY,
  [title] VARCHAR(255) NOT NULL,
  [author_id] INT NOT NULL,
  PRIMARY KEY ([id])
  ,
  CONSTRAINT [fk_playlist_users2]
    FOREIGN KEY ([author_id])
    REFERENCES meloman_db1.users ([id])
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
;

CREATE INDEX [fk_playlist_users2_idx] ON meloman_db1.playlist ([author_id] ASC);
CREATE INDEX [title] ON meloman_db1.playlist ([title] ASC);


-- SQLINES DEMO *** ------------------------------------
-- SQLINES DEMO *** 1`.`posts`
-- SQLINES DEMO *** ------------------------------------
CREATE TABLE meloman_db1.posts (
  [id] INT NOT NULL IDENTITY,
  [text] VARCHAR(max) NULL DEFAULT NULL,
  [author_id] INT NOT NULL,
  [playlist_id] INT NOT NULL,
  PRIMARY KEY ([id])
  ,
  CONSTRAINT [fk_posts_playlist1]
    FOREIGN KEY ([playlist_id])
    REFERENCES meloman_db1.playlist ([id])
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT [fk_posts_users1]
    FOREIGN KEY ([author_id])
    REFERENCES meloman_db1.users ([id])
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
;

CREATE INDEX [fk_posts_users1_idx] ON meloman_db1.posts ([author_id] ASC);
CREATE INDEX [fk_posts_playlist1_idx] ON meloman_db1.posts ([playlist_id] ASC);


-- SQLINES DEMO *** ------------------------------------
-- SQLINES DEMO *** 1`.`comments`
-- SQLINES DEMO *** ------------------------------------
CREATE TABLE meloman_db1.comments (
  [id] INT NOT NULL IDENTITY,
  [text] VARCHAR(max) NOT NULL,
  [author_id] INT NOT NULL,
  [post_id] INT NOT NULL,
  PRIMARY KEY ([id])
  ,
  CONSTRAINT [fk_comments_posts1]
    FOREIGN KEY ([post_id])
    REFERENCES meloman_db1.posts ([id])
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT [fk_comments_users1]
    FOREIGN KEY ([author_id])
    REFERENCES meloman_db1.users ([id])
    ON DELETE CASCADE
    ON UPDATE CASCADE)
;

CREATE INDEX [fk_comments_users1_idx] ON meloman_db1.comments ([author_id] ASC);
CREATE INDEX [fk_comments_posts1_idx] ON meloman_db1.comments ([post_id] ASC);


-- SQLINES DEMO *** ------------------------------------
-- SQLINES DEMO *** 1`.`likes`
-- SQLINES DEMO *** ------------------------------------
CREATE TABLE meloman_db1.likes (
  [user_id] INT NOT NULL,
  [post_id] INT NOT NULL,
  PRIMARY KEY ([user_id], [post_id])
  ,
  CONSTRAINT [fk_likes_posts1]
    FOREIGN KEY ([post_id])
    REFERENCES meloman_db1.posts ([id])
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT [fk_likes_users1]
    FOREIGN KEY ([user_id])
    REFERENCES meloman_db1.users ([id])
    ON DELETE CASCADE
    ON UPDATE CASCADE)
;

CREATE INDEX [fk_likes_posts1_idx] ON meloman_db1.likes ([post_id] ASC);


-- SQLINES DEMO *** ------------------------------------
-- SQLINES DEMO *** 1`.`playlist_track`
-- SQLINES DEMO *** ------------------------------------
CREATE TABLE meloman_db1.playlist_track (
  [playlist_id] INT NOT NULL,
  [track_id] INT NOT NULL,
  PRIMARY KEY ([playlist_id], [track_id]),
  CONSTRAINT [playlist_track_ibfk_2]
    FOREIGN KEY ([track_id])
    REFERENCES meloman_db1.track ([id]),
  CONSTRAINT [playlist_track_ibfk_1]
    FOREIGN KEY ([playlist_id])
    REFERENCES meloman_db1.playlist ([id])
    ON DELETE CASCADE
    ON UPDATE CASCADE)
;


-- SQLINES DEMO *** ------------------------------------
-- SQLINES DEMO *** 1`.`users_playlists`
-- SQLINES DEMO *** ------------------------------------
CREATE TABLE meloman_db1.users_playlists (
  [playlist_id] INT NOT NULL,
  [user_id] INT NOT NULL,
  PRIMARY KEY ([playlist_id], [user_id])
  ,
  CONSTRAINT [fk_playlist_has_users_playlist1]
    FOREIGN KEY ([playlist_id])
    REFERENCES meloman_db1.playlist ([id]),
  CONSTRAINT [fk_playlist_has_users_users1]
    FOREIGN KEY ([user_id])
    REFERENCES meloman_db1.users ([id])
    ON DELETE CASCADE
    ON UPDATE CASCADE)
;

CREATE INDEX [fk_playlist_has_users_users1_idx] ON meloman_db1.users_playlists ([user_id] ASC);
CREATE INDEX [fk_playlist_has_users_playlist1_idx] ON meloman_db1.users_playlists ([playlist_id] ASC);