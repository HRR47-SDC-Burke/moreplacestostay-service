const mysql = require('mysql');
const fs = require('fs');
const readline = require('readline');
const { newImageUrl } = require('../config.js');
const { readEachLine } = require('./fileReader.js');

var con = mysql.createConnection({
  user: 'root',
  password: 'password',
  database: 'places'
});

if (! con._connectCalled) {
  con.connect(function(err) {
    if (err) {
      throw err;
    } else {
      console.log('Connected!');
    }
  });
}

// truncate table first
// this also reset auto increment id
con.query('TRUNCATE TABLE place', (err) => {
  if (err) {
    throw err;
  } else {
    console.log('table clear');
  }
});

let count = 1;
const command = 'INSERT INTO place (name, price, imageurl) VALUES (?, ?, ?);';

readEachLine('tenmilliondata.txt', ({ name, price, imageurl }) => {
  const dataInfo = [name, price, `${newImageUrl}/${imageurl}.jpg`];

  con.query(command, dataInfo, (err, result) => {
    if (err) {
      throw err;
    }
  });

  // notification if done creating
  if (count % 100000 === 0) {
    console.log(count / 100000 + '%');
  }

  count++;
});
