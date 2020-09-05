const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const { url, imageUrl } = require('../urls.js');

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

var prefixes = ['The', 'Wonderful', 'Magnificent', 'Quiet', 'Gorgeous'];

var locations = [
  'Santorini', 'Mykonos', 'Paros', 'Crete', 'Naxos', 'Corfu',
  'Zakynthos', 'Milos', 'Hydra', 'Skiathos', 'Lefkada', 'Patmos',
  'Delos', 'Kos', 'Icaria', 'Amorgos', 'Syros', 'Samos', 'Chios'];

var housingTypes = [
  'Villa', 'Palace', 'Bungalow', 'Mansion', 'Escape', 'House', 'Vista'
];

var randomInt = function (max) {
  return Math.floor(Math.random() * Math.floor(max));
};

var randomInterval = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

var randomName = function () {
  return `${prefixes[randomInt(5)]} ${locations[randomInt(19)]} ${housingTypes[randomInt(7)]}`;
}

var documents = [];

for (var i=0; i<100; i++) {
  var document = {};

  document.name = randomName();

  document.price = randomInterval(400, 4000);

  document.imageurl = `${imageUrl}/${randomInt(28) + 1}.jpg`;

  documents.push(document);
}

const airbnbSchema = new mongoose.Schema({
  name: String,
  price: Number,
  imageurl: String,
});

airbnbSchema.plugin(AutoIncrement, { inc_field: 'id' });

const Airbnbs = mongoose.model('Airbnbs', airbnbSchema);

// clear database before input new data
Airbnbs.deleteMany({}, (err, data) => {
  documents.map(document => {
    const airbnbs = new Airbnbs({
      name: document.name,
      price: document.price,
      imageurl: document.imageurl
    });

    airbnbs.save()
  });

  console.log('Database seeded');
});
