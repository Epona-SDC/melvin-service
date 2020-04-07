const {lorem:{ sentence, paragraph }, image, random} = require('faker');

const path = require('path')
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

//100 times
const createNewListing = (index) => {

  // Write one record onto a csv file
const fileLocation =  path.join(__dirname, `./data/listing${index}.csv`)

const csvWriter = createCsvWriter({
  path: fileLocation,
  header: [
      {id: 'listingNumber', title: 'listingNumber'},
      {id: 'title', title: 'title'},
      {id: 'description', title: 'description'},
      {id: 'photos', title: 'photos'},
  ]
});

const randomNum = () => random.number({min:0, max:6});
const getRandomPhotos = () => {
  const photoUrls = []
  for (let i = 0, len = randomNum(); i < len ; i += 1){
    photoUrls.push(`"${image.imageUrl()}"`);
  }
  return photoUrls;
}


const generate100000 = (index) => {
  const records = [];
  for (let i = 1*index; i <= 100000*index; i++) {
    records.push({
      listingNumber: i, title: sentence(), description: paragraph(),
      photos: getRandomPhotos()
    })
  }
  return records;
}
console.time('generation100000-' +index)
console.timeLog('generation100000-' +index)
const records = generate100000();

csvWriter.writeRecords(records)       // returns a promise
    .then(() => {
        console.log('...Done');
        console.timeEnd('generation100000-' +index)
      });
}

for (let i = 1; i <= 100; i++) {
  createNewListing(i);
}
