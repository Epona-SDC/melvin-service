module.exports.createTable = (client,databaseTable)=> {
  const createTableQuery = `CREATE TABLE ${databaseTable} (listing_number int PRIMARY KEY, photos set<text>, description text, title text)`;

  return client.execute(createTableQuery)
  .then(data=>{
    console.log('db Created');
  })
  .catch(err=>{
    console.error(err);
  })
}