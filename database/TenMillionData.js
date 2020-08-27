const mongoose = require('mongoose');
const faker = require('faker');

const url = `mongodb+srv://Henry:henry@cluster0.8a9be.mongodb.net/airbnb?retryWrites=true&w=majority`;

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

const randomInt = function (max) {
  return Math.floor(Math.random() * max);
};

var randomPrice = function () {
  return Math.floor(Math.random() * 57) * 100 + 400 - Math.floor(Math.random() * 2);
};

const prefixes = [
  'The', 'Wonderful', 'Magnificent', 'Quiet', 'Gorgeous', 'Relaxing', 'Luxury',
  'Ancient', 'Charming', 'Fascinating', 'Homey', 'Peaceful', 'Magical'];

const locations = [
  () => { return faker.address.country() + ' style'; },
  () => { return faker.address.city(); },
  () => { return faker.address.state(); },
  () => { return faker.name.firstName(); }
];

const housingTypes = [
  'Villa', 'Palace', 'Bungalow', 'Mansion', 'Escape', 'House',
  'Vista', 'Resort', 'Hotel'];

const randomLocationName = () => {
  var name = `${prefixes[randomInt(13)]} ${locations[randomInt(4)]()} ${housingTypes[randomInt(9)]}`;
  return (name.length < 36) ? name : randomLocationName();
};

const documents = [];
const totalNumberOfData = 10000000;

for (var i = 1; i <= totalNumberOfData; i++) {
  const document = { id: i};

  document.name = randomLocationName();

  document.price = randomPrice();

  document.imageurl = `https://airbnbvillas.s3.us-east-2.amazonaws.com/${randomInt(28)+1}.jpg`;

  documents.push(document);
}

const airbnbSchema = new mongoose.Schema({
  id: Number,
  name: String,
  price: Number,
  imageurl: String,
});

const Airbnbs = mongoose.model('Airbnbs', airbnbSchema);

// clear database before input new data
Airbnbs.deleteMany({}, (err, data) => {
  documents.map(document => {
    const airbnbs = new Airbnbs({
      id: document.id,
      name: document.name,
      price: document.price,
      imageurl: document.imageurl
    });

    airbnbs.save();
    // somehow this file wouldn't end itself so leave this log to know when it's finished
    console.log('Database seeded');
  });
});
