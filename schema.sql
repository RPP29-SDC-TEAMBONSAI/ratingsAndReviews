DROP DATABASE IF EXISTS fecdb;

CREATE DATABASE fecdb;

USE fecdb;

CREATE TABLE reviews (
  id BIGSERIAL PRIMARY KEY,
  productId integer,
  rating integer,
  date varchar(14),
  summary varchar(500),
  body varchar(500),
  recommended varchar(5),
  reported varchar(5),
  reviewerName varchar(50),
  reviewerEmail varchar(200),
  response varchar(500),
  helpfulness integer(5)
);

CREATE TABLE characteristics (
  id BIGSERIAL PRIMARY KEY,
  productId int,
  name varchar(7)
);

CREATE TABLE characteristicReviews (
  id BIGSERIAL PRIMARY KEY,
  characteristicsId int,
  reviewsId int,
  value int
);

CREATE TABLE reviewsPhotos (
  id BIGSERIAL PRIMARY KEY,
  reviewId int,
  url varchar(300)
);

COPY reviews FROM '/Users/tanielpogharian/Desktop/reviews.csv' DELIMITER ',' CSV HEADER;
COPY characteristics FROM '/Users/tanielpogharian/Desktop/characteristics.csv' DELIMITER ',' CSV HEADER;
COPY reviewsphotos FROM '/Users/tanielpogharian/Desktop/reviews_photos.csv' DELIMITER ',' CSV HEADER;
COPY characteristicReviews FROM '/Users/tanielpogharian/Desktop/characteristic_reviews.csv' DELIMITER ',' CSV HEADER;

CREATE INDEX idx ON reviews(productId);
CREATE INDEX charIdx ON characteristics(productId);
CREATE INDEX charRevIdx ON characteristicReviews(characteristicsId);