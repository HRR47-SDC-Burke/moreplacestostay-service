const fs = require('fs');
const readline = require('readline');
const csv = require('csv-parser');

/* async function readEachLine (fileName, callback) {
  const fileStream = fs.createReadStream(fileName);

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });
  // use crlfDelay for CR LF/ line break problems

  for await (const line of rl) {
    var data = JSON.parse(line);
    callback(data);
  }

}

module.exports = {
  readEachLine
}; */

// works for small data for sure
// need to try on large data
// note: all read data are string!!
fs.createReadStream('test.csv')
  .pipe(csv())
  .on('data', (row) => {
    console.log(row);
  })
  .on('end', () => {
    console.log('CSV file successfully processed');
  });
