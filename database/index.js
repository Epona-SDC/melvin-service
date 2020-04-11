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
  console.time('query');
  console.timeLog('query');
  dbConnection.query('SELECT photos.photos, listings.title, listings.description from listings, photos where listings.listingNumber=$1 and photos.listingnumber=$1',[req.params.listingId])
    .then(data=>{
      res.send(data.rows[0]);
      console.timeEnd('query');
      console.log('Get request received: ', req.params.listingId);
      res.status(200);
    })
    .catch((err)=> {
      console.error(err);
      res.send("Data retrieval failed");
      res.status(500);
    })
}


module.exports.createListing = (req, res) => {
 // Validate input?
  // Needs title, description
  const photos = req.body.photos.toString('');

  dbConnection.query(`WITH listing_insert as (insert into listings(title,description) values ('${req.body.title}', '${req.body.description}')
  RETURNING listingNumber) Insert into photos (listingnumber, photos) values ( (select listingnumber from listing_insert), '{${photos}}')`).then(
    data=>console.log(data.rows)
  )
  // executeQuery('INSERT INTO listings (title, description) VALUES ()')

}
