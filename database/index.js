const { Pool } = require('pg');
const {  postgresUsername, postgresPassword } = require('../config/index.js')

const config = {
  user: postgresUsername,
  password: postgresPassword,
  port: 5432,
  host: 'localhost',
  database:'airbnblisting'
}
const dbConnection = new Pool(config);
const executeQuery = (query, values) => dbConnection.query(query, values);


module.exports.dbConnection = dbConnection;

module.exports.getListing = (req,res) => {

  dbConnection.query('SELECT photos.photos, listings.title, listings.description from listings, photos where listings.listingNumber=$1 and photos.listingnumber=$1',[req.params.listingId])
    .then(data=>{
      res.send(data.rows);
      res.status(200);
    })
    .catch((err)=> {
      console.error(err);
      res.send("Data retrieval failed");
      res.status(500);
    });
}


module.exports.createListing = (req, res) => {

  if (!req.body.photos || !req.body.title || !req.body.description) {
    res.send('Missing data field in body');
    res.status(500);
  }

  const photos = req.body.photos.toString('');

  dbConnection.query(`WITH listing_insert as (insert into listings(title,description) values ('${req.body.title}', '${req.body.description}')
  RETURNING listingNumber) Insert into photos (listingnumber, photos) values ( (select listingnumber from listing_insert), '{${photos}}')`)
    .then(
      (data)=>{
        res.send('Listing is saved');
      }
    )

}
