var cassandra = require('cassandra-driver');

var client = new cassandra.Client({contactPoints: ['127.0.0.1'], localDataCenter:'datacenter1',keyspace:''});

client.connect((err,result) => {
    console.log('connected')
});

