const express = require('express');
const mongoose = require('mongoose');

const app = express();

const url = `mongodb+srv://Henry:henry@cluster0.8a9be.mongodb.net/airbnb?retryWrites=true&w=majority`;

mongoose.connect(url, {useNewUrlParser: true, useCreateIndex: true});

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
  Airbnbs.find({}, (err, data) => {
    if (err) res.status(404).send(err);
    res.send(data);
  })
});

app.post('/api/moreplacestostay', (req, res) => {
});

app.put('/api/moreplacestostay', (req, res) => {
});

app.delete('/api/moreplacestostay', (req, res) => {
});

app.listen(3030, () => {
  console.log('Server running on 3030');
});








