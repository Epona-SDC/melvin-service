const pgtools = require('pgtools');
const {  postgresUsername, postgresPassword } = require('../config/index.js')
const config = {
  user: postgresUsername,
  password: postgresPassword,
  port: 5432,
  host: 'localhost',
  database:'airbnblisting'
}
const { dbConnection } = require('./index.js');
const createDB = () => pgtools.createdb(config, 'airbnblisting')

createDB()
  .catch((err) => {
    if (err.message.includes('duplicate database')) {
      // Drop all tables here
      return dbConnection.query(`DROP TABLE IF EXISTS listings`);
    } else {
      console.error(err);
    }
  })
  .then(() => {
    return dbConnection.query(`CREATE TABLE listings (listingNumber SERIAL PRIMARY KEY, title text, description text, photos text[])`);
  })
  .then(() =>{
   console.log('table done')
  })
  .catch((err) =>{
    console.error(err);
  });