const express = require('express');
const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const { url } = require('../config.js');

const app = express();

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

app.use(express.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const airbnbSchema = new mongoose.Schema({
  name: String,
  price: Number,
  imageurl: String,
});

// create id property with auto increment
airbnbSchema.plugin(AutoIncrement, { inc_field: 'id' });

const Airbnb = mongoose.model('Airbnb', airbnbSchema);

// Make different API call urls + have them return 12 docs
app.get('/api/moreplacestostay', (req, res) => {
  // Use random input to avoid always getting first few data
  // need to change this to not use math random
  var start = Date.now() % 9999989;
  var end = start + 13;

  // add search condition to avoid getting ALL DATA
  Airbnb.find({ id: { $gt: start, $lt: end } }, (err, data) => {
    if (err) res.status(404).send(err);
    res.send(data);
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
