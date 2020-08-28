const fs = require('fs');
const faker = require('faker');
const { newImageUrl } = require('../config.js');

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
  // avoid too long names
  return (name.length < 36) ? name : randomLocationName();
};

// clear file
fs.writeFile('tenmilliondata.txt', '', (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('clear');
  }
})

const totalNumberOfData = 10000000;

for (var i = 1; i <= totalNumberOfData; i++) {
  const document = { id: i};
  document.name = randomLocationName();
  document.price = randomPrice();
  document.imageurl = `${newImageUrl}/${randomInt(1000)+1}.jpg`;

  // each data uses a line
  fs.appendFile('tenmilliondata.txt', JSON.stringify(document) + '\n', (err) => {
    if (err) {
      console.log(err);
    }
  })
}
