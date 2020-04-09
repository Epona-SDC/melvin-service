const cassandra = require('cassandra-driver');
const { createTable, addFiveHundred } = require('./models/Listing.js');
const client = new cassandra.Client({contactPoints: ['127.0.0.1'], localDataCenter:'datacenter1',keyspace:''});

client.connect((err,result) => {
    console.log('connected')
});

const databaseTable = 'airbnblisting.listings';

client.execute('DROP TABLE ' + databaseTable,[], (err, result) => {
  if(err) {
    // If table does not exist create table
    createTable(client,databaseTable)
      .then(data=>{
        console.log('table is created');
          })
          .catch(console.error)
  } else {
    // After table is dropped
    console.time('addRecords')
    createTable(client,databaseTable)
      .then(data=>{
      console.log('table is created');
        })
        .catch(console.error)
});
