/* global require */
const nr = require('newrelic');
const express = require('express');
const app = express();
const {getListing, createListing, Listing} = require('../database/index.js');
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
// eslint-disable-next-line no-undef
app.use(express.static(__dirname + '/../client/public/dist'));

app.get('/api/intro/:listingId', getListing);

app.post('/api/intro/', createListing);

let port = 3002;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});