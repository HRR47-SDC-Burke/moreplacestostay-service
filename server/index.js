const express = require('express');
const cassandra = require('cassandra-driver');
const client = new cassandra.Client({
  contactPoints: ['127.0.0.1:9042'],
  localDataCenter: 'datacenter1',
  keyspace:'places'
});

const app = express();

app.use(express.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Make different API call urls + have them return 12 docs
app.get('/api/moreplacestostay', (req, res) => {
  // Use random input to avoid always getting same data
  const start = Date.now() % 9999989;
  const range = [
    start,
    start + 1,
    start + 2,
    start + 3,
    start + 4,
    start + 5,
    start + 6,
    start + 7,
    start + 8,
    start + 9,
    start + 10,
    start + 11,
  ];

  // add search condition to avoid getting ALL DATA
  const query = 'SELECT * FROM place WHERE id in (?,?,?,?,?,?,?,?,?,?,?,?) ALLOW FILTERING;';
  client.execute(query, range, { prepare: true })
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      res.status(404).send(err);
    });
});

// POST add a new image with name and price
app.post('/api/moreplacestostay', (req, res) => {
  // get the object to post from req
  var { id, name, price, imageurl } = req.body;
  Airbnb.create({ name, price: parseInt(price, 10), imageurl }, (err, data) => {
    if (err) res.status(404).send(err);
    res.send(data);
  });
});

// PUT update name, price, and imageurl of given id
app.put('/api/moreplacestostay', (req, res) => {
  var { id } = req.body;
  // update that id with new data
  Airbnb.updateOne({ id: parseInt(id, 10) }, req.body, (err, data) => {
    if (err) res.status(404).send(err);
    res.send(data);
  });
});

// DELETE an existing data of given id
app.delete('/api/moreplacestostay', (req, res) => {
  var { id } = req.body;
  Airbnb.deleteOne({ id: parseInt(id, 10) }, (err, data) => {
    if (err) res.status(404).send(err);
    res.send('delete success');
  });
});

app.listen(3030, () => {
  console.log('Server running on 3030');
});
