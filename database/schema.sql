CREATE DATABASE places;

USE places;

CREATE TABLE place (
  id INTEGER NOT NULL AUTO_INCREMENT,
  name text NOT NULL,
  price INTEGER NOT NULL,
  imageurl text NOT NULL,

  PRIMARY KEY (id)
);


/*  Execute this file from the command line by typing:
 *    mysql -u root < database/schema.sql
 *  to create the database and the tables.*/

