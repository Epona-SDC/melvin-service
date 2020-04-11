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
  dbConnection.query('SELECT * from listings where listingNumber=$1',[req.params.listingId])
    .then(data=>{
      res.send(data.rows[0]);
      console.timeEnd('query');

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

  dbConnection.query('SELECT listingNumber from listings ORDER BY listingNumber DESC LIMIT 1').then(
    data=>console.log(data.rows)
  )
  // executeQuery('INSERT INTO listings (title, description) VALUES ()')

}

// module.exports.seedData = () => {
//   return dbConnection.connect()
//   .then()
// }