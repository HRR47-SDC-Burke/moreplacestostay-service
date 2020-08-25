const mongoose = require('mongoose');

const url = `mongodb+srv://Henry:henry@cluster0.8a9be.mongodb.net/airbnb?retryWrites=true&w=majority`;

mongoose.connect(url, {useNewUrlParser: true, useCreateIndex: true});

const connection = mongoose.connection;

connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

var documents = [];

var generateRandomDocs = function () {
  for (var i=0; i<100; i++) {
    var document = {};

    var getRandomInt = function (max) {
      return Math.floor(Math.random() * Math.floor(max));
    };

    var potentialLocations = ['Santorini', 'Mykonos', 'Paros', 'Crete', 'Naxos', 'Corfu', 'Zakynthos', 'Milos', 'Hydra', 'Skiathos', 'Lefkada', 'Patmos', 'Delos', 'Kos', 'Icaria', 'Amorgos', 'Syros', 'Samos', 'Chios'];

    var potentialHousingTypes = ['Villa', 'Palace', 'Bungalow', 'Mansion', 'Escape', 'House', 'Vista'];

    var potentialPrefixes = ['The', 'Wonderful', 'Magnificent', 'Quiet', 'Gorgeous'];

    document.name = `${potentialPrefixes[getRandomInt(potentialPrefixes.length)]} ${potentialLocations[getRandomInt(potentialLocations.length)]} ${potentialHousingTypes[getRandomInt(potentialHousingTypes.length)]}`;

    var randomIntFromInterval = function (min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    };

    document.price = randomIntFromInterval(400, 4000);

    document.imageurl = `https://airbnbvillas.s3.us-east-2.amazonaws.com/${getRandomInt(28)}.jpg`;

    documents.push(document);
  }
};

generateRandomDocs();

const airbnbSchema = new mongoose.Schema({
  name: String,
  price: Number,
  imageurl: String,
});

const Airbnbs = mongoose.model('Airbnbs', airbnbSchema);

documents.map(document => {
  const airbnbs = new Airbnbs({
    name: document.name,
    price: document.price,
    imageurl: document.imageurl
  });

  airbnbs.save()
});

console.log('Database seeded');
