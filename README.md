# Project Name

> More Places to Stay module for AirBnB Clone.

## Related Projects

  - https://github.com/hrr47-fec8-webber/booking-service
  - https://github.com/hrr47-fec8-webber/reviews-service
  - https://github.com/hrr47-fec8-webber/carousel-service

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)

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

### 10,000,000 data

```sh
npm run dataGen
```

Creating 10000000 data in a text file tenmilliondata.txt
Takes about 5 minutes.
File size 633MB.


```sh
npm run seeding
```

store data in tenmilliondata.txt into database

note: remove csv-writer