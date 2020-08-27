const express = require('express');
const mongoose = require('mongoose');

const app = express();

const url = `mongodb+srv://Henry:henry@cluster0.8a9be.mongodb.net/airbnb?retryWrites=true&w=majority`;

mongoose.connect(url, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });

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

const Airbnbs = mongoose.model('Airbnbs', airbnbSchema);

app.get('/api/moreplacestostay', (req, res) => { // Make different API call urls + have them return 12 docs
  // changed to avoid getting ALL DATA
  Airbnbs.find({})
    .limit(12)
    .exec((err, data) => {
    if (err) res.status(404).send(err);
    res.send(data);
    });
});

// POST add a new image with name and price
app.post('/api/moreplacestostay', (req, res) => {
  // get the object to post from req
  var { id, name, price, imageurl } = req.body;
  Airbnbs.insertOne({ name, price: parseInt(price, 10), imageurl }, (err, data) => {
    if (err) res.status(404).send(err);
    res.send(data);
  })
});

// PUT update name, price, and imageurl of given id
app.put('/api/moreplacestostay', (req, res) => {
  var { id } = req.body;
  // delete that id and then put in the new one
  Airbnbs.deleteOne({ id: parseInt(id, 10) }, (err) => {
    if (err) res.status(404).send(err);
    Airbnbs.insertOne(req.body, (error, data) => {
      if (error) res.status(404).send(error);
      res.send(data);
    })
  })
});

// DELETE an existing data of given id
app.delete('/api/moreplacestostay', (req, res) => {
  var { id } = req.body;
  Airbnbs.deleteOne({ id: parseInt(id, 10) }, (err, data) => {
    if (err) res.status(404).send(err);
    res.send(data);
  })
});

app.listen(3030, () => {
  console.log('Server running on 3030');
});








