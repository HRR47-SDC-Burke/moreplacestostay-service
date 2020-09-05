# Project Name

> More Places to Stay module for AirBnB Clone.

## Related Projects

  - https://github.com/hrr47-fec8-webber/booking-service
  - https://github.com/hrr47-fec8-webber/reviews-service
  - https://github.com/hrr47-fec8-webber/carousel-service

## Table of Contents

1. [Usage](#Usage)
2. [Requirements](#requirements)
3. [Development](#development)

## Usage

> This module retrieves a list of similar places to stay based on the selected AirBnB property. It displays 12 other location names, prices, and their respective images.

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

Dependencies:

- Node 6.13.0
- Express 4.17.1
- Axios 0.19.2
- React 16.13.1
- Mongoose 5.9.27
- @babel/core 7.11.1
- @babel/preset-env 7.11.0
- @babel/preset-react 7.10.4
- babel-loader 8.1.0
- html-webpack-plugin 4.3.0
- nodemon 2.0.4
- react-dom 16.13.1
- react-slick 0.27.7
- save 2.4.0
- slick-carousel 1.8.1
- supertest 4.0.2
- webpack 4.44.1
- webpack-cli 3.3.12
- webpack-dev-server 3.11.0

## Development

### Installing Dependencies

From within the root directory:

Install all dependencies listed above.

### Running the Module

Seed the database using the following command:

```sh
npm run database
```

This will seed the database with 100 properties including property name, price per night, and an image from S3.

Next, run:

```sh
npm run server
```

This initiates the server, and backend connection to the database. Next, open another terminal window, and run the following command:

```sh
npm run build
npm run serve
```

This initiates Webpack, enabling the user to visualize the module online. Direct your browser to localhost:9000 to visualize module.

### Testing

To run tests:

```sh
npm run test
```

### CRUD routes

POST:

```sh
/api/moreplacestostay
```

> Create new location

Pass in an object with properties name, price, and imageUrl in the request body.

GET:

```sh
/api/moreplacestostay
```

> Return 12 locations

No request body needed.

PUT:

```sh
/api/moreplacestostay
```

> Update a location information

Pass in an object with property id for target data, and others for update content in the request body.

DELETE:

```sh
/api/moreplacestostay
```

> Delete a location

Pass in an object with property id in the request body.

### 10,000,000 data for MySQL

## Generate data

```sh
npm run generateMysqlData
```

Creating 10000000 data in a text file '10000000mysqldata.csv' in folder named 'data'
Takes about 5 minutes.
File size 1.07 GB.

## Seeding in MySQL

Store data in '10000000mysqldata.csv' into database

# If seeing secure-file-priv errors while loading csv into mysql:

1. Create database and table:

```sh
sudo service mysql start
mysql -u root < database/schema.sql
```

2. If facing secure-file-priv problem:

Add following lines to /etc/mysql/my.cnf:

```sh
[mysqld]
secure-file-priv = "/"
```

Copy csv file into mysql folder with:

```sh
cp <repo path>/10000000mysqldata.csv /var/lib/mysql/place
```

3. (Optional) Clear table and change settings:

Clear table:

```sh
TRUNCATE TABLE place;
```

Change settings to speed up:

```sh
set unique_checks = 0;
set foreign_key_checks = 0;
set sql_log_bin=0;
```

4. Import csv file with mysql shell:

```sh
LOAD DATA INFILE '10000000mysqldata.csv' INTO TABLE place FIELDS TERMINATED BY ',' ENCLOSED BY '"' LINES TERMINATED BY '\n' IGNORE 1 ROWS (name, price, imageurl);
```

### 10,000,000 data for Cassandra

## Generate data

```sh
npm run generateCassandraData
```

Creating 10000000 data in a text file '10000000cassandradata.csv' in folder named 'data'
Takes about 5 minutes.
File size 1.15 GB.

## Seeding with Cassandra

1. Install cassandra

Make sure java 8 is installed first

Install Cassandra with the following line:

```sh
sudo apt-get install cassandra
```

2. Start Cassandra

```sh
sudo service cassandra start
cassandra
cqlsh
```

If having error after inputting 'cassandra', use 'cassandra -R'

3. Create keyspace

Keyspaces in Cassandra are similar to databases in MySQL

```sh
CREATE KEYSPACE places with replication = {'class':'SimpleStrategy','replication_factor':5};
```

4. Use keyspace

```sh
USE places;
```

5. Create table

```sh
Create table place
    (
        id int,
        name text,
        price int,
        imageurl text,
        Primary key(id)
    );
```

6. (Optional) Truncate table

```sh
truncate place;
```

7. Import file

```sh
COPY places.place (id,name,price,imageurl) FROM 'data/10000000cassandradata.csv' WITH DELIMITER=',' AND HEADER=TRUE;
```
