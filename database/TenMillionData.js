const fs = require('fs');
const faker = require('faker');

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

const generatePlace = () => {
  // id and complete imageurl will be add within seeding
  return `${randomLocationName()},${randomPrice()},${randomInt(1000)+1}\n`;
}

// clear file
fs.writeFile('tenmilliondata.csv', 'name,price,imageurl\n', (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('clear');
  }
});

const writer = fs.createWriteStream('tenmilliondata.csv', { flags: 'a' });

const totalNumberOfData = 10000000;
let count = 0;

const writeFile = () => {
  // check if heap is full
  let ok = true;

  // don't use for loop because of the drain down there
  while (count < totalNumberOfData && ok) {
    // combine 10 data in string version
    let pack = '';
    for (var i = 0; i < 20; i++) {
      pack += generatePlace();
    }
    count += 20;
    // write 20 data at once to reduce times write is invoked
    ok = writer.write(pack, (err) => {
      if (err) {
        throw err;
      }
    });


    if (count % 100000 === 0) {
      console.log(count / 100000 + '%');
    }
  }

  // if not ok but not complete yet, drain
  if (count < totalNumberOfData) {
    writer.once('drain', writeFile);
  }
};

writeFile();
