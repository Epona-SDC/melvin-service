const express = require('express');
const app = express();
const {getListing, Listing} = require('../database/index.js');
const cors = require('cors');
const bodyParser = require('body-parser');
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/../client/public/dist'));

app.get('/api/intro/:id', function (req, res) {
  var id = req.params.id;
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
   *    listing: Number,
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
app.put('/api/intro/:listingId', (req, res) => {

  /** req.body - Shape:
   * listingNumber: # => Udpates the number,
   * photos: {type: 'remove/push', url:'stringUrl'} [object],
   * title: 'NewTitleHere' [string],
   * description: 'NewDescriptionHere'  [string]
   */
  const listingNumber = parseInt(req.params.listingId);
  const {photos} = req.body;
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
    res.end();
  }
});

let port = 3002;
app.listen(port, function() {
  console.log(`listening on port ${port}`);
});