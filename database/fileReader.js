const fs = require('fs');
const readline = require('readline');

async function readEachLine (fileName, callback) {
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
};
