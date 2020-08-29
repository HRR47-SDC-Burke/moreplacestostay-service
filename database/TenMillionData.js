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

const generatePlace = (id) => {
  return {
    id: id,
    name: randomLocationName(),
    price: randomPrice(),
    imageurl: `${newImageUrl}/${randomInt(1000)+1}.jpg`
  };
}

// clear file
fs.writeFile('tenmilliondata.txt', '', (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('clear');
  }
});

const writer = fs.createWriteStream('tenmilliondata.txt', { flags: 'a' });

const totalNumberOfData = 10000000;
let count = 1;

const writeFile = () => {
  // check if heap is full
  let ok = true;

  // don't use for loop because of the drain down there
  while (count <= totalNumberOfData && ok) {
    // combine 10 data in string version
    let pack = '';
    for (var i = 0; i < 10; i++) {
      pack += JSON.stringify(generatePlace(count + i)) + '\n';
    }
    count += 10;
    // write 10 data at once to reduce times write is invoked
    ok = writer.write(pack, (err) => {
      if (err) {
        throw err;
      }
    });


    if (count % 10000 === 1) {
      console.log(count);
    }
  }

  // if not ok but not complete yet, drain
  if (count <= totalNumberOfData) {
    writer.once('drain', writeFile);
  }
};

writeFile();
