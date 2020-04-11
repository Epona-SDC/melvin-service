/* global require */
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

// // Delete Request
// /**
//  * @param listingID - listingId used to find documents
//  * Delete listing
//  */
// app.delete('/api/intro/:listingId', (req, res) => {
//   Listing.deleteOne({ listingId: req.params.listingID})
//     .exec()
//     .then((result) =>{
//       res.send(result);
//       res.status(200);
//     })
//     .catch((err) => {
//       res.send(err);
//       res.status(500);
//     });
// });

// // Put Request
// /**
//  * @param listingId
//  * Updates any or all of the following fields:
//  *  1. photos
//  *  2. title
//  *  3. description
//  */
// app.put('/api/intro/:listingId', (req, res) => {

//   const listingNumber = parseInt(req.params.listingId);
//   const {photos, ...restOfdata} = req.body;

//   if (req.body.listingNumber) {
//     res.send("ListingNumber cannot be updated");
//     res.status(400);
//   }

//   if (!photos) {
//     Listing.updateOne({ 'listingNumber': listingNumber},
//       req.body)
//       .exec()
//       .then((result) => {
//         res.send(result);
//         res.status(200);
//       })
//       .catch((err) => {
//         res.send(err);
//         res.status(500);
//       });
//   } else {
//     if (photos.type  === "add") {
//       Listing.updateOne({ 'listingNumber': listingNumber},
//         {$set:restOfdata, "$addToSet":{"photos": photos.url}})
//         .exec()
//         .then((result) => {
//           res.send(result);
//           res.status(200);
//         })
//         .catch((err) => {
//           res.send(err);
//           res.status(500);
//         });
//       } else if (photos.type==='remove'){
//         Listing.updateOne({ 'listingNumber': listingNumber},
//           {$set:{restOfdata}, $pull:{"photos": photos.url}})
//           .exec()
//           .then((result) => {
//             res.send(result);
//             res.status(200);
//           })
//           .catch((err) => {
//             res.send(err);
//             res.status(500);
//           });
//       }
//     }
// });

let port = 3002;
app.listen(port, function() {
  console.log(`listening on port ${port}`);
});