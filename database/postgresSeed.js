const { Pool } = require('pg');
const pgtools = require('pgtools');
const {lorem:{ sentence, paragraph }, image, random} = require('faker');
const {  postgresUsername, postgresPassword } = require('../config/index.js')
console.log(postgresPassword);

const config = {
  user: postgresUsername,
  password: postgresPassword,
  port: 5432,
  host: 'localhost',
  database:'airbnblisting'
}
const dbConnection = new Pool(config);
//Connect to db
const createDB = () => pgtools.createdb(config, 'airbnblisting')
dbConnection.connect();

const randomNum = () => random.number({min: 3, max: 6});

const getRandomPhotos = () => {
  const photoUrls = []
  for (let i = 0, len = randomNum(); i < len ; i += 1){
    photoUrls.push(`"${image.imageUrl()}"`);
  }
  return photoUrls;
}

const insertVal = () => `('${sentence()}', '${paragraph()}', '{${getRandomPhotos().toString()}}')`;

const randomData = () => {
  let random ='';
  for (let i = 0; i < 99999; i++) {
    random += insertVal()+',';
  }
    random += insertVal();
    return random;
}

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
    return dbConnection.query(`CREATE TABLE listings (id SERIAL PRIMARY KEY, title text, description text, photos text[] )`);
  })
  .then( async () =>{
    console.log('Listing Table created');
    // Add 1000000 data points.
    console.time('loopCheck');
    for (let i = 0; i < 100; i +=1) {
      // Populate Listings table
      await dbConnection.query(`INSERT INTO listings (title, description, photos) VALUES ${randomData()}`);

    }
    console.timeEnd('loopCheck');
  })
  .catch((err) =>{
    console.error(err);
  })

