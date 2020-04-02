/* global require */
const express = require('express');
const app = express();
const {getListing, Listing} = require('../database/index.js');
const cors = require('cors');
const bodyParser = require('body-parser');
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
// eslint-disable-next-line no-undef
app.use(express.static(__dirname + '/../client/public/dist'));

app.get('/api/intro/:listingId', function (req, res) {
  var id = req.params.listingId;
  getListing(id, function(err, result) {
    if (err) {
      console.log('fail to get intro');
    } else {
      res.send(result);
    }
  });
});

// POST Request - Adds a record to
app.post('/api/intro/', (req, res) => {
  /**
   * Schema for db.listings():
   * {
   *    listingNumber: Number,
   *    photos: array(5 to 6, urlStrings), // 0 - 6.
   *    title: String,
   *    description: String
   * }
   *
   */

  Listing.create(req.body)
    .then((result) => {
      res.send(result);
      res.status(200);
    })
    .catch((err) => {
      res.send(err);
      res.status(500);
    });
});

// Delete Request
/**
 * @param listingID - listingId used to find documents
 * Delete listing
 */
app.delete('/api/intro/:listingId', (req, res) => {
  Listing.deleteOne({ listingId: req.params.listingID})
    .exec()
    .then((result) =>{
      res.send(result);
      res.status(200);
    })
    .catch((err) => {
      res.send(err);
      res.status(500);
    });
});

// Put Request
/**
 * @param listingId
 * Updates any or all of the following fields:
 *  1. photos
 *  2. title
 *  3. description
 */
app.put('/api/intro/:listingId', (req, res) => {

  const listingNumber = parseInt(req.params.listingId);
  const {photos, ...restOfdata} = req.body;

  if (req.body.listingNumber) {
    res.send("ListingNumber cannot be updated");
    res.status(400);
  }

  if (!photos) {
    Listing.updateOne({ 'listingNumber': listingNumber},
      req.body)
      .exec()
      .then((result) => {
        res.send(result);
        res.status(200);
      })
      .catch((err) => {
        res.send(err);
        res.status(500);
      });
  } else {
    if (photos.type  === "add") {
      Listing.updateOne({ 'listingNumber': listingNumber},
        {$set:restOfdata, "$addToSet":{"photos": photos.url}})
        .exec()
        .then((result) => {
          res.send(result);
          res.status(200);
        })
        .catch((err) => {
          res.send(err);
          res.status(500);
        });
      } else if (photos.type==='remove'){
        Listing.updateOne({ 'listingNumber': listingNumber},
          {$set:{restOfdata}, $pull:{"photos": photos.url}})
          .exec()
          .then((result) => {
            res.send(result);
            res.status(200);
          })
          .catch((err) => {
            res.send(err);
            res.status(500);
          });
      }
    }
});

let port = 3002;
app.listen(port, function() {
  console.log(`listening on port ${port}`);
});