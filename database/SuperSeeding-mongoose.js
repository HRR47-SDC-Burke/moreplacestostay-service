const mongoose = require('mongoose');
const fs = require('fs');
const { url } = require('../config.js');
const { newImageUrl } = require('../config.js');
const { readEachLine } = require('./fileReader.js');

mongoose.connect(url, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

const connection = mongoose.connection;

connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

const airbnbSchema = new mongoose.Schema({
  id: Number,
  name: String,
  price: Number,
  imageurl: String,
});

const Airbnb = mongoose.model('Airbnb', airbnbSchema);

let id = 1;

// clear database before input new data
Airbnb.deleteMany({}, (err, data) => {
  readEachLine('tenmilliondata.txt', (data) => {
    // add the data id and complete url
    data.id = id;
    data.imageurl = `${newImageUrl}/${data.imageurl}.jpg`;
    Airbnb.create(data, (err, result) => {
      if (err) {
        console.log(err);
      }
    });

    // notification if done creating
    if (id % 100000 === 0) {
      console.log(id + '%');
    }

    id++;
  });
});
