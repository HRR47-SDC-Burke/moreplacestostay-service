const mongoose = require('mongoose');
const { url } = require('../config.js');
const { documents } = require('./TenMillionData.js');

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

// clear database before input new data
Airbnb.deleteMany({}, (err, data) => {
  documents.map(document => {
    const airbnb = new Airbnb({
      id: document.id,
      name: document.name,
      price: document.price,
      imageurl: document.imageurl
    });

    airbnb.save();
    // somehow this file wouldn't end itself so leave this log to know when it's finished
    if (document.id === totalNumberOfData) {
      console.log('Database seeded');
    }
  });
});
