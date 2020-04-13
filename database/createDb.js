const pgtools = require('pgtools');
const {  postgresUsername, postgresPassword } = require('../config/index.js')
const config = {
  user: postgresUsername,
  password: postgresPassword,
  port: 5432,
  host: 'localhost',
}
const createDB = () => pgtools.createdb(config, 'airbnblisting')
let dbConnection;

createDB()
  .catch((err) => {
    if (err.message.includes('duplicate database')) {
      // Drop all tables here
      dbConnection = require('./index.js').dbConnection;
      return dbConnection.query(`DROP TABLE IF EXISTS listings, photos`);
    } else {
      console.error(err);
    }
  })
  .then(() => {
    dbConnection = dbConnection || require('./index.js').dbConnection;
    return dbConnection.query(`CREATE TABLE listings (listingNumber SERIAL PRIMARY KEY, title text, description text )`);
  })
  .then(() =>{
   console.log('listings table created')
   return dbConnection.query(`CREATE TABLE photos (id SERIAL PRIMARY KEY, listingNumber integer REFERENCES listings(listingNumber), photos text[] )`);
  })
  .then(()=>{
    console.log('photos table created');
    return dbConnection.query('CREATE INDEX listing_num_photos on photos(listingNumber)')
  })
  .then(() => {
    console.log('Index for photos table created')
  })
  .catch((err) =>{
    console.error(err);
  });