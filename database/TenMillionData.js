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
})

const totalNumberOfData = 10000000;

/* for (var i = 0; i < totalNumberOfData / 10; i++) {
  // write 10 data at a time ot reduce times appendFile called
  let pack = '';
  for (var j = 1; j <= 10; j++) {
    const document = generatePlace(i * 10 + j);

    // each data uses 1 line
    pack += JSON.stringify(document) + '\n';
  }

  // data order may be off in the txt file due to function asnyc nature
  // but doesn't affect final outcome
  fs.appendFile('tenmilliondata.txt', pack, (err) => {
    if (err) {
      console.log(err);
    }
  })
} */

const writer = fs.createWriteStream('tenmilliondata.txt', { flags: 'a' });

let count = 1;

const writeFile = () => {
  // check if heap is full
  let ok = true;

  // don't use for loop because of the drain down there
  while (count <= totalNumberOfData && ok) {
    let pack = '';
    while (count <= totalNumberOfData) {
      pack += JSON.stringify(generatePlace(count);
      count++;
    }
    // write 10 data at once to reduce times write is invoked
    ok = writer.write(pack), (err) => {
      if (err) {
        throw err;
      }
    });
  }

  // if not ok but not complete yet, drain
  if (count <= totalNumberOfData) {
    writer.once('drain', writeFile);
  }
};

writeFile();
